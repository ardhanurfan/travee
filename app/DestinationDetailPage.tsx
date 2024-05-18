import Colors from "@/constants/Colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ScrollView, Image, View } from "react-native";
import { Button, IconButton, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

function DestinationDetailPage() {
  const router = useRouter();
  const { destinationId } = useLocalSearchParams();

  return (
    <SafeAreaView
      edges={["top", "bottom"]}
      style={{ flex: 1, backgroundColor: Colors.white }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            padding: 20,
            position: "absolute",
            zIndex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
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
        <Image
          source={require("../assets/destination.png")}
          style={{
            width: "100%",
            height: 300,
            objectFit: "cover",
          }}
        />
        <View style={{ padding: 20 }}>
          <Text style={{ fontFamily: "Figtree_400Regular", fontSize: 16 }}>
            Indonesia
          </Text>
          <Text
            style={{
              fontFamily: "Figtree_700Bold",
              fontSize: 20,
              marginBottom: 12,
            }}
          >
            Jogjakarta, Daerah Istimewa Yogyakarta
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
            paddingVertical: 6,
          }}
          onPress={() => router.push("/(startTrip)/FirstPage")}
        >
          <Text
            style={{
              fontFamily: "Figtree_600SemiBold",
              color: Colors.white,
              fontSize: 16,
            }}
          >
            Start a Trip
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default DestinationDetailPage;
