# Звіт про виконання завдання

## Тема
Міграція Todo App з React (Web) на React Native (Expo).

## Що зроблено

### 1. Створено RN-проект
- Проект `rn-todo-list` на Expo + TypeScript.
- Шаблон `blank-typescript` (без Expo Router, тому що одного екрану достатньо).

### 2. Перенесено структуру з веб-версії
- `types/index.ts` — інтерфейс `Todo`.
- `services/api.ts` — робота з REST API (`json-server` на порту 3000).
- `components/Header.tsx` — заголовок та лічильник.
- `components/TodoForm.tsx` — форма додавання завдання.
- `components/TodoItem.tsx` — окреме завдання з чекбоксом, редагуванням та видаленням.
- `components/TodoList.tsx` — список завдань через `FlatList`.
- `App.tsx` — головний екран, що збирає все.

### 3. Адаптовано UI під React Native

| Web | React Native |
|-----|--------------|
| `<div>` | `<View>` |
| `<p>`, `<strong>` | `<Text>` |
| `<button>` | `<TouchableOpacity>` |
| `<input>` | `<TextInput>` |
| `<ul>` + `.map()` | `<FlatList>` |
| CSS-файли | `StyleSheet.create()` |
| `alert()` | `Alert.alert()` |
| CSS-спінер | `<ActivityIndicator>` |
| Кнопка оновлення | `<RefreshControl>` (Pull-to-Refresh) |

### 4. Реалізовано функціонал
- Завантаження завдань з сервера (`GET /todos`).
- Додавання завдання (`POST /todos`).
- Позначення "виконано" (`PATCH /todos/:id`).
- Редагування тексту (`PATCH /todos/:id`).
- Видалення (`DELETE /todos/:id`).
- Pull-to-Refresh для оновлення списку.
- Обробка помилок з'єднання з банером та кнопкою "Повторити".
- Оптимістичні оновлення UI (сначала меняем UI, потом отправляем запрос).

### 5. Мережева взаємодія
- Web: `http://localhost:3000`.
- Android-емулятор: `http://10.0.2.2:3000`.
- Фізичний пристрій: IP комп'ютера з конфігурації Metro Bundler (`Constants.expoConfig?.hostUri`).

## Труднощі

1. **TextInput у RN відрізняється від `<input>`** — інші пропси: `onChangeText` замість `onChange`, `placeholderTextColor`, `onSubmitEditing`.
2. **Мережева взаємодія на мобільному** — `localhost` не працює на телефоні, потрібно визначати IP комп'ютера динамічно.
3. **Стилізація** — у RN немає CSS. Довелось переписувати всі стилі через `StyleSheet.create()`, з властивостями `flex`, `shadowColor`, `elevation`.
4. **Pull-to-Refresh** — реалізується тільки через `RefreshControl` у `FlatList`.
5. **Редагування задачі** — потрібно було додати локальний стан (`isEditing`, `editText`) у `TodoItem`.

## Що вивчено

- Різниця між React Web та React Native.
- Компоненти RN: `View`, `Text`, `TextInput`, `TouchableOpacity`, `FlatList`, `ScrollView`.
- Робота з REST API через `fetch` у мобільному середовищі.
- Оптимістичні оновлення UI для покращення UX.
- Налагодження мережі на Android/iOS.
- Expo Constants для динамічного визначення базового URL