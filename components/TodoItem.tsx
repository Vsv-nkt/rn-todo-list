import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import type { Todo } from "../types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onEdit: (id: string, text: string) => Promise<void>;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = async () => {
    const trimmed = editText.trim();
    if (!trimmed) {
      setEditText(todo.text);
      setIsEditing(false);
      return;
    }
    if (trimmed === todo.text) {
      setIsEditing(false);
      return;
    }
    await onEdit(todo.id, trimmed);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  return (
    <View style={styles.item}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => onToggle(todo.id, !todo.completed)}
      >
        <Text style={styles.checkboxText}>{todo.completed ? "✓" : ""}</Text>
      </TouchableOpacity>

      {isEditing ? (
        <TextInput
          style={styles.editInput}
          value={editText}
          onChangeText={setEditText}
          onSubmitEditing={handleSave}
          onBlur={handleCancel}
          autoFocus
          returnKeyType="done"
        />
      ) : (
        <Text
          style={[styles.text, todo.completed && styles.textCompleted]}
          onPress={() => setIsEditing(true)}
        >
          {todo.text}
        </Text>
      )}

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(todo.id)}
      >
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#6366f1",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  checkboxText: {
    color: "#6366f1",
    fontWeight: "bold",
    fontSize: 14,
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: "#1a1a2e",
  },
  textCompleted: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  editInput: {
    flex: 1,
    fontSize: 16,
    color: "#1a1a2e",
    borderBottomWidth: 1,
    borderBottomColor: "#6366f1",
    paddingVertical: 4,
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
  deleteText: {
    fontSize: 18,
    color: "#ef4444",
    fontWeight: "bold",
  },
});