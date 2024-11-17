export const themes: Record<string, Theme> = {
  default: {
    bgColor: '#0d1117',
    lineColor: '#58a6ff',
    textColor: '#c9d1d9',
    pointColor: '#f78166',
  },
  sunset: {
    bgColor: '#ffcccb',
    lineColor: '#ff4500',
    textColor: '#2f4f4f',
    pointColor: '#ffa500',
  },
  forest: {
    bgColor: '#4c8c4a',
    lineColor: '#88c78b',
    textColor: '#f0f5e5',
    pointColor: '#5ea864',
  },
  ocean: {
    bgColor: '#add8e6',
    lineColor: '#0000ff',
    textColor: '#000080',
    pointColor: '#00ced1',
  },
  pastel: {
    bgColor: '#ffe4e1',
    lineColor: '#db7093',
    textColor: '#696969',
    pointColor: '#dda0dd',
  },
  noir: {
    bgColor: '#ffffff',
    lineColor: '#000000',
    textColor: '#000000',
    pointColor: '#000000',
  },
  neon: {
    bgColor: '#001f3f',
    lineColor: '#00e5ff',
    textColor: '#8ab4f8',
    pointColor: '#ff006f',
  },
  monochrome: {
    bgColor: '#f5f5f5',
    lineColor: '#808080',
    textColor: '#2f4f4f',
    pointColor: '#a9a9a9',
  },
  midnight: {
    bgColor: '#191970',
    lineColor: '#4169e1',
    textColor: '#f0e68c',
    pointColor: '#dda0dd',
  },
  sunrise: {
    bgColor: '#ffefd5',
    lineColor: '#ff6347',
    textColor: '#8b0000',
    pointColor: '#ff69b4',
  },
  retro: {
    bgColor: '#f5deb3',
    lineColor: '#8b4513',
    textColor: '#2f4f4f',
    pointColor: '#d2691e',
  },
  cyberpunk: {
    bgColor: '#1a1a1d',
    lineColor: '#66fcf1',
    textColor: '#c5c6c7',
    pointColor: '#45a29e',
  },
  grayscale: {
    bgColor: '#c5c6c7',
    lineColor: '#000000',
    textColor: '#696969',
    pointColor: '#808080',
  },
  candy: {
    bgColor: '#fff0f5',
    lineColor: '#ff69b4',
    textColor: '#db7093',
    pointColor: '#ff1493',
  },
  light: {
    bgColor: '#ffffff',
    lineColor: '#1e90ff',
    textColor: '#000000',
    pointColor: '#ff4500',
  },
  dark: {
    bgColor: '#0b0c10',
    lineColor: '#415a77',
    textColor: '#a7adba',
    pointColor: '#62727b',
  },
  spring: {
    bgColor: '#f0f9e8',
    lineColor: '#66cc99',
    textColor: '#38755b',
    pointColor: '#ffb3ba',
  },
  summer: {
    bgColor: '#e0f7fa',
    lineColor: '#0288d1',
    textColor: '#01579b',
    pointColor: '#ffab40',
  },
  autumn: {
    bgColor: '#fffaf0',
    lineColor: '#ff8c00',
    textColor: '#b22222',
    pointColor: '#ff4500',
  },
  winter: {
    bgColor: '#0a1a2f',
    lineColor: '#5dade2',
    textColor: '#c1d9ff',
    pointColor: '#a0c4ff',
  },
  galaxy: {
    bgColor: '#2d033b',
    lineColor: '#7d5ba6',
    textColor: '#f0f5ff',
    pointColor: '#e5e5e5',
  },
  nebula: {
    bgColor: '#4a0033',
    lineColor: '#ff67d2',
    textColor: '#b3ffe7',
    pointColor: '#6bffb8',
  },
  mars: {
    bgColor: '#712f1f',
    lineColor: '#da8033',
    textColor: '#f6d6ad',
    pointColor: '#e07738',
  },
  void: {
    bgColor: '#050505',
    lineColor: '#1f1b33',
    textColor: '#6f7285',
    pointColor: '#9b59b6',
  },
};

export interface Theme {
  bgColor: string;
  lineColor: string;
  textColor: string;
  pointColor: string;
}

export type ThemeName = keyof typeof themes;
