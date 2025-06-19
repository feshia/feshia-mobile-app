import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Satoshi: require("../assets/fonts/satoshi/Satoshi-Regular.otf"),
    "Satoshi-Light": require("../assets/fonts/satoshi/Satoshi-Light.otf"),
    "Satoshi-Medium": require("../assets/fonts/satoshi/Satoshi-Medium.otf"),
    "Satoshi-MediumItalic": require("../assets/fonts/satoshi/Satoshi-MediumItalic.otf"),
    "Satoshi-Bold": require("../assets/fonts/satoshi/Satoshi-Bold.otf"),
    "Satoshi-Black": require("../assets/fonts/satoshi/Satoshi-Black.otf"),
    "Satoshi-Italic": require("../assets/fonts/satoshi/Satoshi-Italic.otf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GluestackUIProvider mode="light">
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </ThemeProvider>
      </GluestackUIProvider>
    </GestureHandlerRootView>
  );
}
