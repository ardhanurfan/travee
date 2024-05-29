import ItineraryTile from "@/components/ItineraryTile";
import UnderButton from "@/components/UnderButton";
import Colors from "@/constants/Colors";
import { GroupedItinerary, ItineraryItem } from "@/constants/Types";
import { format, parse } from "date-fns";
import { router } from "expo-router";
import React, { useMemo } from "react";
import { ScrollView, View } from "react-native";
import { Appbar, Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

function EditPage() {
  const itinerary = [
    {
      id: 1,
      name: "Ocean Grill 1",
      type: "Restaurant",
      imageUrl: "../assets/itinerary.png",
      date: parse("05/18/2024 10:00", "MM/dd/yyyy HH:mm", new Date()),
    },
    {
      id: 2,
      name: "Ocean Grill 3",
      type: "Restaurant",
      imageUrl: "../assets/itinerary.png",
      date: parse("05/19/2024 10:00", "MM/dd/yyyy HH:mm", new Date()),
    },
    {
      id: 3,
      name: "Ocean Grill 2",
      type: "Restaurant",
      imageUrl: "../assets/itinerary.png",
      date: parse("05/18/2024 07:00", "MM/dd/yyyy HH:mm", new Date()),
    },
  ];

  const grouped = useMemo<GroupedItinerary[]>(() => {
    const groups: { [key: string]: ItineraryItem[] } = itinerary.reduce(
      (acc, item) => {
        const date = item.date.toISOString().split("T")[0]; // extract only the date part
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(item);
        return acc;
      },
      {} as { [key: string]: ItineraryItem[] }
    );

    return Object.keys(groups).map((date) => ({
      date,
      itineraries: groups[date],
    }));
  }, [itinerary]);

  return (
    <>
      <Appbar.Header style={{ backgroundColor: Colors.white }}>
        <Appbar.BackAction onPress={() => router.back()}></Appbar.BackAction>
        <Appbar.Content
          title="Edit Itinerary"
          titleStyle={{ fontFamily: "Figtree_700Bold", textAlign: "center" }}
        />
        <Appbar.BackAction style={{ opacity: 0 }}></Appbar.BackAction>
      </Appbar.Header>
      <SafeAreaView
        edges={["bottom"]}
        style={{
          flex: 1,
          backgroundColor: Colors.white,
        }}
      >
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={{ paddingHorizontal: 20 }}
        >
          {grouped.map((itineraryDate, idx) => (
            <View key={idx}>
              <Text style={{ fontFamily: "Figtree_600SemiBold", fontSize: 18 }}>
                {`Day ${idx + 1}: ${format(itineraryDate.date, "dd MMM yyyy")}`}
              </Text>
              {itineraryDate.itineraries.map((item) => (
                <ItineraryTile
                  key={item.id}
                  name={item.name}
                  type={item.type}
                  imageUrl={item.imageUrl}
                />
              ))}
              <Button
                mode="contained"
                onPress={() => router.push("/(itinerary)/AddPage")}
                style={{
                  backgroundColor: Colors.secondary,
                  borderRadius: 28,
                  marginTop: 12,
                  marginBottom: 20,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Figtree_600SemiBold",
                    color: Colors.primary,
                    fontSize: 16,
                  }}
                >
                  Add Event
                </Text>
              </Button>
            </View>
          ))}
        </ScrollView>
        <UnderButton onPress={() => {}} text={"Save Changes"} />
      </SafeAreaView>
    </>
  );
}

export default EditPage;
