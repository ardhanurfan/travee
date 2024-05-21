import React, { useEffect } from "react";
import { Tabs, router } from "expo-router";

import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { GetUserDataOnce } from "@/services/AuthService";

export default function TabLayout() {
  const protectPresonalize = async () => {
    const user = await GetUserDataOnce();
    if (!user) {
      router.replace("/(personalize)/FirstPage");
    }
  };
  useEffect(() => {
    protectPresonalize();
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
      }}
    >
      <Tabs.Screen
        name="HomePage"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color}></Ionicons>
          ),
        }}
      />
      <Tabs.Screen
        name="ChatBotPage"
        options={{
          headerShown: false,
          title: "Chatbot",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="chatbubble-outline"
              size={24}
              color={color}
            ></Ionicons>
          ),
        }}
      />
      <Tabs.Screen
        name="SavedPage"
        options={{
          headerShown: false,
          title: "Saved",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="bookmark-outline"
              size={24}
              color={color}
            ></Ionicons>
          ),
        }}
      />
      <Tabs.Screen
        name="MyTripsPage"
        options={{
          headerShown: false,
          title: "MyTrips",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="location-outline"
              size={24}
              color={color}
            ></Ionicons>
          ),
        }}
      />
    </Tabs>
  );
}
