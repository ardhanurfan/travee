import PersonTile from "@/components/PersonTile";
import UnderButton from "@/components/UnderButton";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, ScrollView } from "react-native";
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 20 }}
        >
          <TextInput
            mode="flat"
            placeholder="Search Name..."
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
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={[
              {
                id: 1,
                name: "Salsabila Ayuni",
                role: "",
                imageUrl: "../assets/person.png",
                add: true,
              },
              {
                id: 2,
                name: "Nalendra Qiandri",
                role: "Editor",
                imageUrl: "../assets/person.png",
                add: true,
              },
            ]}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <PersonTile
                name={item.name}
                role={item.role}
                imageUrl={item.imageUrl}
                add={item.add}
                onPress={() => handlePress(item.id)}
                iconPressed={pressedIds.includes(item.id)}
              />
            )}
          ></FlatList>
        </ScrollView>
        <UnderButton
          onPress={() => router.push("/(splitBill)/ListPage")}
          text={"Add Person"}
        />
      </SafeAreaView>
    </>
  );
}

export default AddPage;
