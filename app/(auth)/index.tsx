import { auth } from "@/config/firebase";
import Colors from "@/constants/Colors";
import { router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { View } from "react-native";

function ProtectedPage() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/(onboarding)/FirstPage");
      } else {
        router.replace("/(main)/HomePage");
      }
    });
    return unsubscribe;
  }, []);
  return (
    <View
      style={{ flex: 1, width: "100%", backgroundColor: Colors.primary }}
    ></View>
  );
}

export default ProtectedPage;
