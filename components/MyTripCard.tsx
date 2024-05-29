import Colors from "@/constants/Colors";
import { Trip } from "@/constants/Types";
import { format } from "date-fns";
import { useRouter } from "expo-router";
import React from "react";
import { View, Image, Text, Pressable } from "react-native";
import { IconButton } from "react-native-paper";

function MyTripCard({ trip }: { trip: Trip }) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/TripDetailPage",
          params: {
            id: trip.id,
          },
        })
      }
    >
      <View style={{ flex: 1, marginBottom: 16 }}>
        <Image
          source={{ uri: trip.destination.photo_url }}
          style={{
            width: "100%",
            height: 200,
            objectFit: "cover",
            borderRadius: 20,
          }}
        />
        <Text
          style={{
            fontFamily: "Figtree_700Bold",
            fontSize: 16,
            marginVertical: 8,
          }}
        >
          {trip.destination.name}
        </Text>
        <Text
          style={{
            fontFamily: "Figtree_300Light",
            fontSize: 12,
          }}
        >
          {`${format(trip.start_date, "dd MMM yyyy")}-${format(
            trip.end_date,
            "dd MMM yyyy"
          )}  |  ${trip.count_people}|  ${trip.budget}`}
        </Text>
        <View
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            backgroundColor: Colors.white,
            borderRadius: 8,
            padding: 8,
          }}
        >
          <Text style={{ fontFamily: "Figtree_700Bold", fontSize: 12 }}>
            D-122
          </Text>
        </View>
        {/* <IconButton
          icon="share-outline"
          iconColor={Colors.black}
          size={20}
          style={{
            position: "absolute",
            top: 4,
            right: 4,
            backgroundColor: Colors.white,
            borderRadius: 999,
          }}
          onPress={() => console.log("Pressed")}
        /> */}
      </View>
    </Pressable>
  );
}

export default MyTripCard;
