import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const COLORS = {
    pink: '#FF83A0',
    lightPink: 'rgba(255, 131, 160, 0.7)',
    blue: '#00A9EA',
    blueText: '#007AFF',

    black: '#000000',
    white: '#FFFFFF',
    yellow: '#FFBE61',

    gray: '#A9A9A9',
    lightGray: '#F8F8F8',
    lightText: 'rgba(255, 255, 255, 0.7)',

    blueProgress: '#00B9FF',
    ligtBlueProgress: 'rgba(0, 185, 255, 0.2)',
};
export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,
    padding16: 16,

    // font sizes
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 16,
    h4: 14,
    body1: 30,
    body2: 22,
    body3: 16,
    body4: 14,

    // app dimensions
    width,
    height,
};

export const FONTS = {
    largeTitle: {
        fontSize: SIZES.largeTitle,
        lineHeight: 55,
    },
    h1: { fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontSize: SIZES.h4, lineHeight: 22 },
    body1: { fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontSize: SIZES.body4, lineHeight: 22 },
};

const appTheme = { COLORS, SIZES };

export default appTheme;
