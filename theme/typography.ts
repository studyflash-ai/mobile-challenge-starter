import { FONTS } from '@/hooks/useFonts';
import { COLORS } from './colors';

// Global typography styles
export const TYPOGRAPHY = {
  // Headings
  h1: {
    fontFamily: FONTS.INTER_BOLD,
    fontSize: 32,
    lineHeight: 40,
  },
  h2: {
    fontFamily: FONTS.INTER_SEMIBOLD,
    fontSize: 28,
    lineHeight: 36,
  },
  h3: {
    fontFamily: FONTS.INTER_SEMIBOLD,
    fontSize: 24,
    lineHeight: 32,
  },
  h4: {
    fontFamily: FONTS.INTER_MEDIUM,
    fontSize: 20,
    lineHeight: 28,
  },

  // Body text
  body1: {
    fontFamily: FONTS.INTER,
    fontSize: 16,
    lineHeight: 24,
  },
  body2: {
    fontFamily: FONTS.INTER,
    fontSize: 14,
    lineHeight: 20,
  },

  // Caption and small text
  caption: {
    fontFamily: FONTS.INTER,
    fontSize: 12,
    lineHeight: 16,
  },

  // Button text
  button: {
    fontFamily: FONTS.INTER_MEDIUM,
    fontSize: 16,
    lineHeight: 24,
  },

  // Input text
  input: {
    fontFamily: FONTS.INTER,
    fontSize: 16,
    color: COLORS.darkBlack,
  },

  // Default text style (applied globally)
  default: {
    fontFamily: FONTS.INTER,
    fontSize: 16,
    lineHeight: 24,
  },
} as const;

// Helper function to get typography style
export const getTypographyStyle = (variant: keyof typeof TYPOGRAPHY) => {
  return TYPOGRAPHY[variant];
};

// Global text style that can be applied to all Text components
export const globalTextStyle = {
  fontFamily: FONTS.INTER,
  fontSize: 16,
  lineHeight: 24,
};
