import PreferenceContent from "@/components/PreferenceContent";
import UnderButton from "@/components/UnderButton";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { ScrollView, View, Image } from "react-native";
import { Appbar, Icon, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

function SummaryPage() {
  const router = useRouter();

  return (
    <>
      <Appbar.Header style={{ backgroundColor: Colors.white }}>
        <Appbar.BackAction onPress={() => router.back()}></Appbar.BackAction>
        <Appbar.Content
          title="Review Summary"
          titleStyle={{ fontFamily: "Figtree_700Bold", textAlign: "center" }}
        />
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
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 20 }}
        >
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#D1D5DA",
              paddingVertical: 20,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <Icon
                  source="map-marker-outline"
                  size={25}
                  color={Colors.black}
                ></Icon>
                <Text
                  style={{ fontFamily: "Figtree_600SemiBold", fontSize: 16 }}
                >
                  Destination
                </Text>
              </View>
              <Icon
                source="pencil-outline"
                size={20}
                color={Colors.primary}
              ></Icon>
            </View>
            <View
              style={{
                marginTop: 8,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 20,
              }}
            >
              <Image
                source={require("../../assets/destination.png")}
                style={{ width: 128, height: 96, borderRadius: 16 }}
              />
              <View>
                <Text
                  style={{ fontFamily: "Figtree_600SemiBold", fontSize: 16 }}
                >
                  Jogja, Central Java
                </Text>
                <Text
                  style={{ fontFamily: "Figtree_400Regular", fontSize: 16 }}
                >
                  🇮🇩 Indonesia
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#D1D5DA",
              paddingVertical: 20,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <Icon
                  source="account-group-outline"
                  size={25}
                  color={Colors.black}
                ></Icon>
                <Text
                  style={{ fontFamily: "Figtree_600SemiBold", fontSize: 16 }}
                >
                  Party
                </Text>
              </View>
              <Icon
                source="pencil-outline"
                size={20}
                color={Colors.primary}
              ></Icon>
            </View>
            <Text
              style={{
                fontFamily: "Figtree_400Regular",
                fontSize: 16,
                marginLeft: 37,
              }}
            >
              Only Me 🚶🏻
            </Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#D1D5DA",
              paddingVertical: 20,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <Icon source="calendar" size={25} color={Colors.black}></Icon>
                <Text
                  style={{ fontFamily: "Figtree_600SemiBold", fontSize: 16 }}
                >
                  Trip Date
                </Text>
              </View>
              <Icon
                source="pencil-outline"
                size={20}
                color={Colors.primary}
              ></Icon>
            </View>
            <Text
              style={{
                fontFamily: "Figtree_400Regular",
                fontSize: 16,
                marginLeft: 37,
              }}
            >
              12 March 2024 - 15 March 2024
            </Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#D1D5DA",
              paddingVertical: 20,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <Icon
                  source="map-marker-outline"
                  size={25}
                  color={Colors.black}
                ></Icon>
                <Text
                  style={{ fontFamily: "Figtree_600SemiBold", fontSize: 16 }}
                >
                  Destination
                </Text>
              </View>
              <Icon
                source="pencil-outline"
                size={20}
                color={Colors.primary}
              ></Icon>
            </View>
            <View
              style={{
                marginTop: 8,
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 8,
                marginLeft: 37,
              }}
            >
              <PreferenceContent text="Adventure Travel 🔍" isSelected={false}/>
              <PreferenceContent text="City Breaks 🌇" isSelected={false} />
              <PreferenceContent text="Glampings 🏕️" isSelected={false} />
            </View>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#D1D5DA",
              paddingVertical: 20,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <Icon
                  source="account-group-outline"
                  size={25}
                  color={Colors.black}
                ></Icon>
                <Text
                  style={{ fontFamily: "Figtree_600SemiBold", fontSize: 16 }}
                >
                  Budget
                </Text>
              </View>
              <Icon
                source="pencil-outline"
                size={20}
                color={Colors.primary}
              ></Icon>
            </View>
            <Text
              style={{
                fontFamily: "Figtree_400Regular",
                fontSize: 16,
                marginLeft: 37,
              }}
            >
              Luxury 💎
            </Text>
          </View>
        </ScrollView>
        <UnderButton
          onPress={() => router.push("/(person)/ListPage")}
          text="Build My Itinerary"
        />
      </SafeAreaView>
    </>
  );
}

export default SummaryPage;
