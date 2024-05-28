import UnderButton from "@/components/UnderButton";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  TextInput as RNTextInput,
} from "react-native";
import { Appbar, Button, Icon, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

function AddPage() {
  const router = useRouter();
  const [isEditable, setIsEditable] = useState(false);
  const textInputRef = useRef<RNTextInput>(null);

  const handleIconPress = () => {
    setIsEditable(true);
    textInputRef.current?.focus();
  };

  return (
    <>
      <Appbar.Header style={{ backgroundColor: Colors.white }}>
        <Appbar.BackAction onPress={() => router.back()}></Appbar.BackAction>
        <Appbar.Content
          title="Add Bill"
          titleStyle={{ fontFamily: "Figtree_700Bold", textAlign: "center" }}
        />
        <Appbar.BackAction style={{ opacity: 0 }}></Appbar.BackAction>
      </Appbar.Header>
      <SafeAreaView
        edges={["bottom"]}
        style={{
          flex: 1,
          backgroundColor: Colors.white,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 20 }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 16,
            }}
          >
            <Text
              style={{
                fontFamily: "Figtree_600SemiBold",
                fontSize: 20,
              }}
            >
              Bill Title
            </Text>
            <TouchableOpacity onPress={handleIconPress}>
              <Icon source="pencil-outline" size={20} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          <TextInput
            ref={textInputRef}
            mode="flat"
            placeholder="Type Here"
            underlineStyle={{ display: "none" }}
            cursorColor={Colors.primary}
            placeholderTextColor={Colors.gray}
            editable={isEditable}
            style={{
              backgroundColor: Colors.white,
              marginTop: 4,
              marginLeft: 0,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Figtree_600SemiBold",
                fontSize: 20,
              }}
            >
              Receipt
            </Text>
            <Button
              mode="contained"
              style={{
                backgroundColor: Colors.secondary,
                borderRadius: 28,
                paddingHorizontal: 20,
              }}
              onPress={console.log}
            >
              <Text
                style={{
                  fontFamily: "Figtree_400Regular",
                  fontSize: 16,
                  color: Colors.primary,
                  //   paddingVertical: 4
                }}
              >
                Upload
              </Text>
            </Button>
          </View>
        </ScrollView>
        <UnderButton
          onPress={() => router.push("/(splitBill)/ListPage")}
          text="Save Bill"
        />
      </SafeAreaView>
    </>
  );
}

export default AddPage;
