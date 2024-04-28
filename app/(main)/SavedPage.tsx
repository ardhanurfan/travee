import EmptyContent from "@/components/EmptyContent";
import DestinationCard from "@/components/DestinationCard";
import Colors from "@/constants/Colors";
import { FlatList } from "react-native";
import { Appbar } from "react-native-paper";

export default function SavedPage() {
  return (
    <>
      <Appbar.Header style={{ backgroundColor: Colors.white }}>
        <Appbar.Content
          title="Saved"
          titleStyle={{ fontFamily: "Figtree_700Bold" }}
        />
        <Appbar.Action icon="magnify" />
      </Appbar.Header>
      {/* <EmptyContent
        icon={"folder-open-outline"}
        caption={
          "Start building your travel wishlist by saving inspiring destinations and experiences."
        }
      /> */}
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
        renderItem={({ item }) => <DestinationCard detail destination={item} />}
      ></FlatList>
    </>
  );
}
