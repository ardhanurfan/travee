import Colors from "@/constants/Colors";
import { View, Text } from "react-native";

function PreferenceContent({
  text,
  isSelected,
}: {
  text: String;
  isSelected: boolean;
}) {
  return (
    <View
      style={{
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: isSelected ? Colors.primary : Colors.gray,
        borderRadius: 24,
        paddingHorizontal: 20,
        paddingVertical: 10   ,
        width: "auto",
        // margin: 4
      }}
    >
      <Text
        style={{
          fontFamily: "Figtree_400Regular",
          fontSize: 14,
          textAlign: "justify",
          color: isSelected ? Colors.primary : Colors.black,
        }}
      >
        {text}
      </Text>
    </View>
  );
}

export default PreferenceContent;
