import { useFonts } from 'expo-font';
import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter';

export const useCustomFonts = () => {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  return { loaded };
};

// Font family constants for easy use throughout the app
export const FONTS = {
  INTER: 'Inter_400Regular',
  INTER_LIGHT: 'Inter_300Light',
  INTER_MEDIUM: 'Inter_500Medium',
  INTER_SEMIBOLD: 'Inter_600SemiBold',
  INTER_BOLD: 'Inter_700Bold',
  SPACE_MONO: 'SpaceMono',
} as const;

// Font weight constants
export const FONT_WEIGHTS = {
  THIN: '100',
  EXTRA_LIGHT: '200',
  LIGHT: '300',
  REGULAR: '400',
  MEDIUM: '500',
  SEMIBOLD: '600',
  BOLD: '700',
  EXTRA_BOLD: '800',
  BLACK: '900',
} as const;
