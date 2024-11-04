export const themes = {
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
    bgColor: '#f0f9e8', // 부드럽고 밝은 민트색 배경, 봄의 신선함을 표현
    lineColor: '#66cc99', // 연한 초록색, 새싹과 풀이 자라는 느낌
    textColor: '#38755b', // 약간 어두운 녹색, 자연스러운 봄 느낌
    pointColor: '#ffb3ba', // 밝은 핑크색으로 꽃봉오리 포인트
  },
  summer: {
    bgColor: '#e0f7fa', // 시원한 파스텔 블루, 여름의 청량한 하늘 느낌
    lineColor: '#0288d1', // 깊고 시원한 파란색, 바다와 하늘을 표현
    textColor: '#01579b', // 진한 남색으로 대비를 주어 시원한 느낌
    pointColor: '#ffab40', // 밝은 오렌지색으로 햇살을 포인트로 표현
  },

  autumn: {
    bgColor: '#fffaf0',
    lineColor: '#ff8c00',
    textColor: '#b22222',
    pointColor: '#ff4500',
  },
  winter: {
    bgColor: '#0a1a2f', // 어두운 남청색 배경으로 차가운 겨울밤의 느낌
    lineColor: '#5dade2', // 차가운 밝은 청록색으로 얼음의 느낌을 표현
    textColor: '#c1d9ff', // 차가운 하늘색으로 눈과 얼음을 연상시키는 텍스트 색상
    pointColor: '#a0c4ff', // 흐릿한 푸른색 포인트로 얼어붙은 물방울 느낌
  },
};

export type ThemeName = keyof typeof themes;
