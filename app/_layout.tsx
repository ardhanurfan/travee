import PreferencesProvider from "@/context/PreferencesContext";
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
import Toast from "react-native-toast-message";

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
    <PreferencesProvider>
      <Stack>
        <Stack.Screen name="(auth)/index" options={{ headerShown: false }} />

        <Stack.Screen name="(main)" options={{ headerShown: false }} />
        <Stack.Screen
          name="PopularDestinationPage"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DestinationDetailPage"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="TripDetailPage" options={{ headerShown: false }} />

        {/* Onboarding */}
        <Stack.Screen
          name="(onboarding)/FirstPage"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(onboarding)/SecondPage"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(onboarding)/ThirdPage"
          options={{ headerShown: false }}
        />

        {/* Auth */}
        <Stack.Screen
          name="(auth)/LoginPage"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(auth)/RegisterPage"
          options={{ headerShown: false }}
        />

        {/* Personalize*/}
        <Stack.Screen
          name="(personalize)/FirstPage"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(personalize)/SecondPage"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(personalize)/ThirdPage"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(personalize)/FinishedPage"
          options={{ headerShown: false }}
        />

        {/* Start Trip */}
        <Stack.Screen
          name="(startTrip)/FirstPage"
          options={{ headerShown: false }}
        />

        {/* PersonalizeTrip */}
        <Stack.Screen
          name="(personalizeTrip)/FirstPage"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(personalizeTrip)/SecondPage"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(personalizeTrip)/ThirdPage"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(personalizeTrip)/FourthPage"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(personalizeTrip)/SummaryPage"
          options={{ headerShown: false }}
        />

        {/* Person */}
        <Stack.Screen
          name="(person)/ListPage"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(person)/AddPage"
          options={{ headerShown: false }}
        />

        {/* Split Bill */}
        <Stack.Screen
          name="(splitBill)/ListPage"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(splitBill)/AddPage"
          options={{ headerShown: false }}
        />

        {/* Itinerary */}
        <Stack.Screen
          name="(itinerary)/EditPage"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(itinerary)/AddPage"
          options={{ headerShown: false }}
        />
      </Stack>
      <Toast />
    </PreferencesProvider>
  );
}
