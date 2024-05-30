import Colors from "@/constants/Colors";
import { ItineraryItem } from "@/constants/Types";
import { format } from "date-fns";
import React from "react";
import { View, Image, Linking, TouchableOpacity } from "react-native";
import { Icon, Text } from "react-native-paper";

function ItineraryCard({ itineraryItem }: { itineraryItem: ItineraryItem }) {
  const openGoogleMaps = (latitude: number, longitude: number) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  const transportation = [
    {
      icon: "car",
      time: "12 min",
    },
    {
      icon: "motorbike",
      time: "5 min",
    },
    {
      icon: "walk",
      time: "20 min",
    },
    {
      icon: "bus",
      time: "14 min",
    },
    {
      icon: "train",
      time: "-",
    },
    {
      icon: "airplane",
      time: "-",
    },
  ];

  return (
    <View style={{ flexDirection: "row", marginBottom: 16 }}>
      <View style={{ alignItems: "center", marginRight: 8 }}>
        <Icon
          size={32}
          color={Colors.gray}
          source={"silverware-fork-knife"}
        ></Icon>
        <View
          style={{
            width: 1,
            flex: 1,
            backgroundColor: Colors.gray,
            height: 32,
          }}
        ></View>
        <Icon
          size={32}
          color={Colors.gray}
          source={"navigation-variant-outline"}
        ></Icon>
      </View>
      <View style={{ flex: 1, gap: 8 }}>
        <View
          style={{
            borderRadius: 12,
            borderColor: Colors.gray,
            borderWidth: 1,
            overflow: "hidden",
          }}
        >
          <Image
            source={{ uri: itineraryItem.event.photo_url }}
            style={{
              width: "100%",
              height: 160,
              objectFit: "cover",
            }}
          />
          <View style={{ padding: 12 }}>
            <Text
              style={{
                fontFamily: "Figtree_700Bold",
                fontSize: 20,
              }}
            >
              {itineraryItem.event.name}
            </Text>
            <View
              style={{
                flexDirection: "row",
                gap: 4,
                alignItems: "center",
                paddingBottom: 12,
                marginBottom: 12,
                borderBottomWidth: 1,
                borderBottomColor: Colors.gray,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                {[0, 1, 2, 3, 4].map((item, idx) => (
                  <Icon
                    key={idx}
                    size={16}
                    source={"star"}
                    color={"#EFCE25"}
                  ></Icon>
                ))}
              </View>
              <Text
                style={{
                  fontFamily: "Figtree_400Regular",
                  fontSize: 12,
                  color: Colors.gray,
                }}
              >
                (4.8)
              </Text>
              <Text
                style={{
                  fontFamily: "Figtree_400Regular",
                  fontSize: 12,
                  color: Colors.gray,
                }}
              >
                120 Reviewers
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
            >
              <Icon size={20} source={"clock-outline"}></Icon>
              <Text
                style={{
                  fontFamily: "Figtree_400Regular",
                  fontSize: 14,
                  color: Colors.black,
                }}
              >
                {`${format(itineraryItem.time_start, "HH:mm")} - ${format(
                  itineraryItem.time_finish,
                  "HH:mm"
                )}`}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 8,
                alignItems: "center",
                marginVertical: 8,
              }}
            >
              <Icon size={20} source={"credit-card-outline"}></Icon>
              <Text
                style={{
                  fontFamily: "Figtree_400Regular",
                  fontSize: 14,
                  color: Colors.black,
                }}
              >
                {itineraryItem.event.price}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                gap: 8,
                alignItems: "center",
              }}
              onPress={() =>
                openGoogleMaps(
                  itineraryItem.event.latitude,
                  itineraryItem.event.longitude
                )
              }
            >
              <Icon
                size={20}
                source={"map-marker-outline"}
                color={Colors.primary}
              ></Icon>
              <Text
                style={{
                  fontFamily: "Figtree_400Regular",
                  fontSize: 14,
                  color: Colors.primary,
                }}
              >
                View on Google Maps
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            borderRadius: 12,
            paddingVertical: 12,
            borderColor: Colors.gray,
            borderWidth: 1,
            flexDirection: "row",
            justifyContent: "space-evenly",
            overflow: "hidden",
          }}
        >
          {transportation.map((item) => (
            <View key={item.icon} style={{ alignItems: "center" }}>
              <Icon size={20} source={item.icon} color={Colors.gray}></Icon>
              <Text
                style={{
                  fontFamily: "Figtree_400Regular",
                  fontSize: 10,
                  color: Colors.gray,
                }}
              >
                {item.time}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

export default ItineraryCard;
