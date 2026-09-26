import { Alert, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { useTodos } from "../../context/TodoContext";

export default function SettingsScreen() {
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const { clearCompleted, clearAll } = useTodos();

  const confirmClearCompleted = () => {
    Alert.alert("Підтвердіть", "Видалити всі виконані завдання?", [
      { text: "Скасувати", style: "cancel" },
      { text: "Видалити", style: "destructive", onPress: clearCompleted },
    ]);
  };

  const confirmClearAll = () => {
    Alert.alert("Підтвердіть", "Видалити всі завдання?", [
      { text: "Скасувати", style: "cancel" },
      { text: "Видалити", style: "destructive", onPress: clearAll },
    ]);
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.bg }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Налаштування</Text>

        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.row}>
            <Ionicons name={isDarkMode ? "moon" : "sunny"} size={24} color={colors.primary} />
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              {isDarkMode ? "Темна тема" : "Світла тема"}
            </Text>
            <Switch value={isDarkMode} onValueChange={toggleTheme} />
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <TouchableOpacity style={styles.row} onPress={confirmClearCompleted}>
            <Ionicons name="checkmark-done-outline" size={24} color={colors.success} />
            <Text style={[styles.cardTitle, { color: colors.text }]}>Очистити виконані</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row} onPress={confirmClearAll}>
            <Ionicons name="trash-outline" size={24} color={colors.danger} />
            <Text style={[styles.cardTitle, { color: colors.danger }]}>Видалити всі</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Про додаток</Text>
          <Text style={[styles.version, { color: colors.textMuted }]}>Todo App v2.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { padding: 16 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  card: { borderRadius: 12, borderWidth: 1, padding: 16, marginBottom: 16 },
  row: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 8 },
  cardTitle: { flex: 1, fontSize: 16, fontWeight: "600" },
  version: { fontSize: 14, marginTop: 8 },
});