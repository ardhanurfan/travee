import UnderButton from "@/components/UnderButton";
import Colors from "@/constants/Colors";
import { usePersonalize } from "@/context/PersonalizeContext";
import {
  GetSaved,
  toggleBookmarkDestination,
} from "@/services/BookmarkService";
import { GetDestinationById } from "@/services/DestinationService";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ScrollView, Image, View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

function DestinationDetailPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { destination } = GetDestinationById(id as string);
  const { savedDestinations } = GetSaved();
  const { setDestination, setPhotoUrl, setCountry, setName } = usePersonalize();

  const handleBookmark = async () => {
    try {
      await toggleBookmarkDestination(destination!);
      if (savedDestinations.find((d) => d.id === id)) {
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
    <SafeAreaView
      edges={["bottom"]}
      style={{ flex: 1, backgroundColor: Colors.white }}
    >
      <View
        style={{
          padding: 20,
          position: "absolute",
          zIndex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          top: 40,
        }}
      >
        <IconButton
          icon="arrow-left"
          iconColor={Colors.black}
          size={24}
          style={{
            backgroundColor: Colors.white,
            borderRadius: 999,
          }}
          onPress={() => router.back()}
        />
        <IconButton
          icon={
            savedDestinations.find((d) => d.id === id)
              ? "bookmark"
              : "bookmark-outline"
          }
          iconColor={
            savedDestinations.find((d) => d.id === id)
              ? Colors.primary
              : Colors.black
          }
          size={24}
          style={{
            backgroundColor: Colors.white,
            borderRadius: 999,
          }}
          onPress={handleBookmark}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: destination?.photo_url }}
          style={{
            width: "100%",
            height: 300,
            objectFit: "cover",
          }}
        />
        <View style={{ padding: 20 }}>
          <Text style={{ fontFamily: "Figtree_400Regular", fontSize: 16 }}>
            {destination?.country}
          </Text>
          <Text
            style={{
              fontFamily: "Figtree_700Bold",
              fontSize: 20,
              marginBottom: 12,
            }}
          >
            {destination?.name}
          </Text>
          <Text
            style={{
              fontFamily: "Figtree_400Regular",
              fontSize: 12,
              color: Colors.gray,
              textAlign: "justify",
            }}
          >
            {destination?.description}
          </Text>
        </View>
      </ScrollView>

      <UnderButton
        text="Start a Trip"
        onPress={() => {
          router.push("/(personalizeTrip)/FirstPage");
          setDestination(id as string);
          setPhotoUrl(destination ? destination.photo_url : "");
          setCountry(destination ? destination.country : "");
          setName(destination ? destination.name : "");
        }}
      />
    </SafeAreaView>
  );
}

export default DestinationDetailPage;
