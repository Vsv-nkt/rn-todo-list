import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Header } from "../../components/Header";
import { TodoForm } from "../../components/TodoForm";
import { TodoList } from "../../components/TodoList";
import { useTheme } from "../../context/ThemeContext";
import { useTodos } from "../../context/TodoContext";

export default function TasksScreen() {
  const { colors } = useTheme();
  const { todos, addTodo, toggleTodo, updateTodoText, deleteTodo } = useTodos();
  const [refreshing, setRefreshing] = useState(false);

  const completedCount = useMemo(
    () => todos.filter((t) => t.completed).length,
    [todos],
  );

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 500);
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.bg }]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
          <Header totalCount={todos.length} completedCount={completedCount} />
          <TodoForm onAdd={addTodo} loading={false} />
          <TodoList
            todos={todos}
            refreshing={refreshing}
            onRefresh={onRefresh}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={updateTodoText}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1, padding: 16 },
});