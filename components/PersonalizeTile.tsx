import Colors from "@/constants/Colors";
import { Text, TouchableOpacity } from "react-native";

function PersonalizeTile({
  title,
  desc,
  onClick,
  selected,
}: {
  title: string;
  desc: string;
  onClick: () => void;
  selected: boolean;
}) {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        width: "100%",
        paddingHorizontal: 18,
        paddingVertical: 13,
        display: "flex",
        alignItems: "flex-start",
        gap: 2,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: selected ? Colors.primary : Colors.gray,
        marginTop: 20,
      }}
    >
      <Text style={{ fontFamily: "Figtree_700Bold", fontSize: 16 }}>
        {title}
      </Text>
      <Text
        style={{
          fontFamily: "Figtree_400Regular",
          fontSize: 12,
          color: Colors.gray,
        }}
      >
        {desc}
      </Text>
    </TouchableOpacity>
  );
}

export default PersonalizeTile;
