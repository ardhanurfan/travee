import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Appbar } from "react-native-paper";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useRouter } from "expo-router";
import UnderButton from "@/components/UnderButton";
import { SafeAreaView } from "react-native-safe-area-context";

function FirstPage() {
  const router = useRouter();

  return (
    <>
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

      <SafeAreaView
        edges={["bottom"]}
        style={{
          flex: 1,
          backgroundColor: Colors.white,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 20 }}
        >
          <Text
            style={{
              fontFamily: "Figtree_700Bold",
              fontSize: 28,
            }}
          >
            Verify you're human 🤖
          </Text>
          <Text
            style={{
              fontFamily: "Figtree_400Regular",
              fontSize: 16,
              marginTop: 20,
              color: "#848484",
              textAlign: "justify",
            }}
          >
            Please solve this captcha so we know you are a person
          </Text>
        </ScrollView>

        <UnderButton
          onPress={() => router.push("/(personalize)/SecondPage")}
          text="Continue"
        />
      </SafeAreaView>
    </>
  );
}

export default FirstPage;
