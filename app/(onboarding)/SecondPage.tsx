import UnderButton from "@/components/UnderButton";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import React from "react";
import { Image, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

function SecondPage() {
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
            source={require("../../assets/images/onboarding-2.png")}
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
              zIndex: -1,
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
              Save and Plan with{"\n"}Your Team
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
              Discovered your dream team destination? Save it to your list for
              future reference. Travee helps keep your travel organized.
            </Text>
            <View style={{ flexDirection: "row", gap: 4, marginTop: 28 }}>
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
            </View>
          </View>
          <UnderButton
            onPress={() => router.push("/(onboarding)/ThirdPage")}
            text="Continue"
          />
        </View>
      </SafeAreaView>
    </>
  );
}

export default SecondPage;
