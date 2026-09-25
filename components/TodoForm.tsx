import { useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface TodoFormProps {
  onAdd: (text: string) => Promise<void>;
  loading: boolean;
}

export function TodoForm({ onAdd, loading }: TodoFormProps) {
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    if (!text.trim()) return;
    try {
      await onAdd(text.trim());
      setText("");
      Keyboard.dismiss();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Що потрібно зробити?"
        placeholderTextColor="#999"
        editable={!loading}
        onSubmitEditing={handleSubmit}
        returnKeyType="done"
      />
      <TouchableOpacity
        style={[styles.button, !text.trim() && styles.buttonDisabled]}
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
  form: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#1a1a2e",
  },
  button: {
    backgroundColor: "#6366f1",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: "center",
    minWidth: 80,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#c7c7c7",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});