import React from "react";
import { SafeAreaView, View, Text, Dimensions } from "react-native";
import { Appbar, Button } from "react-native-paper";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useRouter } from "expo-router";

function PersonalizingFirstPage() {
  const router = useRouter();
  let ScreenHeight = Dimensions.get("window").height;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
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
        <Appbar.BackAction
          // onPress={() => router.back()}
          style={{ opacity: 0 }}
        ></Appbar.BackAction>
      </Appbar.Header>
      <View
        style={{
          backgroundColor: Colors.white,
          height: ScreenHeight,
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <View style={{ paddingHorizontal: 20 }}>
          <Text
            style={{
              fontFamily: "Figtree_700Bold",
              fontSize: 28,
              marginTop: 20,
            }}
          >
            Verify you’re human 🤖
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
        </View>
        <View
          style={{
            paddingVertical: 16,
            paddingHorizontal: 20,
            borderTopColor: "#848484",
            // borderTopWidth: 0.5,
            width: "100%",
          }}
        >
          <Button
            mode="contained"
            onPress={() => router.push("/PersonalizingSecondPage")}
            style={{
              backgroundColor: "#5850FE",
              borderRadius: 28,
              // width: "100%",
              // height: "auto",
              paddingVertical: 6,
              // flex: 1,
              // justifyContent: "center",
              // alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Figtree_600SemiBold",
                color: Colors.white,
                fontSize: 16,
              }}
            >
              Continue
            </Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default PersonalizingFirstPage;
