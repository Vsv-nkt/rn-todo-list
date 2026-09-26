import type { Id } from "../convex/_generated/dataModel";

export interface Todo {
  _id: Id<"todos">;
  _creationTime: number;
  text: string;
  isCompleted: boolean;
  createdAt: number;
}

export interface ThemeColors {
  bg: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  success: string;
  danger: string;
}