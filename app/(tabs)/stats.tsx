import { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { useTodos } from "../../context/TodoContext";

export default function StatsScreen() {
  const { colors } = useTheme();
  const { todos } = useTodos();

  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const active = total - completed;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  const cards = [
    { title: "Всього", value: total, icon: "list-outline", color: colors.primary },
    { title: "Активні", value: active, icon: "time-outline", color: "#f59e0b" },
    { title: "Виконані", value: completed, icon: "checkmark-circle-outline", color: colors.success },
    { title: "Прогрес", value: `${percent}%`, icon: "trending-up-outline", color: colors.primary },
  ];

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.bg }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Статистика</Text>
        <View style={styles.grid}>
          {cards.map((card) => (
            <View key={card.title} style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Ionicons name={card.icon as any} size={32} color={card.color} />
              <Text style={[styles.value, { color: colors.text }]}>{card.value}</Text>
              <Text style={[styles.label, { color: colors.textMuted }]}>{card.title}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { padding: 16 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  card: {
    width: "48%",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    marginBottom: 12,
  },
  value: { fontSize: 28, fontWeight: "bold", marginTop: 8 },
  label: { fontSize: 13, marginTop: 4 },
});