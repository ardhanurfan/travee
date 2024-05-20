import PopularCard from "@/components/DestinationCard";
import Colors from "@/constants/Colors";
import { GetDestinations } from "@/services/DestinationService";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList } from "react-native";
import { Appbar } from "react-native-paper";

function PopularDestinationPage() {
  const router = useRouter();
  const { destinations } = GetDestinations();

  return (
    <>
      <Appbar.Header style={{ backgroundColor: Colors.white }}>
        <Appbar.BackAction onPress={() => router.back()}></Appbar.BackAction>
        <Appbar.Content
          title="Popular Destinations"
          titleStyle={{ fontFamily: "Figtree_700Bold" }}
        />
        <Appbar.Action icon="magnify" />
      </Appbar.Header>
      <FlatList
        style={{ backgroundColor: Colors.white, paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
        data={destinations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PopularCard detail destination={item} />}
      ></FlatList>
    </>
  );
}

export default PopularDestinationPage;
