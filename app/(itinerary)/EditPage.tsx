import ItineraryTile from "@/components/ItineraryTile";
import UnderButton from "@/components/UnderButton";
import Colors from "@/constants/Colors";
import { Itinerary, ItineraryItem } from "@/constants/Types";
import { GetItinerary } from "@/services/ItineraryService";
import { format, parse } from "date-fns";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import { ScrollView, View } from "react-native";
import { Appbar, Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

function EditPage() {
  const { id, destinationId } = useLocalSearchParams();
  const { itinerary } = GetItinerary(id as string);

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
          {itinerary.map((itineraryDate, idx) => (
            <View key={idx}>
              <Text style={{ fontFamily: "Figtree_600SemiBold", fontSize: 18 }}>
                {`Day ${idx + 1}: ${format(itineraryDate.date, "dd MMM yyyy")}`}
              </Text>
              {itineraryDate.items.map((item) => (
                <ItineraryTile
                  key={item.event.id}
                  name={item.event.name}
                  type={item.event.type}
                  imageUrl={item.event.photo_url}
                />
              ))}
              <Button
                mode="contained"
                onPress={() =>
                  router.push({
                    pathname: "/(itinerary)/AddPage",
                    params: {
                      id: id,
                      idxDate: idx,
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
          ))}
        </ScrollView>
        <UnderButton onPress={() => {}} text={"Save Changes"} />
      </SafeAreaView>
    </>
  );
}

export default EditPage;
