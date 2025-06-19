import { Tabs } from "expo-router";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  GraduationCapIcon,
  HomeIcon,
  NewspaperIcon,
  SchoolIcon,
} from "lucide-react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tabIconSelected,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <HomeIcon size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="universities"
        options={{
          title: "Universities",
          tabBarIcon: ({ color, focused }) => (
            <SchoolIcon size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="programs"
        options={{
          title: "Programs",
          tabBarIcon: ({ color, focused }) => (
            <GraduationCapIcon size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="articles"
        options={{
          title: "Articles",
          tabBarIcon: ({ color, focused }) => (
            <NewspaperIcon size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
