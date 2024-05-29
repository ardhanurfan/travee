import PersonTile from "@/components/PersonTile";
import UnderButton from "@/components/UnderButton";
import Colors from "@/constants/Colors";
import { User } from "@/constants/Types";
import { GetAllUsers } from "@/services/AuthService";
import { AddPeople, GetTripById } from "@/services/TripService";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, View } from "react-native";
import { Appbar, TextInput, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

function AddPage() {
  const { id } = useLocalSearchParams();
  const { trip } = GetTripById(id as string);
  const { users } = GetAllUsers();
  const [addedUsers, setAddedUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddPeople = async () => {
    try {
      await AddPeople({ users: addedUsers, tripId: id as string });
      setLoading(true);
      Toast.show({
        type: "success",
        text1: "Add People to Trip Successful",
        text2: `Enjoy go to ${trip?.destination.name}!`,
      });
      router.back();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Add People to Trip Failed",
        text2: error as string,
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePress = (user: User) => {
    setAddedUsers((prevAddedUsers) =>
      prevAddedUsers.find((userAdded) => userAdded.id === user.id)
        ? prevAddedUsers.filter((userAdded) => userAdded.id !== user.id)
        : [...prevAddedUsers, user]
    );
  };

  const filtered = useMemo(() => {
    return users
      .filter((user) => !trip?.members.find((member) => member.id === user.id))
      .filter((user) =>
        user.fullname.toLowerCase().includes(search.toLowerCase())
      );
  }, [users, trip, search]);

  return (
    <>
      <Appbar.Header style={{ backgroundColor: Colors.white }}>
        <Appbar.BackAction onPress={() => router.back()}></Appbar.BackAction>
        <Appbar.Content
          title="Add Person"
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
            placeholder="Search Name..."
            underlineStyle={{ display: "none" }}
            left={<TextInput.Icon icon="magnify" color={Colors.gray} />}
            cursorColor={Colors.primary}
            placeholderTextColor={Colors.gray}
            value={search}
            onChangeText={setSearch}
            style={{
              backgroundColor: Colors.lightGray,
              borderTopRightRadius: 12,
              borderTopLeftRadius: 12,
              borderBottomLeftRadius: 12,
              borderBottomRightRadius: 12,
              marginTop: 12,
            }}
          />
          <Text
            style={{
              fontFamily: "Figtree_600SemiBold",
              fontSize: 16,
              marginTop: 16,
              marginBottom: 4,
            }}
          >
            Suggestions
          </Text>
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          style={{ paddingHorizontal: 20 }}
          data={filtered}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PersonTile
              add
              name={item.fullname}
              imageUrl={item.photo_url!}
              onPress={() => handlePress(item)}
              iconPressed={
                addedUsers.find((member) => member.id == item.id) ? true : false
              }
            />
          )}
        ></FlatList>
        <UnderButton
          onPress={handleAddPeople}
          loading={loading}
          text={"Add Person"}
        />
      </SafeAreaView>
    </>
  );
}

export default AddPage;
