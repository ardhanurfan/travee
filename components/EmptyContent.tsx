import Colors from "@/constants/Colors";
import React from "react";
import { View, Text } from "react-native";
import { Avatar } from "react-native-paper";

function EmptyContent({ icon, caption }: { icon: string; caption: string }) {
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
      <Avatar.Icon
        icon={icon}
        color={Colors.black}
        size={80}
        style={{
          borderWidth: 2,
          borderColor: Colors.lightGray,
          backgroundColor: Colors.white,
        }}
      />
      <Text
        style={{
          fontFamily: "Figtree_700Bold",
          fontSize: 20,
          marginTop: 24,
          marginBottom: 8,
        }}
      >
        Empty
      </Text>
      <Text
        style={{
          fontFamily: "Figtree_300Light",
          fontSize: 16,
          color: Colors.gray,
          textAlign: "center",
        }}
      >
        {caption}
      </Text>
    </View>
  );
}

export default EmptyContent;
