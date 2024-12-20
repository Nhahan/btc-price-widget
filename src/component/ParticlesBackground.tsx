import { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useTheme } from '@/provider/ThemeProvider';

export default function ParticlesBackground() {
  const { theme } = useTheme();
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <>
      {init && (
        <Particles
          id='tsparticles'
          options={{
            background: {
              color: {
                value: 'transparent',
              },
            },
            fpsLimit: 60,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: 'push',
                },
                onHover: {
                  enable: true,
                  mode: 'connect',
                  parallax: {
                    enable: true,
                    force: 60,
                    smooth: 50,
                  },
                },
                resize: {
                  enable: true,
                  delay: 0,
                },
              },
              modes: {
                push: {
                  quantity: 1,
                },
              },
            },
            particles: {
              color: {
                value: theme.textColor,
              },
              links: {
                color: theme.textColor,
                distance: 150,
                enable: true,
                opacity: 0.25,
                width: 1,
              },
              collisions: {
                enable: false,
              },
              move: {
                direction: 'none',
                enable: true,
                outModes: {
                  default: 'out',
                },
                random: true,
                speed: 1.5,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                },
                value: 200,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: 'circle',
              },
              size: {
                value: { min: 1, max: 4 },
              },
            },
            detectRetina: true,
          }}
          className='absolute top-0 left-0 w-full h-full z-0 pointer-events-auto'
        />
      )}
    </>
  );
}
