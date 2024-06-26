import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Appbar } from "react-native-paper";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import UnderButton from "@/components/UnderButton";

function FirstPage() {
  const router = useRouter();

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={{ flex: 1, backgroundColor: Colors.white }}
    >
      <Appbar.Header style={{ backgroundColor: Colors.white }}>
        <Appbar.BackAction onPress={() => router.back()}></Appbar.BackAction>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              width: 160,
              height: 16,
              backgroundColor: "#D9D9D9",
              borderRadius: 21,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                width: "33%",
                height: "100%",
                borderRadius: 21,
                backgroundColor: "#5850FE",
              }}
            ></View>
          </View>
        </View>
        <Appbar.BackAction style={{ display: "none" }}></Appbar.BackAction>
      </Appbar.Header>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 20 }}
      >
        <Text
          style={{
            fontFamily: "Figtree_700Bold",
            fontSize: 28,
            marginTop: 20,
          }}
        >
          Who is going? 🙋🏼‍♀️
        </Text>
        <Text
          style={{
            fontFamily: "Figtree_400Regular",
            fontSize: 16,
            marginVertical: 20,
            color: "#848484",
            textAlign: "justify",
          }}
        >
          Let's get started by selecting who you're traveling with
        </Text>
      </ScrollView>

      <UnderButton
        text="Start a Trip"
        onPress={() => router.push("/(startTrip)/FirstPage")}
      />
    </SafeAreaView>
  );
}

export default FirstPage;
