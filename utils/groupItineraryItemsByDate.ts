import { Itinerary, ItineraryItem } from "@/constants/Types";
import { format } from "date-fns";

export function groupItineraryItemsByDate(
  itineraryItems: ItineraryItem[]
): Itinerary[] {
  const groupedItems: { [key: string]: ItineraryItem[] } = {};

  itineraryItems.forEach((item) => {
    // Format tanggal dari time_start menjadi string
    const date = format(item.time_start, "yyyy-MM-dd");

    // Jika tanggal belum ada di objek groupedItems, inisialisasi sebagai array kosong
    if (!groupedItems[date]) {
      groupedItems[date] = [];
    }

    // Tambahkan item ke dalam grup yang sesuai berdasarkan tanggal
    groupedItems[date].push(item);
  });

  // Konversi objek groupedItems ke dalam array Itinerary[]
  const itineraries: Itinerary[] = Object.keys(groupedItems).map((date) => ({
    date: date,
    items: groupedItems[date],
  }));

  return itineraries;
}
