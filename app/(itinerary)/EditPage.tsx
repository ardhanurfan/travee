import ItineraryTile from "@/components/ItineraryTile";
import UnderButton from "@/components/UnderButton";
import Colors from "@/constants/Colors";
import { Itinerary, ItineraryItem } from "@/constants/Types";
import { GetItinerary, RemoveItinerary } from "@/services/ItineraryService";
import { GetTripById } from "@/services/TripService";
import { generateDateRange } from "@/utils/generateDateRange";
import { format, parse } from "date-fns";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import { ScrollView, View } from "react-native";
import { Appbar, Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

function EditPage() {
  const { id, destinationId } = useLocalSearchParams();
  const { trip } = GetTripById(id as string);
  const { itinerary } = GetItinerary(id as string);

  const dateRange = useMemo(() => {
    return generateDateRange(trip?.start_date!, trip?.end_date!);
  }, [trip]);

  const handleRemovePeople = async (item: ItineraryItem) => {
    try {
      await RemoveItinerary({ itineraryItem: item, tripId: id as string });
      Toast.show({
        type: "error",
        text1: "Remove Event from Trip Successful",
        text2: `${item.event.name} removed from your trip!`,
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Remove Event from Trip Failed",
        text2: error as string,
      });
    }
  };

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
          {dateRange.map((date, idx) => {
            const itineraryDate = itinerary.find(
              (itinerary) =>
                format(itinerary.date, "yyyy-MM-dd") ===
                format(date, "yyyy-MM-dd")
            ) as Itinerary;

            return (
              <View key={idx}>
                <Text
                  style={{ fontFamily: "Figtree_600SemiBold", fontSize: 18 }}
                >
                  {`Day ${idx + 1}: ${format(date, "dd MMM yyyy")}`}
                </Text>
                {itineraryDate &&
                  itineraryDate.items.map((item) => (
                    <ItineraryTile
                      key={item.event.id}
                      name={item.event.name}
                      type={item.event.type}
                      imageUrl={item.event.photo_url}
                      onPress={() => handleRemovePeople(item)}
                    />
                  ))}
                <Button
                  mode="contained"
                  onPress={() =>
                    router.push({
                      pathname: "/(itinerary)/AddPage",
                      params: {
                        id: id,
                        date: format(date, "yyyy-MM-dd"),
                        destinationId: destinationId,
                      },
                    })
                  }
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
            );
          })}
        </ScrollView>
        <UnderButton onPress={() => router.back()} text={"Save Changes"} />
      </SafeAreaView>
    </>
  );
}

export default EditPage;
