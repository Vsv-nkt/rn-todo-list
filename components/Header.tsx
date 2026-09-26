import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

interface HeaderProps {
  totalCount: number;
  completedCount: number;
}

export function Header({ totalCount, completedCount }: HeaderProps) {
  const { colors } = useTheme();
  return (
    <View style={styles.header}>
      <Text style={[styles.title, { color: colors.text }]}>Мій Список Завдань</Text>
      <Text style={[styles.subtitle, { color: colors.textMuted }]}>
        Виконано {completedCount} з {totalCount}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { marginBottom: 20, alignItems: "center" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 4 },
  subtitle: { fontSize: 14 },
});