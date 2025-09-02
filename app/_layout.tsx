import '@/polyfills';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { useCustomFonts } from '@/hooks/useFonts';
import HomeScreen from './HomeScreen';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { loaded } = useCustomFonts();

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <HomeScreen />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
