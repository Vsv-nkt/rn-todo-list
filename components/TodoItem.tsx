import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { Todo } from "../types";
import { useTheme } from "../context/ThemeContext";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onEdit: (id: string, text: string) => Promise<void>;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const { colors } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = async () => {
    const trimmed = editText.trim();
    if (!trimmed) {
      setEditText(todo.text);
      setIsEditing(false);
      return;
    }
    if (trimmed !== todo.text) {
      await onEdit(todo._id, trimmed);
    }
    setIsEditing(false);
  };

  return (
    <View
      style={[
        styles.item,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      <TouchableOpacity
        onPress={() => onToggle(todo._id)}
        style={styles.iconBtn}
      >
        <Ionicons
          name={todo.isCompleted ? "checkmark-circle" : "ellipse-outline"}
          size={26}
          color={todo.isCompleted ? colors.success : colors.primary}
        />
      </TouchableOpacity>

      {isEditing ? (
        <TextInput
          style={[
            styles.editInput,
            { color: colors.text, borderBottomColor: colors.primary },
          ]}
          value={editText}
          onChangeText={setEditText}
          onSubmitEditing={handleSave}
          onBlur={handleSave}
          autoFocus
          returnKeyType="done"
        />
      ) : (
        <Text
          style={[
            styles.text,
            { color: todo.isCompleted ? colors.textMuted : colors.text },
            todo.isCompleted && styles.textCompleted,
          ]}
          onPress={() => setIsEditing(true)}
        >
          {todo.text}
        </Text>
      )}

      <TouchableOpacity
        onPress={() => onDelete(todo._id)}
        style={styles.iconBtn}
      >
        <Ionicons name="trash-outline" size={22} color={colors.danger} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
  },
  iconBtn: { padding: 4 },
  text: { flex: 1, fontSize: 16, marginHorizontal: 10 },
  textCompleted: { textDecorationLine: "line-through" },
  editInput: {
    flex: 1,
    fontSize: 16,
    borderBottomWidth: 1,
    paddingVertical: 4,
    marginHorizontal: 10,
  },
});