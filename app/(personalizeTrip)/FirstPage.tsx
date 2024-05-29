import PersonalizeTile from "@/components/PersonalizeTile";
import UnderButton from "@/components/UnderButton";
import Colors from "@/constants/Colors";
import { usePersonalize } from "@/context/PersonalizeContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Dimensions, View, Text, ScrollView } from "react-native";
import { Appbar, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

function FirstPage() {
  const [selectedCard, setSelectedCard] = useState<number>(0);
  const router = useRouter();
  const handleCardPress = (index: number) => {
    setSelectedCard(index);
  };
  const {count_people, setCountPeople} = usePersonalize();
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
                width: "25%",
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
              Who is going? 🙋🏼‍♀️
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
              Let’s get started by selecting who you’re traveling with
            </Text>
            {[
              { title: "Only Me 🚶🏻", desc: "Traveling solo just you" },
              { title: "A Couple ❤️", desc: "A romantic getaway for two." },
              {
                title: "Family 👨‍👨‍👧‍👦",
                desc: "Quality time with your loved ones.",
              },
              {
                title: "Friends ⭐️",
                desc: "Adventure with your closest pals.",
              },
              { title: "Work 💼", desc: "Business or corporate travel." },
            ].map((card, index) => (
              <PersonalizeTile
                key={index}
                title={card.title}
                desc={card.desc}
                onClick={() => setCountPeople(card.title)}
                selected={card.title == count_people}
              />
            ))}
        </ScrollView>
        <UnderButton
          onPress={() => router.push("/(personalizeTrip)/SecondPage")}
          text="Continue"
        />
      </SafeAreaView>
    </>
  );
}

export default FirstPage;
