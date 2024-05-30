import PreferenceContent from "@/components/PreferenceContent";
import UnderButton from "@/components/UnderButton";
import { auth } from "@/config/firebase";
import Colors from "@/constants/Colors";
import { usePersonalize } from "@/context/PersonalizeContext";
import { GetEvents } from "@/services/DestinationService";
import { useAddTrip } from "@/services/TripService";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { ScrollView, View, Image, Modal, Animated, Easing } from "react-native";
import { Appbar, Icon, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { addDays, differenceInDays, startOfDay, endOfDay } from "date-fns";
import { Event, ItineraryItem } from "@/constants/Types";

function SummaryPage() {
  const router = useRouter();
  const {
    count_people,
    start_date,
    end_date,
    preferences,
    budget,
    name,
    country,
    photo_url,
    destination,
    clear,
  } = usePersonalize();
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString();
  };
  const { addTrip, loading, error } = useAddTrip();
  const { events } = GetEvents({ destinationId: destination });
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [count, setCount] = useState(0);
  const animatedValue = new Animated.Value(0);
  const [tripAdded, setTripAdded] = useState(false);

  const animateCount = () => {
    Animated.timing(animatedValue, {
      toValue: count,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animateCount();
  }, [count]);

  useEffect(() => {
    if (count === 100) {
      setTripAdded(true);
    }
  }, [count]);

  useEffect(() => {
    if (tripAdded) {
      for (let i = 0; i < 6; i++) {
        router.back();
      }
      clear();
      // Redirect to ListPage after adding trip
      router.replace("/(main)/MyTripsPage");
    }
  }, [tripAdded]);

  const animateCountUp = () => {
    let currentValue = 0;
    const increment = () => {
      if (currentValue < 100) {
        currentValue += 1;
        setCount(currentValue);
        requestAnimationFrame(increment);
      }
    };
    requestAnimationFrame(increment);
  };

  function getRandomDateWithinDay(day: Date): { start: Date; end: Date } {
    const startHour = 6;
    const endHour = 22;

    const start = new Date(day);
    const randomHour =
      Math.floor(Math.random() * (endHour - startHour)) + startHour;
    const randomMinute = Math.floor(Math.random() * 60);

    start.setHours(randomHour, randomMinute, 0, 0);

    const end = new Date(start);
    const eventDuration = Math.floor(Math.random() * 3) + 1;
    end.setHours(start.getHours() + eventDuration);

    // Ensure end time does not go beyond 10 PM
    if (
      end.getHours() > endHour ||
      (end.getHours() === endHour && end.getMinutes() > 0)
    ) {
      end.setHours(endHour, 0, 0, 0);
    }

    return { start, end };
  }

  function getRandomSubset<T>(array: T[], min: number): T[] {
    const shuffled = array.sort(() => 0.5 - Math.random());
    const subsetSize =
      Math.floor(Math.random() * (shuffled.length - min + 1)) + min;
    return shuffled.slice(0, subsetSize);
  }

  function randomizeEvents(
    events: Event[],
    startDate: Date,
    endDate: Date
  ): ItineraryItem[] {
    const totalDays = differenceInDays(endDate, startDate) + 1;
    const eventsPerDay: { [key: string]: Event[] } = {};

    // Ensure each day has at least one event
    for (let i = 0; i < totalDays; i++) {
      const currentDay = addDays(startDate, i).toISOString().split("T")[0]; // Use date string as key
      eventsPerDay[currentDay] = [];
    }

    const selectedEvents = getRandomSubset(events, totalDays);

    selectedEvents.forEach((event) => {
      const dayIndex = Math.floor(Math.random() * totalDays);
      const day = addDays(startDate, dayIndex).toISOString().split("T")[0];
      eventsPerDay[day].push(event);
    });

    const randomizedEvents: ItineraryItem[] = [];
    for (let day in eventsPerDay) {
      eventsPerDay[day].forEach((event) => {
        const { start, end } = getRandomDateWithinDay(new Date(day));
        randomizedEvents.push({
          event: event,
          time_start: start,
          time_finish: end,
        });
      });
    }

    return randomizedEvents;
  }

  // Example usage within handleAddTrip function
  const handleAddTrip = async () => {
    // Randomize events with start and end dates
    const randomizedEvents = randomizeEvents(events, start_date, end_date);

    animateCountUp();
    // Add trip and events to Firestore
    await addTrip({
      budget: budget,
      count_people: count_people,
      destination: destination,
      start_date: start_date,
      end_date: end_date,
      members: [auth.currentUser ? auth.currentUser.uid : ""],
      owners: auth.currentUser?.uid,
      preferences: preferences,
      events: randomizedEvents,
    });

  };

  // Example usage within handleAddTrip function
  // const handleAddTrip = async () => {
  //   // Randomize events with start and end dates
  //   const randomizedEvents = randomizeEvents(events, start_date, end_date);

  //   // Add trip and events to Firestore
  //   await addTrip({
  //     budget: budget,
  //     count_people: count_people,
  //     destination: destination,
  //     start_date: start_date,
  //     end_date: end_date,
  //     members: [auth.currentUser ? auth.currentUser.uid : ""],
  //     owners: auth.currentUser?.uid,
  //     preferences: preferences,
  //     events: randomizedEvents,
  //   });

  //   animateCountUp();
  // };

  // const handleAddTrip = async () => {
  //   // Add trip and events to Firestore
  //   await addTrip({
  //     budget: budget,
  //     count_people: count_people,
  //     destination: destination,
  //     start_date: start_date,
  //     end_date: end_date,
  //     members: [auth.currentUser ? auth.currentUser.uid : ""],
  //     owners: auth.currentUser?.uid,
  //     preferences: preferences,
  //     events: events.map((event) => ({
  //       event: event,
  //       time_finish: start_date,
  //       time_start: start_date,
  //     })),
  //   });
  //   animateCountUp();
  // };

  return (
    <>
      <Appbar.Header style={{ backgroundColor: Colors.white }}>
        <Appbar.BackAction onPress={() => router.back()}></Appbar.BackAction>
        <Appbar.Content
          title="Review Summary"
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
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 20 }}
        >
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#D1D5DA",
              paddingVertical: 20,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <Icon
                  source="map-marker-outline"
                  size={25}
                  color={Colors.black}
                ></Icon>
                <Text
                  style={{ fontFamily: "Figtree_600SemiBold", fontSize: 16 }}
                >
                  Destination
                </Text>
              </View>
              <Icon
                source="pencil-outline"
                size={20}
                color={Colors.primary}
              ></Icon>
            </View>
            <View
              style={{
                marginTop: 8,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 20,
              }}
            >
              <Image
                source={{ uri: photo_url }}
                style={{ width: 128, height: 96, borderRadius: 16 }}
              />
              <View>
                <Text
                  style={{ fontFamily: "Figtree_600SemiBold", fontSize: 16 }}
                >
                  {name}
                </Text>
                <Text
                  style={{ fontFamily: "Figtree_400Regular", fontSize: 16 }}
                >
                  {country}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#D1D5DA",
              paddingVertical: 20,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <Icon
                  source="account-group-outline"
                  size={25}
                  color={Colors.black}
                ></Icon>
                <Text
                  style={{ fontFamily: "Figtree_600SemiBold", fontSize: 16 }}
                >
                  Party
                </Text>
              </View>
              <Icon
                source="pencil-outline"
                size={20}
                color={Colors.primary}
              ></Icon>
            </View>
            <Text
              style={{
                fontFamily: "Figtree_400Regular",
                fontSize: 16,
                marginLeft: 37,
              }}
            >
              {count_people}
            </Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#D1D5DA",
              paddingVertical: 20,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <Icon source="calendar" size={25} color={Colors.black}></Icon>
                <Text
                  style={{ fontFamily: "Figtree_600SemiBold", fontSize: 16 }}
                >
                  Trip Date
                </Text>
              </View>
              <Icon
                source="pencil-outline"
                size={20}
                color={Colors.primary}
              ></Icon>
            </View>
            <Text
              style={{
                fontFamily: "Figtree_400Regular",
                fontSize: 16,
                marginLeft: 37,
              }}
            >
              {formatDate(start_date)} - {formatDate(end_date)}
            </Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#D1D5DA",
              paddingVertical: 20,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <Icon
                  source="map-marker-outline"
                  size={25}
                  color={Colors.black}
                ></Icon>
                <Text
                  style={{ fontFamily: "Figtree_600SemiBold", fontSize: 16 }}
                >
                  Destination
                </Text>
              </View>
              <Icon
                source="pencil-outline"
                size={20}
                color={Colors.primary}
              ></Icon>
            </View>
            <View
              style={{
                marginTop: 8,
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 8,
                marginLeft: 37,
              }}
            >
              {preferences.map((preference, index) => (
                <PreferenceContent
                  text={preference}
                  isSelected={preferences.includes(preference)}
                />
              ))}
            </View>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#D1D5DA",
              paddingVertical: 20,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <Icon
                  source="account-group-outline"
                  size={25}
                  color={Colors.black}
                ></Icon>
                <Text
                  style={{ fontFamily: "Figtree_600SemiBold", fontSize: 16 }}
                >
                  Budget
                </Text>
              </View>
              <Icon
                source="pencil-outline"
                size={20}
                color={Colors.primary}
              ></Icon>
            </View>
            <Text
              style={{
                fontFamily: "Figtree_400Regular",
                fontSize: 16,
                marginLeft: 37,
              }}
            >
              {budget}
            </Text>
          </View>
        </ScrollView>
        <UnderButton
          onPress={() => {
            setModalVisible(true);
            handleAddTrip();
          }}
          text="Build My Itinerary"
        />
      </SafeAreaView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            paddingHorizontal: 48,
          }}
        >
          <View
            style={{
              backgroundColor: Colors.white,
              padding: 20,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Figtree_700Bold",
                fontSize: 56,
                marginBottom: 20,
                color: Colors.primary,
              }}
            >{`${Math.floor(count)}%`}</Text>
            <Text
              style={{
                fontFamily: "Figtree_700Bold",
                fontSize: 16,
                marginBottom: 8,
              }}
            >
              Generating Itinerary
            </Text>
            <Text
              style={{
                fontFamily: "Figtree_400Regular",
                fontSize: 12,
                color: Colors.gray,
                textAlign: "center",
              }}
            >
              Please wait while our AI works its magic to create the perfect
              trip plan tailord to your preferences
            </Text>
          </View>
        </View>
      </Modal>
    </>
  );
}

export default SummaryPage;
