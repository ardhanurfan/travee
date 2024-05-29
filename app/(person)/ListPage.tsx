import PersonTile from "@/components/PersonTile";
import UnderButton from "@/components/UnderButton";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { FlatList, ScrollView } from "react-native";
import { Appbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

function ListPage() {
  const router = useRouter();

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
          data={[
            {
              id: 1,
              name: "Salsabila Ayuni",
              role: "Trip Owner",
              imageUrl: "../assets/person.png",
              add: false,
            },
            {
              id: 2,
              name: "Nalendra Qiandri",
              role: "Editor",
              imageUrl: "../assets/person.png",
              add: false,
            },
          ]}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PersonTile
              name={item.name}
              role={item.role}
              imageUrl={item.imageUrl}
              add={item.add}
            />
          )}
        ></FlatList>
        <UnderButton
          onPress={() => router.push("/(person)/AddPage")}
          text={"Add Person"}
        />
      </SafeAreaView>
    </>
  );
}

export default ListPage;
