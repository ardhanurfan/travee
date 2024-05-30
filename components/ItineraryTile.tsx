import Colors from "@/constants/Colors";
import { View, Image, TouchableOpacity } from "react-native";
import { Icon, Text } from "react-native-paper";

export function ItineraryTile({
  name,
  type,
  imageUrl,
  add,
  onPress,
  iconPressed,
}: {
  name: string;
  type: string;
  imageUrl: string;
  add?: boolean;
  onPress?: () => void;
  iconPressed?: boolean;
}) {
  return (
    <View
      style={{
        paddingVertical: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        <Image
          source={{ uri: imageUrl }}
          style={{
            width: 120,
            height: 72,
            borderRadius: 12,
            objectFit: "cover",
          }}
        />
        <View style={{ flex: 1, marginLeft: 16 }}>
          <Text
            style={{ fontFamily: "Figtree_600SemiBold", fontSize: 16 }}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {name}
          </Text>
          <Text
            style={{
              fontFamily: "Figtree_400Regular",
              fontSize: 12,
              color: Colors.gray,
              marginTop: 2,
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {type}
          </Text>
        </View>
      </View>
      {add ? (
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
            />
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onPress}>
          <Icon source="trash-can-outline" size={28} color={Colors.orange} />
        </TouchableOpacity>
      )}
    </View>
  );
}

export default ItineraryTile;
