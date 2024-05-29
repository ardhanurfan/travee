import PersonTile from "@/components/PersonTile";
import UnderButton from "@/components/UnderButton";
import Colors from "@/constants/Colors";
import { User } from "@/constants/Types";
import { GetTripById, RemovePeople } from "@/services/TripService";
import { router, useLocalSearchParams } from "expo-router";
import { FlatList } from "react-native";
import { Appbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

function ListPage() {
  const { id } = useLocalSearchParams();
  const { trip } = GetTripById(id as string);

  const handleRemovePeople = async (user: User) => {
    try {
      await RemovePeople({ userId: user.id, tripId: id as string });
      Toast.show({
        type: "error",
        text1: "Remove People from Trip Successful",
        text2: `${user.fullname} removed from ${trip?.destination.name} trip!`,
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Remove People from Trip Failed",
        text2: error as string,
      });
    }
  };

  return (
    <>
      <Appbar.Header style={{ backgroundColor: Colors.white }}>
        <Appbar.BackAction onPress={() => router.back()}></Appbar.BackAction>
        <Appbar.Content
          title="Person"
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
        <FlatList
          style={{ paddingHorizontal: 20 }}
          showsHorizontalScrollIndicator={false}
          data={trip?.members}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PersonTile
              name={item.fullname}
              role={item.id == trip?.owner.id ? "Owner" : "Member"}
              imageUrl={item.photo_url!}
              onPress={() => handleRemovePeople(item)}
            />
          )}
        ></FlatList>
        <UnderButton
          onPress={() =>
            router.push({ pathname: "/(person)/AddPage", params: { id: id } })
          }
          text={"Add Person"}
        />
      </SafeAreaView>
    </>
  );
}

export default ListPage;
