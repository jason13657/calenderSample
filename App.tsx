import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Calendar from "./calendar/calendar";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Calendar />
    </View>
  );
}
