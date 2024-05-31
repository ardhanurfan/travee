import ItineraryCard from "@/components/ItineraryCard";
import Colors from "@/constants/Colors";
import { GetItinerary } from "@/services/ItineraryService";
import { GetTripById } from "@/services/TripService";
import { format } from "date-fns";
import MapView, { Marker } from "react-native-maps";
import { useLocalSearchParams, router } from "expo-router";
import React, { useMemo, useState } from "react";
import { ScrollView, View, Image } from "react-native";
import { Button, IconButton, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { generateDateRange } from "@/utils/generateDateRange";

function TripDetailPage() {
  const { id } = useLocalSearchParams();
  const { trip } = GetTripById(id as string);
  const { itinerary } = GetItinerary(id as string);
  const [dateIdx, setDateIdx] = useState(0);

  const dateRange = useMemo(() => {
    if (!trip) return [];
    return generateDateRange(trip?.start_date!, trip?.end_date!);
  }, [trip]);

  const filteredItinerary = useMemo(() => {
    if (!itinerary || dateRange.length === 0) return [];
    return (
      itinerary.find(
        (itinerary) =>
          format(itinerary.date, "yyyy-MM-dd") ===
          format(dateRange[dateIdx], "yyyy-MM-dd")
      )?.items || []
    );
  }, [itinerary, dateIdx, dateRange]);

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={{ flex: 1, backgroundColor: Colors.white }}
    >
      {/* Header */}
      <View
        style={{
          padding: 20,
          position: "absolute",
          zIndex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          top: 40,
        }}
      >
        <IconButton
          icon="arrow-left"
          iconColor={Colors.black}
          size={24}
          style={{
            backgroundColor: Colors.white,
            borderRadius: 999,
          }}
          onPress={() => router.back()}
        />
        <View style={{ flexDirection: "row", gap: 4 }}>
          <IconButton
            icon="account-plus-outline"
            iconColor={Colors.black}
            size={24}
            style={{
              backgroundColor: Colors.white,
              borderRadius: 999,
            }}
            onPress={() =>
              router.push({
                pathname: "/(person)/ListPage",
                params: { id: id },
              })
            }
          />
          <IconButton
            icon="currency-usd"
            iconColor={Colors.black}
            size={24}
            style={{
              backgroundColor: Colors.white,
              borderRadius: 999,
            }}
            onPress={() => router.push({ pathname: "/(splitBill)/ListPage" })}
          />
        </View>
      </View>

      {/* FAB */}
      <View
        style={{
          padding: 20,
          position: "absolute",
          zIndex: 1,
          bottom: 20,
          right: 0,
        }}
      >
        <IconButton
          icon="pencil-outline"
          iconColor={Colors.white}
          size={32}
          style={{
            backgroundColor: Colors.primary,
            borderRadius: 999,
          }}
          onPress={() =>
            router.push({
              pathname: "/(itinerary)/EditPage",
              params: {
                id: id,
                destinationId: trip?.destination.id,
              },
            })
          }
        />
      </View>

      {/* Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: trip?.destination.photo_url }}
          style={{
            width: "100%",
            height: 300,
            objectFit: "cover",
          }}
        />
        <View style={{ padding: 20 }}>
          <Text
            style={{
              fontFamily: "Figtree_700Bold",
              fontSize: 20,
              marginBottom: 12,
            }}
          >
            {trip?.destination.name}
          </Text>
          <Text
            style={{
              fontFamily: "Figtree_300Light",
              fontSize: 12,
              color: Colors.gray,
              marginBottom: 12,
            }}
          >
            {trip &&
              `${format(trip?.start_date, "dd MMM yyyy")}-${format(
                trip?.end_date,
                "dd MMM yyyy"
              )}  |  ${trip?.count_people}|  ${trip?.budget}`}
          </Text>

          {/* Maps */}
          <View
            style={{
              height: 220,
              width: "100%",
              backgroundColor: Colors.secondary,
              borderRadius: 12,
            }}
          >
            <MapView
              style={{ width: "100%", height: "100%", borderRadius: 12 }}
            >
              {filteredItinerary.length > 0 &&
                filteredItinerary.map((item, idx) => (
                  <Marker
                    key={idx}
                    coordinate={{
                      latitude: item.event.latitude,
                      longitude: item.event.longitude,
                    }}
                    title={item.event.name}
                  />
                ))}
            </MapView>
          </View>

          {/* Select Kalender */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginVertical: 16 }}
          >
            {dateRange.map((date, idx) => (
              <Button
                key={idx}
                onPress={() => setDateIdx(idx)}
                style={{
                  width: 160,
                  backgroundColor:
                    idx === dateIdx ? Colors.primary : Colors.white,
                  borderRadius: 24,
                  marginRight: 12,
                  borderColor: Colors.gray,
                  borderWidth: idx === dateIdx ? 0 : 1,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Figtree_400Regular",
                    fontSize: 14,
                    color: idx === dateIdx ? Colors.white : Colors.gray,
                    textAlign: "center",
                    paddingVertical: 4,
                  }}
                >
                  {format(date, "dd MMM yyyy")}
                </Text>
              </Button>
            ))}
          </ScrollView>

          {/* Itinerary */}

          {filteredItinerary.length > 0 ? (
            filteredItinerary.map((item, idx) => (
              <ItineraryCard key={idx} itineraryItem={item} />
            ))
          ) : (
            <Text
              style={{
                fontFamily: "Figtree_400Regular",
                fontSize: 14,
                textAlign: "center",
                color: Colors.gray,
              }}
            >
              You haven't added any itinerary yet in this day
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default TripDetailPage;
