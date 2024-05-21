import EmptyContent from "@/components/EmptyContent";
import DestinationCard from "@/components/DestinationCard";
import Colors from "@/constants/Colors";
import { FlatList } from "react-native";
import { Appbar } from "react-native-paper";
import { GetSaved } from "@/services/BookmarkService";

export default function SavedPage() {
  const { savedDestinations } = GetSaved();

  return (
    <>
      <Appbar.Header style={{ backgroundColor: Colors.white }}>
        <Appbar.Content
          title="Saved"
          titleStyle={{ fontFamily: "Figtree_700Bold" }}
        />
        <Appbar.Action icon="magnify" />
      </Appbar.Header>
      {savedDestinations.length === 0 ? (
        <EmptyContent
          icon={"folder-open-outline"}
          caption={
            "Start building your travel wishlist by saving inspiring destinations and experiences."
          }
        />
      ) : (
        <FlatList
          style={{ backgroundColor: Colors.white, paddingHorizontal: 20 }}
          showsVerticalScrollIndicator={false}
          data={savedDestinations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <DestinationCard
              detail
              destination={item}
              isBookmarked={
                savedDestinations.find((d) => d.id === item.id) ? true : false
              }
            />
          )}
        ></FlatList>
      )}
    </>
  );
}
