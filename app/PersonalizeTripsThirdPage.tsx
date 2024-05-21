import PreferenceContent from "@/components/PreferenceContent";
import { useRouter } from "expo-router";
import { Dimensions, SafeAreaView, View, Text } from "react-native";
import { Appbar, Button } from "react-native-paper";
import { Colors } from "react-native/Libraries/NewAppScreen";

function PersonalizeTripsThirdPage() {
  const router = useRouter();
  let ScreenHeight = Dimensions.get("window").height;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
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
        <Appbar.BackAction
          //   onPress={() => router.push("/PersonalizeTripsThirdPage")}
          style={{ opacity: 0 }}
        ></Appbar.BackAction>
      </Appbar.Header>
      <View
        style={{
          backgroundColor: Colors.white,
          height: ScreenHeight,
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <View style={{ width: "100%", paddingLeft: 20 }}>
          <View style={{ paddingRight: 20 }}>
            <Text
              style={{
                fontFamily: "Figtree_700Bold",
                fontSize: 28,
                marginTop: 20,
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
          </View>
          <View
            style={{
              marginTop: 20,
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
        </View>
        <View
          style={{
            paddingVertical: 16,
            paddingHorizontal: 20,
            borderTopColor: "#848484",
            // borderTopWidth: 0.5,
            width: "100%",
          }}
        >
          <Button
            mode="contained"
            onPress={() => router.push("/PersonalizeTripsThirdPage")}
            style={{
              backgroundColor: "#5850FE",
              borderRadius: 28,
              // width: "100%",
              // height: "auto",
              paddingVertical: 6,
              // flex: 1,
              // justifyContent: "center",
              // alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Figtree_600SemiBold",
                color: Colors.white,
                fontSize: 16,
              }}
            >
              Continue
            </Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default PersonalizeTripsThirdPage;
