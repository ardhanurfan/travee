import {
  Figtree_300Light,
  Figtree_400Regular,
  Figtree_500Medium,
  Figtree_600SemiBold,
  Figtree_700Bold,
  Figtree_800ExtraBold,
} from "@expo-google-fonts/figtree";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Figtree_300Light,
    Figtree_400Regular,
    Figtree_500Medium,
    Figtree_600SemiBold,
    Figtree_700Bold,
    Figtree_800ExtraBold,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="(main)" options={{ headerShown: false }} />
      <Stack.Screen
        name="PopularDestinationPage"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PersonalizingFirstPage"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PersonalizingSecondPage"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PersonalizingThirdPage"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PersonalizingFinishedPage"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DestinationDetailPage"
        options={{ headerShown: false }}
      />

      {/* Start Trip */}
      <Stack.Screen
        name="(startTrip)/FirstPage"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
