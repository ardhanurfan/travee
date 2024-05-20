import DestinationCard from "@/components/DestinationCard";
import MyTripCard from "@/components/MyTripCard";
import { auth } from "@/config/firebase";
import Colors from "@/constants/Colors";
import { GetDestinations } from "@/services/DestinationService";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Avatar, Icon, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomePage() {
  const router = useRouter();
  const { destinations } = GetDestinations();

  const logout = async () => {
    await auth.signOut();
    router.replace("/(onboarding)/FirstPage");
  };

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: Colors.white, paddingHorizontal: 20 }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: 80,
        }}
      >
        <Image
          source={require("../../assets/images/logo.png")}
          style={{ width: 60, height: 60 }}
        />
        <Text style={{ fontFamily: "Figtree_700Bold", fontSize: 28 }}>
          Travee
        </Text>

        <View style={{ position: "relative" }}>
          <TouchableOpacity onPress={logout}>
            <Avatar.Image
              size={60}
              source={require("../../assets/profile.png")}
              style={{ backgroundColor: Colors.primary }}
            />
          </TouchableOpacity>
          <View
            style={{
              position: "absolute",
              bottom: -4,
              transform: [{ translateX: 20 }],
              backgroundColor: Colors.primary,
              paddingHorizontal: 4,
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                fontFamily: "Figtree_700Bold",
                color: Colors.white,
                fontSize: 10,
              }}
            >
              VIP
            </Text>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search */}
        <TextInput
          mode="flat"
          placeholder="Search Destination..."
          underlineStyle={{ display: "none" }}
          left={<TextInput.Icon icon="magnify" color={Colors.gray} />}
          cursorColor={Colors.primary}
          placeholderTextColor={Colors.gray}
          style={{
            backgroundColor: Colors.lightGray,
            borderTopRightRadius: 12,
            borderTopLeftRadius: 12,
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
            marginTop: 24,
          }}
        />

        {/* Popular */}
        <View style={{ marginTop: 24, marginBottom: 16 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontFamily: "Figtree_700Bold", fontSize: 20 }}>
              Popular Destinations
            </Text>
            <Pressable onPress={() => router.push("/PopularDestinationPage")}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
              >
                <Text
                  style={{ color: Colors.gray, fontFamily: "Figtree_300Light" }}
                >
                  See All
                </Text>
                <Icon source="arrow-right" size={16} color={Colors.gray}></Icon>
              </View>
            </Pressable>
          </View>
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={destinations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <DestinationCard destination={item} />}
        ></FlatList>

        {/* Upcoming */}
        <View style={{ marginTop: 36, marginBottom: 16 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontFamily: "Figtree_700Bold", fontSize: 20 }}>
              Upcoming Trips
            </Text>
            <Pressable onPress={() => router.push("/MyTripsPage")}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
              >
                <Text
                  style={{ color: Colors.gray, fontFamily: "Figtree_300Light" }}
                >
                  See All
                </Text>
                <Icon source="arrow-right" size={16} color={Colors.gray}></Icon>
              </View>
            </Pressable>
          </View>
        </View>
        <FlatList
          scrollEnabled={false}
          data={[
            {
              id: 1,
              title: "Jogjakarta, Central Java",
              fasility: "Jan 12 - Jan 14, 2025 | A Couple | Luxury",
              image: require("../../assets/destination.png"),
            },
            {
              id: 2,
              title: "Jogjakarta, Central Java",
              fasility: "Jan 12 - Jan 14, 2025 | A Couple | Luxury",
              image: require("../../assets/destination.png"),
            },
          ]}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MyTripCard trip={item} />}
        ></FlatList>
      </ScrollView>
    </SafeAreaView>
  );
}
