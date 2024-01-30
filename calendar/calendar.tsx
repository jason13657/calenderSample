import { useState } from "react";
import { getCalendarDates, getWeeklyDates } from "./logic";
import { FlatList, Pressable, SafeAreaView, Text, View } from "react-native";
import { CalendarDate } from "./type";

const days: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Calendar() {
  const [year, setYear] = useState<number>(2024);
  const [month, setMonth] = useState<number>(10);
  const [markedDates, setMarkedDates] = useState<string[]>(["2024-01-24", "2024-03-24"]);
  const [selectedDate, setSelectedDate] = useState<string>("2024-01-23");

  const renderDate = ({ date }: CalendarDate) => {
    let marked = false;
    let selected = false;

    markedDates.forEach((v) => {
      if (v === date) {
        marked = true;
      }
    });

    if (selectedDate === date) {
      selected = true;
    }

    return (
      <Pressable
        onPress={() => {
          handleOnClickDate(date);
        }}
      >
        <View
          style={[
            { borderWidth: 1.3, borderRadius: 4, margin: 1, padding: 2, borderColor: "black", width: 50, alignItems: "center" },
            marked ? { backgroundColor: "yellow" } : {},
            selected ? { backgroundColor: "blue" } : {},
          ]}
        >
          <Text>{date.slice(8)}</Text>
        </View>
      </Pressable>
    );
  };

  const renderDay = (day: string) => {
    return (
      <View style={{ borderWidth: 1.3, borderRadius: 4, margin: 1, padding: 2, borderColor: "black", width: 50, alignItems: "center" }}>
        <Text>{day}</Text>
      </View>
    );
  };

  const renderWeek = (dates: CalendarDate[]) => {
    return <FlatList data={dates} renderItem={({ item }) => renderDate(item)} style={{ flexDirection: "row", justifyContent: "center" }} />;
  };

  const handleOnClickDate = (date: string) => {
    console.log(date);
    setSelectedDate(date);
  };

  const handleMoveBtns = (type: "prev" | "next") => {
    switch (type) {
      case "next": {
        if (month === 11) {
          setYear(year + 1);
          setMonth(0);
        } else {
          setMonth(month + 1);
        }
        return;
      }
      case "prev": {
        if (month === 0) {
          setYear(year - 1);
          setMonth(11);
        } else {
          setMonth(month - 1);
        }
        return;
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={{}}>
        <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 10, alignItems: "center" }}>
          <Pressable
            style={{ paddingHorizontal: 7, paddingVertical: 3 }}
            onPress={() => {
              handleMoveBtns("prev");
            }}
          >
            <Text style={{ fontSize: 14 }}>Prev</Text>
          </Pressable>
          <Text style={{ fontSize: 20, marginHorizontal: 10 }}>
            {year} {month + 1}
          </Text>
          <Pressable
            style={{ paddingHorizontal: 7, paddingVertical: 3 }}
            onPress={() => {
              handleMoveBtns("next");
            }}
          >
            <Text style={{ fontSize: 14 }}>Next</Text>
          </Pressable>
        </View>
        <FlatList
          data={days}
          renderItem={({ item }) => renderDay(item)}
          contentContainerStyle={{ flexDirection: "row", justifyContent: "center", marginBottom: 6 }}
        />
        <FlatList data={getWeeklyDates(getCalendarDates(year, month))} renderItem={({ item }) => renderWeek(item)} style={{}} />
      </View>
    </SafeAreaView>
  );
}

// 서종선이 2024 10 30 만듬.
