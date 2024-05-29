import EmptyContent from "@/components/EmptyContent";
import MyTripCard from "@/components/MyTripCard";
import Colors from "@/constants/Colors";
import { MyTripsTypes } from "@/constants/Types";
import { GetTrips } from "@/services/TripService";
import { useMemo, useState } from "react";
import { FlatList, View } from "react-native";
import { Appbar, Button, Text } from "react-native-paper";

export default function MyTripsPage() {
  const { trips } = GetTrips();
  const [tripsState, setTripsState] = useState<MyTripsTypes>(
    MyTripsTypes.Upcoming
  );

  const filtered = useMemo(() => {
    if (tripsState == MyTripsTypes.Upcoming) {
      return trips.filter((trip) => trip.start_date.getTime() > Date.now());
    } else if (tripsState == MyTripsTypes.Active) {
      return trips.filter(
        (trip) =>
          trip.start_date.getTime() <= Date.now() &&
          trip.end_date.getTime() >= Date.now()
      );
    } else {
      return trips.filter((trip) => trip.end_date.getTime() < Date.now());
    }
  }, [trips, tripsState]);

  return (
    <>
      <Appbar.Header style={{ backgroundColor: Colors.white }}>
        <Appbar.Content
          title="My Trips"
          titleStyle={{ fontFamily: "Figtree_700Bold" }}
        />
        <Appbar.Action icon="magnify" />
      </Appbar.Header>

      <View
        style={{
          paddingHorizontal: 20,
          backgroundColor: Colors.white,
          paddingBottom: 2,
        }}
      >
        <View
          style={{
            borderRadius: 8,
            flexDirection: "row",
            backgroundColor: Colors.lightGray,
          }}
        >
          <Button
            mode="contained"
            onPress={() => setTripsState(MyTripsTypes.Upcoming)}
            style={{
              flex: 1,
              borderRadius: 8,
              backgroundColor:
                tripsState == MyTripsTypes.Upcoming
                  ? Colors.primary
                  : Colors.lightGray,
            }}
          >
            <Text
              style={{
                fontFamily: "Figtree_400Regular",
                fontSize: 12,
                color:
                  tripsState == MyTripsTypes.Upcoming
                    ? Colors.white
                    : Colors.black,
              }}
            >
              Upcoming
            </Text>
          </Button>
          <Button
            mode="contained"
            onPress={() => setTripsState(MyTripsTypes.Active)}
            style={{
              flex: 1,
              borderRadius: 8,
              backgroundColor:
                tripsState == MyTripsTypes.Active
                  ? Colors.primary
                  : Colors.lightGray,
            }}
          >
            <Text
              style={{
                fontFamily: "Figtree_400Regular",
                fontSize: 12,
                color:
                  tripsState == MyTripsTypes.Active
                    ? Colors.white
                    : Colors.black,
              }}
            >
              Active
            </Text>
          </Button>
          <Button
            mode="contained"
            onPress={() => setTripsState(MyTripsTypes.Passed)}
            style={{
              flex: 1,
              borderRadius: 8,
              backgroundColor:
                tripsState == MyTripsTypes.Passed
                  ? Colors.primary
                  : Colors.lightGray,
            }}
          >
            <Text
              style={{
                fontFamily: "Figtree_400Regular",
                fontSize: 12,
                color:
                  tripsState == MyTripsTypes.Passed
                    ? Colors.white
                    : Colors.black,
              }}
            >
              Passed
            </Text>
          </Button>
        </View>
      </View>

      {filtered.length == 0 ? (
        <EmptyContent
          icon={"map-marker-outline"}
          caption={
            "Let our AI create personalized trip plans just for you. Start planning now!"
          }
        />
      ) : (
        <FlatList
          style={{
            backgroundColor: Colors.white,
            paddingHorizontal: 20,
            paddingTop: 16,
          }}
          showsVerticalScrollIndicator={false}
          data={filtered}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MyTripCard trip={item} />}
        ></FlatList>
      )}
    </>
  );
}
