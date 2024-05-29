import UnderButton from "@/components/UnderButton";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { FlatList, ScrollView, View } from "react-native";
import { Appbar, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

function ListPage() {
  const router = useRouter();
  return (
    <>
      <Appbar.Header style={{ backgroundColor: Colors.white }}>
        <Appbar.BackAction onPress={() => router.back()}></Appbar.BackAction>
        <Appbar.Content
          title="Split Bill"
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
          showsHorizontalScrollIndicator={false}
          style={{ paddingHorizontal: 20 }}
          data={[
            {
              id: 1,
              title: "Hotel Fees",
              price: "$200",
            },
            {
              id: 2,
              title: "Airplane Fees",
              price: "$1200",
            },
          ]}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#D1D5DA",
                paddingVertical: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontFamily: "Figtree_600SemiBold", fontSize: 18 }}>
                {item.title}
              </Text>
              <Text
                style={{
                  fontFamily: "Figtree_400Regular",
                  fontSize: 16,
                  color: Colors.gray,
                }}
              >
                {item.price}
              </Text>
            </View>
          )}
        ></FlatList>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontFamily: "Figtree_400Regular",
                fontSize: 20,
              }}
            >
              Total
            </Text>
            <Text
              style={{
                fontFamily: "Figtree_600SemiBold",
                fontSize: 20,
              }}
            >
              {" "}
              USD 1400
            </Text>
          </View>
        </View>
        <UnderButton
          onPress={() => router.push("/(splitBill)/AddPage")}
          text="Add Bill"
        />
      </SafeAreaView>
    </>
  );
}

export default ListPage;
