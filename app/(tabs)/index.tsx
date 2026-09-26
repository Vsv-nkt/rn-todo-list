import React from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useTheme } from "../../context/ThemeContext";

import { Header } from "../../components/Header";
import { TodoForm } from "../../components/TodoForm";
import { TodoList } from "../../components/TodoList";

export default function TodosScreen() {
  const { colors } = useTheme();

  const todos = useQuery(api.todos.getTodos);

  const addTodo = useMutation(api.todos.createTodo);
  const toggleTodoMutation = useMutation(api.todos.toggleTodo);
  const deleteTodoMutation = useMutation(api.todos.deleteTodo);
  const updateTodoMutation = useMutation(api.todos.updateTodo);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.bg }]}
      edges={["top"]}
    >
      <View style={styles.content}>
        <Header
          totalCount={todos?.length ?? 0}
          completedCount={todos?.filter((t) => t.isCompleted).length ?? 0}
        />

        <TodoForm
          onAdd={async (text) => {
            await addTodo({ text });
          }}
        />

        {todos === undefined ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={[styles.loadingText, { color: colors.textMuted }]}>
              Синхронізація з Convex...
            </Text>
          </View>
        ) : (
          <TodoList
            todos={todos}
            onToggle={async (id) => {
              await toggleTodoMutation({ id: id as any });
            }}
            onDelete={async (id) => {
              await deleteTodoMutation({ id: id as any });
            }}
            onEdit={async (id, text) => {
              await updateTodoMutation({ id: id as any, text });
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: 16 },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: { marginTop: 12, fontSize: 14 },
});