import UnderButton from "@/components/UnderButton";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function FinishedPage() {
  const router = useRouter();

  return (
    <>
      <SafeAreaView
        style={{
          backgroundColor: Colors.white,
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 48,
            flex: 1,
          }}
        >
          <Image
            source={require("../../assets/images/logo.png")}
            style={{ width: 200, height: 200 }}
          />
          <Text
            style={{
              fontFamily: "Figtree_700Bold",
              fontSize: 28,
              marginTop: 8,
            }}
          >
            You're all set!
          </Text>
          <Text
            style={{
              fontFamily: "Figtree_400Regular",
              fontSize: 16,
              color: "#848484",
              textAlign: "center",
              marginTop: 20,
            }}
          >
            Congratulations! You're now part of the Travee community, Your
            personalized travel experiences await!
          </Text>
        </View>

        <UnderButton
          onPress={() => router.navigate("/")}
          text="Explore Destinations"
        />
      </SafeAreaView>
    </>
  );
}

export default FinishedPage;
