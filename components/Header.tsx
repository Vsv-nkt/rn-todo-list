import { StyleSheet, Text, View } from "react-native";

interface HeaderProps {
  totalCount: number;
  completedCount: number;
}

export function Header({ totalCount, completedCount }: HeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Мій Список Завдань</Text>
      <Text style={styles.subtitle}>
        Виконано {completedCount} з {totalCount}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a1a2e",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
});