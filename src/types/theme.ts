export const themes = {
  default: {
    bgColor: '#0d1117',
    lineColor: '#58a6ff',
    textColor: '#c9d1d9',
    pointColor: '#f78166',
  },
  light: {
    bgColor: '#ffffff',
    lineColor: '#1e90ff',
    textColor: '#000000',
    pointColor: '#ff4500',
  },
  dark: {
    bgColor: '#000000',
    lineColor: '#00ff00',
    textColor: '#ffffff',
    pointColor: '#ff00ff',
  },
  sunset: {
    bgColor: '#ffcccb',
    lineColor: '#ff4500',
    textColor: '#2f4f4f',
    pointColor: '#ffa500',
  },
  forest: {
    bgColor: '#228b22',
    lineColor: '#adff2f',
    textColor: '#ffffff',
    pointColor: '#00ff7f',
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
  neon: {
    bgColor: '#0f0f0f',
    lineColor: '#39ff14',
    textColor: '#e0e0e0',
    pointColor: '#ff073a',
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
    bgColor: '#ffffff',
    lineColor: '#000000',
    textColor: '#696969',
    pointColor: '#a9a9a9',
  },
  autumn: {
    bgColor: '#fffaf0',
    lineColor: '#ff8c00',
    textColor: '#b22222',
    pointColor: '#ff4500',
  },
  candy: {
    bgColor: '#fff0f5',
    lineColor: '#ff69b4',
    textColor: '#db7093',
    pointColor: '#ff1493',
  },
};

export type ThemeName = keyof typeof themes;
