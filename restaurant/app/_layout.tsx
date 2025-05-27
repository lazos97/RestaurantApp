import { DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'

import LoadingSpinner from '@/components/loading-spinner'
import React from 'react'
import { AuthProvider } from '@/providers/auth-provider'
import { CustomStack } from '@/components/custom-stack'

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  })

  if (!loaded) {
    return <LoadingSpinner />
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <AuthProvider>
        <CustomStack />
        <StatusBar style="auto" />
      </AuthProvider>
    </ThemeProvider>
  )
}
