import { unstable_cache } from 'next/cache';

type CacheItem<T> = {
  value: T;
  expiresAt: number | null;
};

class DevCache {
  private static instance: DevCache;
  private cache: Map<string, CacheItem<any>>;

  private constructor() {
    this.cache = new Map();
  }

  public static getInstance(): DevCache {
    if (!DevCache.instance) {
      DevCache.instance = new DevCache();
    }
    return DevCache.instance;
  }

  async get<T>(key: string): Promise<T | undefined> {
    const item = this.cache.get(key);
    if (!item) return undefined;

    if (item.expiresAt && item.expiresAt < Date.now()) {
      this.cache.delete(key);
      return undefined;
    }

    return item.value;
  }

  async set<T>(key: string, value: T, revalidate?: number): Promise<void> {
    const expiresAt = revalidate ? Date.now() + revalidate * 1000 : null;
    this.cache.set(key, { value, expiresAt });
  }
}

type CacheOptions = {
  revalidate?: number;
  tags?: string[];
};

export function unstableCache<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  keyParts: string[],
  options: CacheOptions = {},
) {
  const devCache = DevCache.getInstance();

  const logError = (error: any, cacheKey: string | string[]) => {
    console.error(`Error executing function ${fn.name} with cache key ${cacheKey}:`, error);
  };

  if (process.env.NODE_ENV === 'development') {
    // use in-memory cache in development
    return async (...args: Parameters<T>) => {
      const cacheKey = [...keyParts, ...args].join(':');

      const cachedValue = await devCache.get<ReturnType<T>>(cacheKey);
      if (cachedValue !== undefined) {
        console.log('Cache hit:', cacheKey);
        return cachedValue;
      }

      try {
        const result = await fn(...args);
        await devCache.set(cacheKey, result, options.revalidate);
        console.log('New cache entry:', cacheKey);
        return result;
      } catch (error) {
        logError(error, cacheKey);
        throw error;
      }
    };
  } else {
    // use unstable_cache in production
    return (...args: Parameters<T>): ReturnType<T> => {
      const cacheKey = [...keyParts, ...args];

      try {
        return unstable_cache(fn, cacheKey, {
          revalidate: options.revalidate,
          tags: options.tags,
        })(...args) as ReturnType<T>;
      } catch (error) {
        logError(error, cacheKey);
        throw error;
      }
    };
  }
}
