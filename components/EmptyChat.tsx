import Colors from "@/constants/Colors";
import React from "react";
import { View, Text, Image } from "react-native";

function EmptyChat() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        backgroundColor: Colors.white,
      }}
    >
      <Image
        source={require("../assets/images/logo.png")}
        style={{ width: 100, height: 100 }}
      />

      <Text
        style={{
          fontFamily: "Figtree_300Light",
          fontSize: 16,
          color: Colors.gray,
          textAlign: "center",
        }}
      >
        How can Travee help your trip?
      </Text>
    </View>
  );
}

export default EmptyChat;
