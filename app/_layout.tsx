// app/layout.tsx or wherever your root layout is

import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import AnimatedSplashScreen from '@/components/AnimatedSplashScreen';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme || 'light'];

  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <AnimatedSplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.tint,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        
      </Stack>
    </SafeAreaProvider>
  );
}
