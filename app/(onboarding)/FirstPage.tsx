import UnderButton from "@/components/UnderButton";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import React from "react";
import { Image, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

function FirstPage() {
  const router = useRouter();

  return (
    <>
      <SafeAreaView
        edges={["bottom"]}
        style={{
          flex: 1,
          backgroundColor: Colors.white,
          position: "relative",
        }}
      >
        <View
          style={{
            backgroundColor: Colors.primary,
            flex: 1,
            top: 0,
            position: "absolute",
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/images/onboarding-1.png")}
            style={{
              width: "60%",
              objectFit: "contain",
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <Image
            source={require("../../assets/images/onboarding-cover.png")}
            style={{
              width: "100%",
              height: 400,
              objectFit: "fill",
              position: "absolute",
              bottom: 0,
              // zIndex: -1,
            }}
          />
          <View
            style={{
              paddingHorizontal: 40,
              paddingVertical: 28,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Figtree_700Bold",
                fontSize: 24,
                textAlign: "center",
              }}
            >
              Discover Your Next{"\n"}Trip Here!
            </Text>
            <Text
              style={{
                fontFamily: "Figtree_400Regular",
                fontSize: 16,
                marginTop: 16,
                color: Colors.gray,
                textAlign: "center",
              }}
            >
              Travee handpicks travel treasures tailored to you. Receive
              customized destination suggestions and begin crafting your ideal
              journey by simply use the chatbot.
            </Text>
            <View style={{ flexDirection: "row", gap: 4, marginTop: 28 }}>
              <View
                style={{
                  width: 40,
                  height: 10,
                  backgroundColor: Colors.blue,
                  borderRadius: 1000,
                }}
              ></View>
              <View
                style={{
                  width: 20,
                  height: 10,
                  backgroundColor: Colors.lightGray,
                  borderRadius: 1000,
                }}
              ></View>
              <View
                style={{
                  width: 20,
                  height: 10,
                  backgroundColor: Colors.lightGray,
                  borderRadius: 1000,
                }}
              ></View>
            </View>
          </View>
          <UnderButton
            onPress={() => router.replace("/(onboarding)/SecondPage")}
            text="Continue"
          />
        </View>
      </SafeAreaView>
    </>
  );
}

export default FirstPage;
