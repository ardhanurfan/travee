import ItineraryTile from "@/components/ItineraryTile";
import UnderButton from "@/components/UnderButton";
import Colors from "@/constants/Colors";
import { AddItinerary, GetItinerary } from "@/services/ItineraryService";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, ScrollView, View } from "react-native";
import { Appbar, TextInput, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Event } from "@/constants/Types";
import Toast from "react-native-toast-message";
import { GetTripById } from "@/services/TripService";
import { GetEvents } from "@/services/DestinationService";
import { format } from "date-fns";

function AddPage() {
  const { id, date, destinationId } = useLocalSearchParams();
  const { itinerary } = GetItinerary(id as string);
  const { events } = GetEvents({ destinationId: destinationId as string });
  const [addedEvents, setAddedEvents] = useState<Event[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const adjustItineraryItem = () => {
    return addedEvents.map((event) => ({
      event: event,
      time_start: new Date(),
      time_finish: new Date(),
    }));
  };

  const handleAddItinerary = async () => {
    try {
      await AddItinerary({
        itineraryItems: adjustItineraryItem(),
        tripId: id as string,
        destinationId: destinationId as string,
      });
      setLoading(true);
      Toast.show({
        type: "success",
        text1: "Add Itinerary to Trip Successful",
        text2: `Enjoy your trip!`,
      });
      router.back();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Add Itinerary to Trip Failed",
        text2: error as string,
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePress = (event: Event) => {
    setAddedEvents((prevAddedEvents) =>
      prevAddedEvents.find((eventAdded) => eventAdded.id === event.id)
        ? prevAddedEvents.filter((eventAdded) => eventAdded.id !== event.id)
        : [...prevAddedEvents, event]
    );
  };

  const eventInDate = useMemo(() => {
    return itinerary.find((item) => format(item.date, "yyyy-MM-dd") !== date)
      ?.items;
  }, [itinerary, date]);

  const filtered = useMemo(() => {
    return events
      .filter((event) =>
        eventInDate?.find((item) => item.event.id === event.id)
      )
      .filter((event) =>
        event.name.toLowerCase().includes(search.toLowerCase())
      );
  }, [events, itinerary, search]);

  return (
    <>
      <Appbar.Header style={{ backgroundColor: Colors.white }}>
        <Appbar.BackAction onPress={() => router.back()}></Appbar.BackAction>
        <Appbar.Content
          title="Add Event"
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
        <View style={{ paddingHorizontal: 20 }}>
          <TextInput
            mode="flat"
            placeholder="Search Places..."
            underlineStyle={{ display: "none" }}
            left={<TextInput.Icon icon="magnify" color={Colors.gray} />}
            cursorColor={Colors.primary}
            placeholderTextColor={Colors.gray}
            value={search}
            onChangeText={setSearch}
            style={{
              backgroundColor: Colors.lightGray,
              borderTopRightRadius: 12,
              borderTopLeftRadius: 12,
              borderBottomLeftRadius: 12,
              borderBottomRightRadius: 12,
              marginTop: 12,
              marginBottom: 4,
            }}
          />
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          style={{ paddingHorizontal: 20 }}
          data={filtered}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ItineraryTile
              name={item.name}
              type={item.type}
              imageUrl={item.photo_url}
              add
              onPress={() => handlePress(item)}
              iconPressed={
                addedEvents.find((event) => event.id == item.id) ? true : false
              }
            />
          )}
        ></FlatList>
        <UnderButton
          loading={loading}
          onPress={handleAddItinerary}
          text={"Save"}
        />
      </SafeAreaView>
    </>
  );
}

export default AddPage;
