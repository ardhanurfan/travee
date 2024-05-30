import EmptyChat from "@/components/EmptyChat";
import Colors from "@/constants/Colors";
import { GetChats, GetRecommendation } from "@/services/ChatService";
import { useState, useRef, useEffect } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  View,
  TouchableOpacity,
} from "react-native";
import {
  ActivityIndicator,
  Appbar,
  Avatar,
  Icon,
  IconButton,
  Text,
  TextInput,
} from "react-native-paper";

export default function ChatBotPage() {
  const { chats } = GetChats();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showScrollToBottom, setShowScrollToBottom] = useState<boolean>(false);

  const flatListRef = useRef<FlatList | null>(null);

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  const handleSend = async () => {
    setLoading(true);
    if (message !== "") {
      setMessage("");
      await GetRecommendation(message);
    }
    setLoading(false);
  };

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const handleScroll = (event: any) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const isAtBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    setShowScrollToBottom(!isAtBottom);
  };

  return (
    <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: Colors.white }}>
        <Appbar.Content
          title="Ask Travee Anything"
          titleStyle={{ fontFamily: "Figtree_700Bold" }}
        />
      </Appbar.Header>
      {chats.length === 0 ? (
        <EmptyChat />
      ) : (
        <FlatList
          ref={flatListRef}
          onScroll={handleScroll}
          style={{
            backgroundColor: Colors.white,
            paddingHorizontal: 20,
          }}
          showsVerticalScrollIndicator={false}
          data={chats}
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
      )}
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 12,
          backgroundColor: Colors.white,
        }}
      >
        <TextInput
          mode="flat"
          placeholder="Message Travee..."
          underlineStyle={{ display: "none" }}
          right={
            !loading && (
              <TextInput.Icon
                onPress={handleSend}
                icon="arrow-up-circle-outline"
                color={Colors.primary}
              />
            )
          }
          cursorColor={Colors.primary}
          placeholderTextColor={Colors.gray}
          value={message}
          onChangeText={setMessage}
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
        {loading && (
          <ActivityIndicator
            size="small"
            color={Colors.primary}
            style={{ position: "absolute", right: 36, top: 24 }}
          />
        )}
        {showScrollToBottom && (
          <View
            style={{
              position: "absolute",
              alignItems: "center",
              left: 0,
              right: 0,
              bottom: 80,
            }}
          >
            <IconButton
              icon="arrow-down"
              size={20}
              onPress={scrollToBottom}
              iconColor={Colors.white}
              style={{ backgroundColor: Colors.primary }}
            />
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
