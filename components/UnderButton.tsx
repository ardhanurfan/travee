import Colors from "@/constants/Colors";
import React from "react";
import { View, GestureResponderEvent } from "react-native";
import { Button, Text } from "react-native-paper";

function UnderButton({
  onPress,
  text,
  loading,
}: {
  onPress?: ((e: GestureResponderEvent) => void) | undefined;
  text: string;
  loading?: boolean;
}) {
  return (
    <View
      style={{
        paddingTop: 16,
        paddingHorizontal: 20,
        borderTopColor: Colors.lightGray,
        borderTopWidth: 1,
        width: "100%",
      }}
    >
      <Button
        mode="contained"
        loading={loading}
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
