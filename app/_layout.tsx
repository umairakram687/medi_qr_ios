import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false}} />
        <Stack.Screen name="benefits/index" options={{ headerShown: false}} />
        <Stack.Screen name="qr-scanner/index" options={{ headerShown: false}} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen name="lets-start/index" options={{ headerShown: false}} />
        <Stack.Screen name="medi-qr-drs/index" options={{ headerShown: false}} />
        <Stack.Screen name="qr-features/index" options={{ headerShown: false}} />
        <Stack.Screen name="user-form/index" options={{ headerShown: false}} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
