import ItineraryTile from "@/components/ItineraryTile";
import PersonTile from "@/components/PersonTile";
import UnderButton from "@/components/UnderButton";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, ScrollView, View } from "react-native";
import { Appbar, TextInput, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

function AddPage() {
  const router = useRouter();
  const [pressedIds, setPressedIds] = useState<number[]>([]);

  const handlePress = (id: number) => {
    setPressedIds((prevPressedIds: any) =>
      prevPressedIds.includes(id)
        ? prevPressedIds.filter((pressedId: number) => pressedId !== id)
        : [...prevPressedIds, id]
    );
  };
  return (
    <>
      <Appbar.Header style={{ backgroundColor: Colors.white }}>
        <Appbar.BackAction onPress={() => router.back()}></Appbar.BackAction>
        <Appbar.Content
          title="Add Event"
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
        <View style={{ paddingHorizontal: 20 }}>
          <TextInput
            mode="flat"
            placeholder="Search Places..."
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
              marginTop: 12,
              marginBottom: 4,
            }}
          />
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          style={{ paddingHorizontal: 20 }}
          data={[
            {
              id: 1,
              name: "Ocean Grill 1",
              type: "Restaurant",
              imageUrl: "../assets/itinerary.png",
            },
            {
              id: 2,
              name: "Ocean Grill 3",
              type: "Restaurant",
              imageUrl: "../assets/itinerary.png",
            },
            {
              id: 3,
              name: "Ocean Grill 2",
              type: "Restaurant",
              imageUrl: "../assets/itinerary.png",
            },
          ]}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ItineraryTile
              name={item.name}
              type={item.type}
              imageUrl={item.imageUrl}
              add
            />
          )}
        ></FlatList>
        <UnderButton onPress={() => {}} text={"Save"} />
      </SafeAreaView>
    </>
  );
}

export default AddPage;
