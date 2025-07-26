import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Todo {
  readonly id: string;
  text: string;
  completed: boolean;
}

type State = {
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
const createTodoStore = () =>
  create<State & Actions>()((set, get) => ({
    ...initialState,
    addNewTodo: (todo) => set({ todos: [...get().todos, todo] }),
    removeTodo: (id) =>
      set({ todos: get().todos.filter((todo) => todo.id !== id) }),
    setTodos: (todos) => set({ todos }),
  }));

// Production store with persistence
export const useTodoStore = create(
  persist<State & Actions>(
    (set, get) => ({
      ...initialState,
      addNewTodo: (todo) => set({ todos: [...get().todos, todo] }),
      removeTodo: (id) =>
        set({ todos: get().todos.filter((todo) => todo.id !== id) }),
      setTodos: (todos) => set({ todos }),
    }),
    {
      name: "Today's Todos",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Test store without persistence
export const useTodoStoreTest = createTodoStore();

// Default export: Select store based on environment
const isTestEnv = process.env.NODE_ENV === 'test';
export default isTestEnv ? useTodoStoreTest : useTodoStore;
