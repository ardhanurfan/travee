import PreferenceContent from "@/components/PreferenceContent";
import UnderButton from "@/components/UnderButton";
import { useRouter } from "expo-router";
import { Dimensions, View, Text, ScrollView } from "react-native";
import { Appbar, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "react-native/Libraries/NewAppScreen";

function ThirdPage() {
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
              width: "75%",
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
          <PreferenceContent text="Adventure Travel 🔍" isSelected={false}/>
          <PreferenceContent text="City Breaks 🌇" isSelected={false}/>
          <PreferenceContent text="Glampings 🏕️" isSelected={false}/>
          <PreferenceContent text="Cultural Exploration 👹" isSelected={false}/>
          <PreferenceContent text="Nature Escapes 🌱" isSelected={false} />
          <PreferenceContent text="Beach 🏖️" isSelected={false}/>
          <PreferenceContent text="Road Trips 🚘" isSelected={false}/>
          <PreferenceContent text="Relaxing Gateway 🧘🏻‍♀️" isSelected={false}/>
          <PreferenceContent text="Culinary Nights 🍜" isSelected={false}/>
          <PreferenceContent text="Backpacking 🎒" isSelected={false}/>
          <PreferenceContent text="Staycation 🏠" isSelected={false}/>
          <PreferenceContent text="Formal Event 📃" isSelected={false}/>
          <PreferenceContent text="Nights Party 🪩" isSelected={false}/>
          <PreferenceContent text="Unique Activities ✍🏻" isSelected={false}/>
          <PreferenceContent text="Wildlife Safaris 🦁" isSelected={false}/>
          <PreferenceContent text="Art Galeries 🖼️" isSelected={false}/>
          <PreferenceContent text="Historical States 🗿" isSelected={false}/>
          <PreferenceContent text="Eco-Tourism ♻️" isSelected={false}/>
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
