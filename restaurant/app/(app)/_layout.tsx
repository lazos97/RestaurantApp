import { Tabs ,useRouter } from 'expo-router';
import React from "react";

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/use-color-scheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import LoadingSpinner from '@/components/loading-spinner';
import { useAuthStore } from '@/providers/auth-provider';
import axios from 'axios';
import { APP_URL } from '@/utils';

type TabBarIcon = {
  color: string
}


export default function TabLayout() {
    const colorScheme = useColorScheme();
    const { loading } = useAuthStore()
    
      
    if (loading) {
        return <LoadingSpinner />
    }

  return (
      <Tabs screenOptions={{ tabBarActiveTintColor: Colors['light'].text, headerShown: false }}
      >

        <Tabs.Screen name="restaurants" options={{
          title: 'Restaurants',
          tabBarIcon: ({ color }: TabBarIcon) => <FontAwesome name='home' size={28} color={color} /> }} />

        <Tabs.Screen name="reservations" options={{
          title: 'Reservations',
          tabBarIcon: ({ color }: TabBarIcon) => <FontAwesome name='book' size={28} color={color} /> }} />

        <Tabs.Screen
        name="logout"
        options={{
          title: 'Logout',
          tabBarIcon: ({ color }: TabBarIcon) => (
            <FontAwesome name="sign-out" size={24} color={color} />
          )
        }}
      />

        </Tabs>
  );
}
