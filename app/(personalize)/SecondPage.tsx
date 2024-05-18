import PreferenceContent from "@/components/PreferenceContent";
import UnderButton from "@/components/UnderButton";
import { useRouter } from "expo-router";
import { Dimensions, View, Text, ScrollView } from "react-native";
import { Appbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "react-native/Libraries/NewAppScreen";

function SecondPage() {
  const router = useRouter();
  let ScreenHeight = Dimensions.get("window").height;

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
                width: "66%",
                height: "100%",
                borderRadius: 21,
                backgroundColor: "#5850FE",
              }}
            ></View>
          </View>
        </View>
        <Appbar.BackAction style={{ display: "none" }}></Appbar.BackAction>
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
            Travel preferences ✈️
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
            Tell us your travel preferences and we'll tailor recommendations to
            your style. Don't worry, you can always change it later in the
            settings.
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
            <PreferenceContent text="Adventure Travel 🔍" />
            <PreferenceContent text="City Breaks 🌇" />
            <PreferenceContent text="Glampings 🏕️" />
            <PreferenceContent text="Cultural Exploration 👹" />
            <PreferenceContent text="Nature Escapes 🌱" />
            <PreferenceContent text="Beach 🏖️" />
            <PreferenceContent text="Road Trips 🚘" />
            <PreferenceContent text="Relaxing Gateway 🧘🏻‍♀️" />
            <PreferenceContent text="Culinary Nights 🍜" />
            <PreferenceContent text="Backpacking 🎒" />
            <PreferenceContent text="Staycation 🏠" />
            <PreferenceContent text="Formal Event 📃" />
            <PreferenceContent text="Nights Party 🪩" />
            <PreferenceContent text="Unique Activities ✍🏻" />
            <PreferenceContent text="Wildlife Safaris 🦁" />
            <PreferenceContent text="Art Galeries 🖼️" />
            <PreferenceContent text="Historical States 🗿" />
            <PreferenceContent text="Eco-Tourism ♻️" />
          </View>
        </ScrollView>

        <UnderButton
          onPress={() => router.push("/(personalize)/ThirdPage")}
          text="Continue"
        />
      </SafeAreaView>
    </>
  );
}

export default SecondPage;
