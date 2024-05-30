import PreferenceContent from "@/components/PreferenceContent";
import UnderButton from "@/components/UnderButton";
import { usePersonalize } from "@/context/PersonalizeContext";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Appbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "react-native/Libraries/NewAppScreen";

function ThirdPage() {
  const router = useRouter();
  const { preferences, setPreferences } = usePersonalize();

  const preferencesData = [
    "Adventure Travel 🔍",
    "City Breaks 🌇",
    "Glampings 🏕️",
    "Cultural Exploration 👹",
    "Nature Escapes 🌱",
    "Beach 🏖️",
    "Road Trips 🚘",
    "Relaxing Gateway 🧘🏻‍♀️",
    "Culinary Nights 🍜",
    "Backpacking 🎒",
    "Staycation 🏠",
    "Formal Event 📃",
    "Nights Party 🪩",
    "Unique Activities ✍🏻",
    "Wildlife Safaris 🦁",
    "Art Galeries 🖼️",
    "Historical States 🗿",
    "Eco-Tourism ♻️",
  ];

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
                width: "75%",
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
        style={{ flex: 1, backgroundColor: Colors.white }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 20 }}
        >
          <Text
            style={{
              fontFamily: "Figtree_700Bold",
              fontSize: 28,
            }}
          >
            Tailor your adventure to your tastes 📝
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
            Select your travel preferences to customize your trip plan.
          </Text>
          <View
            style={{
              marginVertical: 20,
              display: "flex",
              flexDirection: "row",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            {preferencesData.map((preference, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  preferences.includes(preference)
                    ? setPreferences(
                        preferences.filter((p) => p !== preference)
                      )
                    : setPreferences([...preferences, preference])
                }
              >
                <PreferenceContent
                  text={preference}
                  isSelected={preferences.includes(preference)}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <UnderButton
          onPress={() => router.push("/(personalizeTrip)/FourthPage")}
          text="Continue"
        />
      </SafeAreaView>
    </>
  );
}

export default ThirdPage;
