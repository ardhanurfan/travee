import PreferenceContent from "@/components/PreferenceContent";
import UnderButton from "@/components/UnderButton";
import { auth } from "@/config/firebase";
import Colors from "@/constants/Colors";
import { usePersonalize } from "@/context/PersonalizeContext";
import { GetEvents } from "@/services/DestinationService";
import { useAddTrip } from "@/services/TripService";
import { useRouter } from "expo-router";
import { ScrollView, View, Image } from "react-native";
import { Appbar, Icon, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

function SummaryPage() {
  const router = useRouter();
  const {
    count_people,
    start_date,
    end_date,
    preferences,
    budget,
    name,
    country,
    photo_url,
    destination,
    clear
  } = usePersonalize();
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString();
  };
  const { addTrip, loading, error } = useAddTrip();
  const { events } = GetEvents({ destinationId: destination });

  const handleAddTrip = async () => {
    // Add trip and events to Firestore
    await addTrip({
      budget: budget,
      count_people: count_people,
      destination: destination,
      start_date: start_date,
      end_date: end_date,
      members: [auth.currentUser ? auth.currentUser.uid : ""],
      owners: auth.currentUser?.uid,
      preferences: preferences,
      events: events.map((event) => ({
        event: event,
        time_finish: start_date,
        time_start: start_date,
      })),
    });
    for (let i = 0; i < 6; i++) {
      router.back();
    }
    clear()
    // Redirect to ListPage after adding trip
    router.replace("/(main)/MyTripsPage");
  };

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
                source={{ uri: photo_url }}
                style={{ width: 128, height: 96, borderRadius: 16 }}
              />
              <View>
                <Text
                  style={{ fontFamily: "Figtree_600SemiBold", fontSize: 16 }}
                >
                  {name}
                </Text>
                <Text
                  style={{ fontFamily: "Figtree_400Regular", fontSize: 16 }}
                >
                  {country}
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
              {count_people}
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
              {formatDate(start_date)} - {formatDate(end_date)}
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
              {preferences.map((preference, index) => (
                <PreferenceContent
                  text={preference}
                  isSelected={preferences.includes(preference)}
                />
              ))}
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
              {budget}
            </Text>
          </View>
        </ScrollView>
        <UnderButton
          onPress={() => handleAddTrip()}
          text="Build My Itinerary"
        />
      </SafeAreaView>
    </>
  );
}

export default SummaryPage;
