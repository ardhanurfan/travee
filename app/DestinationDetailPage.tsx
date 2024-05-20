import UnderButton from "@/components/UnderButton";
import Colors from "@/constants/Colors";
import { GetDestinationById } from "@/services/DestinationService";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ScrollView, Image, View } from "react-native";
import { Button, IconButton, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

function DestinationDetailPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { destination } = GetDestinationById(id as string);

  return (
    <SafeAreaView
      edges={["top", "bottom"]}
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
          icon="bookmark"
          iconColor={Colors.primary}
          size={24}
          style={{
            backgroundColor: Colors.white,
            borderRadius: 999,
          }}
          onPress={() => console.log("Pressed")}
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
            Jogjakarta, often called Yogyakarta, is a cultural hub in Java known
            for its rich history, royal heritage, and vibrant arts scene. It is
            home to the majestic temples of Borobudur and Prambanan and offers a
            deep dive into Javanese traditions and craftsmanship.
          </Text>
        </View>
      </ScrollView>

      <UnderButton
        text="Start a Trip"
        onPress={() => router.push("/(startTrip)/FirstPage")}
      />
    </SafeAreaView>
  );
}

export default DestinationDetailPage;
