import PopularCard from "@/components/PopularCard";
import Colors from "@/constants/Colors";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, ScrollView } from "react-native";
import { Appbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

function PopularDestinationPage() {
  const router = useRouter();

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
        data={[
          {
            id: 1,
            title: "Jogjakarta, Central Java",
            country: "Indonesia",
            image: "../../assets/destination.png",
          },
          {
            id: 2,
            title: "Jogjakarta, Central Java",
            country: "Indonesia",
            image: "../../assets/destination.png",
          },
        ]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PopularCard detail destination={item} />}
      ></FlatList>
    </>
  );
}

export default PopularDestinationPage;
