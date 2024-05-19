import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Appbar, Icon, TextInput } from "react-native-paper";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import UnderButton from "@/components/UnderButton";

function ThirdPage() {
  const [image, setImage] = useState<any | null>(null);
  const router = useRouter();
  let ScreenHeight = Dimensions.get("window").height;
  const handleImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <>
      <Appbar.Header style={{ backgroundColor: Colors.white }}>
        <Appbar.BackAction onPress={() => router.back()}></Appbar.BackAction>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              width: 160,
              height: 16,
              backgroundColor: "#D9D9D9",
              borderRadius: 21,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 21,
                backgroundColor: "#5850FE",
              }}
            ></View>
          </View>
        </View>
        <Appbar.BackAction style={{ display: "none" }}></Appbar.BackAction>
      </Appbar.Header>

      <SafeAreaView
        edges={["bottom"]}
        style={{ flex: 1, backgroundColor: Colors.white }}
      >
        <ScrollView
          style={{
            flex: 1,
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "Figtree_700Bold",
              fontSize: 28,
            }}
          >
            Add a personal touch 👤
          </Text>
          <Text
            style={{
              fontFamily: "Figtree_400Regular",
              fontSize: 16,
              marginTop: 20,
              color: "#848484",
              textAlign: "justify",
            }}
          >
            To enhance your travel journey, we'd love to know more about you.
          </Text>

          <View style={{ alignItems: "center" }}>
            <TouchableOpacity style={{ marginTop: 32 }} onPress={handleImage}>
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={{ width: 136, height: 136, borderRadius: 96 }}
                />
              ) : (
                <Icon
                  source="account-circle-outline"
                  size={136}
                  color="#DADADA"
                ></Icon>
              )}
              <View
                style={{
                  position: "absolute",
                  bottom: image ? 0 : 8,
                  right: 12,
                }}
              >
                <Icon
                  source="pencil-circle"
                  size={32}
                  color={Colors.primary}
                ></Icon>
              </View>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontFamily: "Figtree_600SemiBold",
              fontSize: 18,
              marginTop: 24,
              marginLeft: 5,
            }}
          >
            Full Name
          </Text>
          <TextInput
            mode="flat"
            placeholder="Full Name"
            underlineStyle={{ display: "none" }}
            left={<TextInput.Icon icon="account" color={Colors.gray} />}
            cursorColor={Colors.primary}
            placeholderTextColor={Colors.gray}
            style={{
              backgroundColor: Colors.lightGray,
              borderTopRightRadius: 12,
              borderTopLeftRadius: 12,
              borderBottomLeftRadius: 12,
              borderBottomRightRadius: 12,
              marginTop: 10,
              width: "100%",
            }}
          />
          <Text
            style={{
              fontFamily: "Figtree_600SemiBold",
              fontSize: 18,
              marginTop: 16,
              marginLeft: 5,
            }}
          >
            Email
          </Text>
          <TextInput
            mode="flat"
            placeholder="Email"
            underlineStyle={{ display: "none" }}
            left={<TextInput.Icon icon="email-outline" color={Colors.gray} />}
            cursorColor={Colors.primary}
            placeholderTextColor={Colors.gray}
            style={{
              backgroundColor: Colors.lightGray,
              borderTopRightRadius: 12,
              borderTopLeftRadius: 12,
              borderBottomLeftRadius: 12,
              borderBottomRightRadius: 12,
              marginTop: 10,
              width: "100%",
            }}
          />
          <Text
            style={{
              fontFamily: "Figtree_600SemiBold",
              fontSize: 18,
              marginTop: 16,
              marginLeft: 5,
            }}
          >
            Phone Number
          </Text>
          <TextInput
            mode="flat"
            placeholder="Phone Number"
            underlineStyle={{ display: "none" }}
            left={<TextInput.Icon icon="phone-outline" color={Colors.gray} />}
            cursorColor={Colors.primary}
            placeholderTextColor={Colors.gray}
            style={{
              backgroundColor: Colors.lightGray,
              borderTopRightRadius: 12,
              borderTopLeftRadius: 12,
              borderBottomLeftRadius: 12,
              borderBottomRightRadius: 12,
              marginTop: 10,
              width: "100%",
            }}
          />
        </ScrollView>

        <UnderButton
          onPress={() => router.push("/(personalize)/FinishedPage")}
          text="Continue"
        />
      </SafeAreaView>
    </>
  );
}

export default ThirdPage;
