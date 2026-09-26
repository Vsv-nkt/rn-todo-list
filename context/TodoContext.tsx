import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Todo } from "../types";

const TODOS_KEY = "@todos_list";

interface TodoContextType {
  todos: Todo[];
  addTodo: (text: string) => Promise<void>;
  toggleTodo: (id: string, completed: boolean) => Promise<void>;
  updateTodoText: (id: string, text: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  clearCompleted: () => Promise<void>;
  clearAll: () => Promise<void>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(TODOS_KEY).then((value) => {
      if (value) setTodos(JSON.parse(value));
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = async (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed } : t)));
  };

  const updateTodoText = async (id: string, text: string) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text } : t)));
  };

  const deleteTodo = async (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const clearCompleted = async () => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  };

  const clearAll = async () => {
    setTodos([]);
  };

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, toggleTodo, updateTodoText, deleteTodo, clearCompleted, clearAll }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error("useTodos must be used within TodoProvider");
  return ctx;
}