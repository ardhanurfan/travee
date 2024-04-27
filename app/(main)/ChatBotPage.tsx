import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { FlatList, KeyboardAvoidingView, View } from "react-native";
import { Appbar, Avatar, Icon, Text, TextInput } from "react-native-paper";

export default function ChatBotPage() {
  return (
    <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: Colors.white }}>
        <Appbar.Content
          title="Ask Travee Anything"
          titleStyle={{ fontFamily: "Figtree_700Bold" }}
        />
      </Appbar.Header>
      <FlatList
        style={{ backgroundColor: Colors.white, paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
        data={[
          {
            id: 1,
            isUser: true,
            message: "Generate Itinerary for three nights two days in Maldives",
          },
          {
            id: 2,
            isUser: false,
            message:
              "Certainly! Here’s a concise itinerary for a quick 3-night, 2-day getaway to the Maldives: Day 1: Arrival and Relaxation Morning : Arrive in Malé, the capital of the Maldives. Transfer from the airport to your resort via speedboat or seaplane, depending on the location of your resort. Afternoon : Check into your resort and spend the afternoon relaxing on the beach or exploring the resort facilities. Enjoy a dip in the crystal-clear waters. Evening : Have a sunset dinner at a restaurant overlooking the ocean, followed by a leisurely walk along the beach. Day 2: Exploration and Activities Morning : After breakfast, go for a snorkeling trip to explore the vibrant coral reefs. Alternatively, you could try a scuba diving session to see more of the underwater life.Afternoon : Return to the resort for lunch, then spend your afternoon at leisure. Consider a spa treatment for relaxation or take part in a water sport activity like ",
          },
        ]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", marginBottom: 4, gap: 8 }}>
            {item.isUser ? (
              <Icon
                source="account-circle-outline"
                color={Colors.black}
                size={32}
              />
            ) : (
              <Avatar.Image
                source={require("../../assets/images/logo.png")}
                style={{ backgroundColor: Colors.white }}
                size={32}
              />
            )}
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "Figtree_700Bold",
                  paddingTop: 8,
                  paddingBottom: 4,
                }}
              >
                {item.isUser ? "You" : "Travee"}
              </Text>
              <Text
                style={{
                  fontFamily: "Figtree_300Light",
                  textAlign: "justify",
                }}
              >
                {item.message}
              </Text>
            </View>
          </View>
        )}
      ></FlatList>
      <View
        style={{
          paddingRight: 20,
          paddingLeft: 20,
          paddingBottom: 12,
          backgroundColor: Colors.white,
        }}
      >
        <TextInput
          mode="flat"
          placeholder="Message Travee..."
          underlineStyle={{ display: "none" }}
          right={
            <TextInput.Icon
              icon="arrow-up-circle-outline"
              color={Colors.primary}
            />
          }
          cursorColor={Colors.primary}
          placeholderTextColor={Colors.gray}
          style={{
            height: 48,
            backgroundColor: Colors.white,
            borderTopRightRadius: 12,
            borderTopLeftRadius: 12,
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
            borderColor: Colors.gray,
            borderWidth: 1,
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
