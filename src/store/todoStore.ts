import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { StateCreator } from 'zustand';

export type Paths = '/' | '/active' | '/completed';

export interface Todo {
  readonly id: string;
  text: string;
  completed: boolean;
}

export type State = {
  todos: Todo[];
};

type Actions = {
  addNewTodo: (todo: Todo) => void;
  removeTodo: (id: Todo['id']) => void;
  setTodos: (todos: State['todos']) => void;
};

const initialState: State = {
  todos: [],
};

// Core store logic (shared between production and test stores)
const createTodoStore: StateCreator<State & Actions> = (set, get) => ({
  ...initialState,

  setTodos: (todos) => set({ todos }),
  addNewTodo: (todo) => set({ todos: [...get().todos, todo] }),
  removeTodo: (id) => {
    const filteredTodos = get().todos.filter((todo) => todo.id !== id);

    get().setTodos(filteredTodos);
  },
});

// Production store with persistence
export const useTodoStore = create(
  persist(createTodoStore, {
    name: "Today's Todos",
    storage: createJSONStorage(() => localStorage),
  })
);

// Test store without persistence
export const useTodoStoreTest = create(createTodoStore);

// Default export: Select store based on environment
const isTestEnv = process.env.NODE_ENV === 'test';
export default isTestEnv ? useTodoStoreTest : useTodoStore;
