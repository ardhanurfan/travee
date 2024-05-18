import Colors from "@/constants/Colors";
import React from "react";
import { View, GestureResponderEvent } from "react-native";
import { Button, Text } from "react-native-paper";

function UnderButton({
  onPress,
  text,
}: {
  onPress?: ((e: GestureResponderEvent) => void) | undefined;
  text: string;
}) {
  return (
    <View
      style={{
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderTopColor: Colors.lightGray,
        borderTopWidth: 1,
        width: "100%",
      }}
    >
      <Button
        mode="contained"
        style={{
          backgroundColor: Colors.primary,
          borderRadius: 28,
        }}
        onPress={onPress}
      >
        <Text
          style={{
            fontFamily: "Figtree_600SemiBold",
            color: Colors.white,
            fontSize: 16,
            paddingVertical: 6,
          }}
        >
          {text}
        </Text>
      </Button>
    </View>
  );
}

export default UnderButton;
