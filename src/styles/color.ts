export const color = {
  //primary
  primary10: '#311D0D',
  primary20: '#593517',
  primary30: '#824D22',
  primary40: '#AB652B', //default
  primary50: '#CD7E3C',
  primary60: '#D89964',
  primary70: '#E2B48D',
  primary80: '#ECCFB6',
  primary90: '#FBF4EF',
  //secondary
  secondary10: '#400A02',
  secondary20: '#FFF7F5',
  secondary30: '#711104',
  secondary40: '#A31906',
  secondary50: '#D42007',
  secondary60: '#F73317',
  secondary70: '#F95E49',
  secondary80: '#FA8A7A', //default
  secondary90: '#FCB4AA',
  secondary100: '#FEE6E1',
  //red
  red10: '#330001',
  red20: '#660001',
  red30: '#990002',
  red40: '#CC0002',
  red50: '#FD0002', //default
  red60: '#FF3335',
  red70: '#FF6668',
  red80: '#FF999A',
  red90: '#FFCCCC',
  //blue
  blue10: '#001333',
  blue20: '#002766',
  blue30: '#003A99',
  blue40: '#004ECC',
  blue50: '#0062FF', //default
  blue60: '#3381FF',
  blue70: '#66A0FF',
  blue80: '#99C0FF',
  blue90: '#CCDFFF',

  //green
  green10: '#162C08',
  green20: '#2C570F',
  green30: '#428316',
  green40: '#5EC01D',
  green50: '#7DDE30', //default
  green60: '#92ED4C',
  green70: '#ABE97C',
  green80: '#C7F0A8',
  green90: '#E4FDD2',

  //yellow
  yellow10: '#332900',
  yellow20: '#665200',
  yellow30: '#997B00',
  yellow40: '#CCA400',
  yellow50: '#FDCB00', //default
  yellow60: '#FFD733',
  yellow70: '#FFE166',
  yellow80: '#FFEB99',
  yellow90: '#FFF5CC',

  //neutral
  neutral10: '#18191B',
  neutral20: '#313235',
  neutral30: '#494C50',
  neutral40: '#61646B',
  neutral50: '#7A7D85', //default
  neutral60: '#94979E',
  neutral70: '#AFB1B6',
  neutral80: '#E2E3E4',
  neutral90: '#F7F7F8',
  neutral100: '#FFFFFF',
} as const;

export type ColorType = keyof typeof color;
