import React from "react";
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import UnderButton from "@/components/UnderButton";
import Colors from "@/constants/Colors";
import { LoginServices } from "@/services/AuthService";
import Toast from "react-native-toast-message";

const LoginPage = () => {
  const [isObscure, setObscure] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function login() {
    setLoading(true);
    try {
      await LoginServices({ email, password });
      router.replace("/(main)/HomePage");
      Toast.show({
        type: "success",
        text1: "Login Successful",
        text2: `Welcome back to Travee!`,
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: error as string,
      });
    }
    setLoading(false);
  }

  return (
    <SafeAreaView
      edges={["bottom", "top"]}
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}
    >
      <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, paddingHorizontal: 20 }}
        >
          <Image
            source={require("../../assets/images/logo.png")}
            style={{
              width: 120,
              height: 120,
              marginTop: 60,
              objectFit: "contain",
              alignSelf: "center",
            }}
          />
          <Text
            style={{
              fontFamily: "Figtree_700Bold",
              fontSize: 24,
              marginTop: 24,
              textAlign: "center",
            }}
          >
            Let's Get Started!
          </Text>
          <Text
            style={{
              fontFamily: "Figtree_400Regular",
              fontSize: 16,
              marginVertical: 12,
              color: Colors.gray,
              textAlign: "center",
            }}
          >
            Your passport to new trips awaits!
          </Text>
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
            value={email}
            onChangeText={(text) => setEmail(text)}
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
            Password
          </Text>
          <TextInput
            mode="flat"
            placeholder="Password"
            underlineStyle={{ display: "none" }}
            left={<TextInput.Icon icon="lock-outline" color={Colors.gray} />}
            right={
              isObscure ? (
                <TextInput.Icon
                  onPress={() => setObscure(false)}
                  icon="eye-off-outline"
                  color={Colors.gray}
                />
              ) : (
                <TextInput.Icon
                  onPress={() => setObscure(true)}
                  icon="eye-outline"
                  color={Colors.gray}
                />
              )
            }
            cursorColor={Colors.primary}
            placeholderTextColor={Colors.gray}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={isObscure}
            style={{
              backgroundColor: Colors.lightGray,
              borderTopRightRadius: 12,
              borderTopLeftRadius: 12,
              borderBottomLeftRadius: 12,
              borderBottomRightRadius: 12,
              marginVertical: 10,
              width: "100%",
            }}
          />
        </ScrollView>
        <UnderButton loading={loading} text="Login" onPress={login} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 12,
            gap: 4,
          }}
        >
          <Text
            style={{
              fontFamily: "Figtree_400Regular",
              fontSize: 14,
            }}
          >
            Don't have an account?
          </Text>
          <TouchableOpacity
            onPress={() => router.replace("/(auth)/RegisterPage")}
          >
            <Text
              style={{
                fontFamily: "Figtree_600SemiBold",
                fontSize: 14,
                color: Colors.primary,
              }}
            >
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginPage;
