import Colors from "@/constants/Colors";
import { Destination } from "@/constants/Types";
import {
  GetSaved,
  toggleBookmarkDestination,
} from "@/services/BookmarkService";
import { router } from "expo-router";
import React, { useMemo } from "react";
import { View, Image, Text, Pressable } from "react-native";
import { IconButton } from "react-native-paper";
import Toast from "react-native-toast-message";

function DestinationCard({
  detail = false,
  destination,
}: {
  detail?: boolean;
  destination: Destination;
}) {
  const { savedDestinations } = GetSaved();

  const isBookmarked = savedDestinations.find((d) => d.id === destination.id)
    ? true
    : false;

  const handleBookmark = async () => {
    try {
      await toggleBookmarkDestination(destination);
      if (isBookmarked) {
        Toast.show({
          type: "error",
          text1: "Destination Removed",
          text2: "Destination removed from your bookmarks",
        });
      } else {
        Toast.show({
          type: "success",
          text1: "Destination Saved",
          text2: "Destination saved to your bookmarks",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error as string,
        text2: "Failed save destination",
      });
    }
  };

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/DestinationDetailPage",
          params: {
            id: destination.id,
          },
        })
      }
    >
      <View
        style={{
          width: detail ? "100%" : 250,
          marginRight: detail ? 0 : 16,
          marginBottom: detail ? 16 : 0,
        }}
      >
        <Image
          source={{ uri: destination.photo_url }}
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
          {destination.name}
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
          icon={isBookmarked ? "bookmark" : "bookmark-outline"}
          iconColor={isBookmarked ? Colors.primary : Colors.black}
          size={20}
          style={{
            position: "absolute",
            top: 4,
            right: 4,
            backgroundColor: Colors.white,
            borderRadius: 999,
          }}
          onPress={handleBookmark}
        />
      </View>
    </Pressable>
  );
}

export default DestinationCard;
