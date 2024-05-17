import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Dimensions, View, Text, Image } from "react-native";
import { Button } from "react-native-paper";

function PersonalizingFinishedPage() {
  const router = useRouter();
  let ScreenHeight = Dimensions.get("window").height;

  return (
    <>
      <View
        style={{
          backgroundColor: Colors.white,
          height: ScreenHeight,
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button
          mode="contained"
          onPress={() => router.push("/PersonalizingSecondPage")}
          style={{
            opacity: 0,
            backgroundColor: "#5850FE",
            borderRadius: 28,
            // width: "100%",
            // height: "auto",
            paddingVertical: 6,
            // flex: 1,
            // justifyContent: "center",
            // alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Figtree_600SemiBold",
              color: Colors.white,
              fontSize: 16,
            }}
          >
            Continue
          </Text>
        </Button>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 48,
          }}
        >
          <Image
            source={require("../assets/images/logo.png")}
            style={{ width: 200, height: 200 }}
          />
          <Text
            style={{
              fontFamily: "Figtree_700Bold",
              fontSize: 28,
              marginTop: 8,
            }}
          >
            You’re all set!
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
            Congratulations! You’re now part of the Travee community, Your
            personalized travel experiences await!
          </Text>
        </View>
        <View
          style={{
            paddingVertical: 16,
            paddingHorizontal: 20,
            borderTopColor: "#848484",
            // borderTopWidth: 0.5,
            width: "100%",
          }}
        >
          <Button
            mode="contained"
            onPress={() => router.push("/PersonalizingSecondPage")}
            style={{
              backgroundColor: "#5850FE",
              borderRadius: 28,
              // width: "100%",
              // height: "auto",
              paddingVertical: 6,
              // flex: 1,
              // justifyContent: "center",
              // alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Figtree_600SemiBold",
                color: Colors.white,
                fontSize: 16,
              }}
            >
              Explore Destination
            </Text>
          </Button>
        </View>
      </View>
    </>
  );
}

export default PersonalizingFinishedPage;
