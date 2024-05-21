import PersonalizeTile from "@/components/PersonalizeTile";
import UnderButton from "@/components/UnderButton";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Dimensions, View, Text, ScrollView } from "react-native";
import { Appbar, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

function FourthPage() {
  const [selectedCard, setSelectedCard] = useState<number>(0);
  const router = useRouter();
  let ScreenHeight = Dimensions.get("window").height;
  const handleCardPress = (index: number) => {
    setSelectedCard(index);
  };
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
                width: "100%",
                height: "100%",
                borderRadius: 21,
                backgroundColor: "#5850FE",
              }}
            ></View>
          </View>
        </View>
        <Appbar.BackAction
          // onPress={() => router.back()}
          style={{ opacity: 0 }}
        ></Appbar.BackAction>
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
          <Text
            style={{
              fontFamily: "Figtree_700Bold",
              fontSize: 28,
              marginTop: 20,
            }}
          >
            Set your trip budget 💰
          </Text>
          <Text
            style={{
              fontFamily: "Figtree_400Regular",
              fontSize: 16,
              marginTop: 20,
              color: "#848484",
              textAlign: "justify",
            }}
          >
            Let us know your budget preference and we’ll craft an itinerary that
            suits your financial comfort.
          </Text>
          {[
            { title: "Cheap 😁", desc: "Budget-friendly, economical travel." },
            {
              title: "Balanced ⚖️",
              desc: "Moderate spending for a balanced trip.",
            },
            { title: "Luxury 💎", desc: "High-end, indulgent experiences." },
            { title: "Flexible 💫", desc: "No budget restrictions." },
          ].map((card, index) => (
            <PersonalizeTile
              key={index}
              title={card.title}
              desc={card.desc}
              onClick={() => handleCardPress(index)}
              selected={selectedCard === index}
            />
          ))}
        </ScrollView>
        <UnderButton
          onPress={() => router.push("/(personalizeTrip)/SummaryPage")}
          text="Continue"
        />
      </SafeAreaView>
    </>
  );
}

export default FourthPage;
