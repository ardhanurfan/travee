import Colors from "@/constants/Colors";
import { View, Image } from "react-native";
import { Icon, Text } from "react-native-paper";

function PersonTile({
  name,
  role,
  imageUrl,
  add,
}: {
  name: string;
  role: string;
  imageUrl: string;
  add: boolean;
}) {
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: "#D1D5DA",
        paddingVertical: 12,
        flexDirection: "row",
        justifyContent: role == "Trip Owner" ? "flex-start" : "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
        <Image
          source={require("../assets/person.png")}
          style={{ width: 72, height: 72, borderRadius: 64 }}
        />
        <View>
          <Text style={{ fontFamily: "Figtree_600SemiBold", fontSize: 18 }}>
            {name}
          </Text>
          <Text
            style={{
              fontFamily: "Figtree_400Regular",
              fontSize: 12,
              color: Colors.gray,
              marginTop: 2,
              display: add ? "none" : "flex",
            }}
          >
            {role}
          </Text>
        </View>
      </View>
      {role == "Trip Owner" ? (
        ""
      ) : add ? (
        <View
          style={{
            padding: 4,
            backgroundColor: Colors.secondary,
            borderRadius: 64,
          }}
        >
          <Icon source="plus" size={24} color={Colors.primary}></Icon>
        </View>
      ) : (
        <Icon source="trash-can-outline" size={28} color={Colors.orange}></Icon>
      )}
    </View>
  );
}

export default PersonTile;
