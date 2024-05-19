import Colors from "@/constants/Colors";
import React from "react";
import { View, Image } from "react-native";
import { Icon, Text } from "react-native-paper";

function ItineraryCard() {
  const transportation = [
    {
      icon: "car",
      time: "9 min",
    },
    {
      icon: "motorbike",
      time: "9 min",
    },
    {
      icon: "walk",
      time: "9 min",
    },
    {
      icon: "bus",
      time: "9 min",
    },
    {
      icon: "train",
      time: "9 min",
    },
    {
      icon: "airplane",
      time: "9 min",
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
            source={require("../assets/destination.png")}
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
              Ocean Grill
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
                {[0, 1, 2, 3, 4].map((item) => (
                  <Icon size={16} source={"star"} color={"#EFCE25"}></Icon>
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
                08:00 AM - 09:00 PM
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
                $30.00
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 8,
                alignItems: "center",
              }}
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
            </View>
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
