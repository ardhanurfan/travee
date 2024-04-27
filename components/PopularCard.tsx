import Colors from "@/constants/Colors";
import { Destination } from "@/constants/Types";
import React from "react";
import { View, Image, Text } from "react-native";
import { IconButton } from "react-native-paper";

function PopularCard({
  detail = false,
  destination,
}: {
  detail?: boolean;
  destination: Destination;
}) {
  return (
    <View
      style={{
        width: detail ? "100%" : 250,
        marginRight: detail ? 0 : 16,
        marginBottom: detail ? 16 : 0,
      }}
    >
      <Image
        source={require("../assets/destination.png")}
        style={{
          width: detail ? "100%" : 250,
          height: detail ? 200 : 160,
          objectFit: "cover",
          borderRadius: 20,
        }}
      />
      <Text
        style={{
          fontFamily: "Figtree_700Bold",
          fontSize: 16,
          marginVertical: 8,
        }}
      >
        {destination.title}
      </Text>
      <Text
        style={{
          fontFamily: "Figtree_300Light",
          fontSize: 12,
        }}
      >
        {destination.country}
      </Text>
      <IconButton
        icon="bookmark"
        iconColor={Colors.primary}
        size={20}
        style={{
          position: "absolute",
          top: 4,
          right: 4,
          backgroundColor: Colors.white,
          borderRadius: 999,
        }}
        onPress={() => console.log("Pressed")}
      />
    </View>
  );
}

export default PopularCard;
