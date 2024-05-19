import ItineraryCard from "@/components/ItineraryCard";
import Colors from "@/constants/Colors";
import { format, parse } from "date-fns";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ScrollView, View, Image } from "react-native";
import { Button, IconButton, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

function TripDetailPage() {
  const router = useRouter();
  const { tripId } = useLocalSearchParams();

  const tripCalendar = [
    {
      id: 1,
      date: parse("05/18/2024", "MM/dd/yyyy", new Date()),
    },
    {
      id: 2,
      date: parse("05/19/2024", "MM/dd/yyyy", new Date()),
    },
    {
      id: 3,
      date: parse("05/20/2024", "MM/dd/yyyy", new Date()),
    },
  ];

  return (
    <SafeAreaView
      edges={["top", "bottom"]}
      style={{ flex: 1, backgroundColor: Colors.white }}
    >
      {/* Header */}
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
        <View style={{ flexDirection: "row", gap: 4 }}>
          <IconButton
            icon="account-plus-outline"
            iconColor={Colors.black}
            size={24}
            style={{
              backgroundColor: Colors.white,
              borderRadius: 999,
            }}
            onPress={() => console.log("Pressed")}
          />
          <IconButton
            icon="currency-usd"
            iconColor={Colors.black}
            size={24}
            style={{
              backgroundColor: Colors.white,
              borderRadius: 999,
            }}
            onPress={() => console.log("Pressed")}
          />
        </View>
      </View>

      {/* FAB */}
      <View
        style={{
          padding: 20,
          position: "absolute",
          zIndex: 1,
          bottom: 20,
          right: 0,
        }}
      >
        <IconButton
          icon="pencil-outline"
          iconColor={Colors.white}
          size={32}
          style={{
            backgroundColor: Colors.primary,
            borderRadius: 999,
          }}
          onPress={() => router.back()}
        />
      </View>

      {/* Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={require("../assets/destination.png")}
          style={{
            width: "100%",
            height: 300,
            objectFit: "cover",
          }}
        />
        <View style={{ padding: 20 }}>
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
              fontFamily: "Figtree_300Light",
              fontSize: 16,
              color: Colors.gray,
              marginBottom: 12,
            }}
          >
            Jan 12 - Jan 14, 2025 | A Couple | Luxury
          </Text>

          {/* Maps */}
          <View
            style={{
              height: 220,
              width: "100%",
              backgroundColor: Colors.secondary,
              borderRadius: 12,
            }}
          ></View>

          {/* Select Kalender */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginVertical: 16 }}
          >
            {tripCalendar.map((item) => (
              <Button
                key={item.id}
                style={{
                  width: 160,
                  backgroundColor:
                    item.id === 1 ? Colors.primary : Colors.white,
                  borderRadius: 24,
                  marginRight: 12,
                  borderColor: Colors.gray,
                  borderWidth: item.id === 1 ? 0 : 1,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Figtree_400Regular",
                    fontSize: 14,
                    color: item.id === 1 ? Colors.white : Colors.gray,
                    textAlign: "center",
                    paddingVertical: 4,
                  }}
                >
                  {format(item.date, "dd MMM yyyy")}
                </Text>
              </Button>
            ))}
          </ScrollView>

          {/* Itinerary */}
          <ItineraryCard />
          <ItineraryCard />
          <ItineraryCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default TripDetailPage;
