import Colors from "@/constants/Colors";
import { router } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Appbar, Icon, TextInput } from "react-native-paper";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import UnderButton from "@/components/UnderButton";
import Toast from "react-native-toast-message";
import { auth } from "@/config/firebase";
import { usePreferences } from "@/context/PreferencesContext";
import { AddPersonalizeUser } from "@/services/AuthService";

function ThirdPage() {
  const [image, setImage] = useState<string | null>(null);
  const [fullname, setFullname] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const { preferences } = usePreferences();
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await AddPersonalizeUser({
        fullname: fullname,
        phone_number: phone_number,
        email: auth.currentUser?.email!,
        image: image,
        preferences: preferences,
      });

      Toast.show({
        type: "success",
        text1: "Save User Profile Successful",
        text2: `Let's get started!`,
      });
      router.replace("/(personalize)/FinishedPage");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Save User Profile Failed",
        text2: error as string,
      });
    }
    setLoading(false);
  };

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
        <Appbar.BackAction
          onPress={() => router.replace("/(personalize)/SecondPage")}
        ></Appbar.BackAction>
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

      <KeyboardAvoidingView behavior={"height"} style={{ flex: 1 }}>
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
              value={fullname}
              onChangeText={(text) => setFullname(text)}
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
              disabled
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
              value={auth.currentUser?.email!}
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
                marginVertical: 10,
                width: "100%",
              }}
              value={phone_number}
              onChangeText={(text) => setPhone_number(text)}
            />
          </ScrollView>
          <UnderButton loading={loading} onPress={handleSave} text="Save" />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
}

export default ThirdPage;
