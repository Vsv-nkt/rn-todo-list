import { useState } from "react";
import { ActivityIndicator, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

interface TodoFormProps {
  onAdd: (text: string) => Promise<void>;
  loading: boolean;
}

export function TodoForm({ onAdd, loading }: TodoFormProps) {
  const { colors } = useTheme();
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    if (!text.trim()) return;
    await onAdd(text.trim());
    setText("");
    Keyboard.dismiss();
  };

  return (
    <View style={styles.form}>
      <TextInput
        style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]}
        value={text}
        onChangeText={setText}
        placeholder="Що потрібно зробити?"
        placeholderTextColor={colors.textMuted}
        editable={!loading}
        onSubmitEditing={handleSubmit}
        returnKeyType="done"
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }, !text.trim() && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={!text.trim() || loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Додати</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { flexDirection: "row", marginBottom: 20, gap: 8 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: "center",
    minWidth: 80,
    alignItems: "center",
  },
  buttonDisabled: { backgroundColor: "#c7c7c7" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});