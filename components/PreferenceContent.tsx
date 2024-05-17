import Colors from "@/constants/Colors";
import { View, Text } from "react-native";

function PreferenceContent({text}: {text: String}) {
  return (
    <View
      style={{
        backgroundColor: Colors.white,
        borderWidth: 0.5,
        borderColor: Colors.gray,
        borderRadius: 24,
        paddingHorizontal: 20,
        paddingVertical: 12,
        width: "auto",
        // margin: 4
      }}
    >
      <Text
        style={{
          fontFamily: "Figtree_400Regular",
          fontSize: 14,
          textAlign: "justify",
          color: Colors.black,
        }}
      >
        {text}
      </Text>
    </View>
  );
}

export default PreferenceContent;
