import UnderButton from "@/components/UnderButton";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { ScrollView, View, Text } from "react-native";
import { Appbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useCallback, useState } from "react";
import CalendarPicker from "react-native-calendar-picker";
import { usePersonalize } from "@/context/PersonalizeContext";

function SecondPage() {
  const router = useRouter();
  const { start_date, end_date, setStartDate, setEndDate } = usePersonalize();
  const onDateChange = useCallback(
    (date: Date, type: "START_DATE" | "END_DATE") => {
      if (type === "START_DATE") {
        setStartDate(date);
      } else if (type === "END_DATE") {
        setEndDate(date);
      }
    },
    [setStartDate, setEndDate]
  );
  return (
    <>
      <Appbar.Header style={{ backgroundColor: Colors.white }}>
        <Appbar.BackAction onPress={() => router.back()}></Appbar.BackAction>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              width: 160,
              height: 16,
              backgroundColor: "#D9D9D9",
              borderRadius: 21,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                width: "50%",
                height: "100%",
                borderRadius: 21,
                backgroundColor: "#5850FE",
              }}
            ></View>
          </View>
        </View>
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
          // showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 20 }}
        >
          <Text
            style={{
              fontFamily: "Figtree_700Bold",
              fontSize: 28,
            }}
          >
            When will your adventure begin and end? 🗓️️
          </Text>
          <Text
            style={{
              fontFamily: "Figtree_400Regular",
              fontSize: 16,
              marginTop: 20,
              marginBottom: 20,
              color: "#848484",
              textAlign: "justify",
            }}
          >
            Choose the dates for your trip. This helps us plan the perfect
            itinerary for your travel period.
          </Text>
          <CalendarPicker
            onDateChange={onDateChange}
            allowRangeSelection={true}
            selectedEndDate={end_date}
            selectedStartDate={start_date}
            textStyle={{ fontFamily: "Figtree_400Regular", fontSize: 16 }}
            selectedRangeStartStyle={{ backgroundColor: Colors.primary }}
            selectedRangeEndStyle={{ backgroundColor: Colors.primary }}
            selectedRangeStyle={{ backgroundColor: Colors.secondary }}
            selectedRangeStartTextStyle={{ color: Colors.white }}
            selectedRangeEndTextStyle={{ color: Colors.white }}
            startFromMonday={true}
            previousTitle="Prev"
          />
        </ScrollView>

        <UnderButton
          onPress={() => router.push("/(personalizeTrip)/ThirdPage")}
          text="Continue"
        />
      </SafeAreaView>
    </>
  );
}

export default SecondPage;
