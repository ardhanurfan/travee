import Colors from "@/constants/Colors";
import { View, Image, TouchableOpacity } from "react-native";
import { Icon, Text } from "react-native-paper";

function PersonTile({
  name,
  role,
  imageUrl,
  add,
  onPress,
  iconPressed,
}: {
  name: string;
  role?: string;
  imageUrl: string;
  add?: boolean;
  onPress?: () => void;
  iconPressed?: boolean;
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
          source={{ uri: imageUrl }}
          style={{
            width: 72,
            height: 72,
            borderRadius: 64,
            objectFit: "cover",
          }}
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
      {role == "Owner" ? (
        ""
      ) : add ? (
        <TouchableOpacity onPress={onPress}>
          <View
            style={{
              padding: 4,
              backgroundColor: iconPressed ? Colors.primary : Colors.secondary,
              borderRadius: 64,
            }}
          >
            <Icon
              source="plus"
              size={24}
              color={iconPressed ? Colors.white : Colors.primary}
            ></Icon>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onPress}>
          <Icon
            source="trash-can-outline"
            size={28}
            color={Colors.orange}
          ></Icon>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default PersonTile;
