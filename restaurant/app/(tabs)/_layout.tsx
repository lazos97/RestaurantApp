import { Tabs } from 'expo-router';
import React from "react";

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/use-color-scheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type AbBarIcon = {
  color: string
}
export default function TabLayout() {
    const colorScheme = useColorScheme();

  return (
      <Tabs screenOptions={{ tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint, headerShown: false }}
      >
        
        <Tabs.Screen name="index" options={{
          title: 'Login',
          tabBarIcon: ({ color }: AbBarIcon) => <FontAwesome name='sign-in' size={28} color={color} /> }} />

        <Tabs.Screen name="register" options={{
          title: 'Register',
          tabBarIcon: ({ color }: AbBarIcon) => <FontAwesome name='user' size={28} color={color} /> }} />

        </Tabs>
  );
}
