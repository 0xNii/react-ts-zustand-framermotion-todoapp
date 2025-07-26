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
  todos: [
    {
      id: 'TsHx9eEN5Y4A',
      text: 'Learn TypeScript',
      completed: false,
    },
    {
      id: 'ba91OwrK0Dt8',
      text: 'Merge conflicts',
      completed: false,
    },
    {
      id: 'QeejYipEf5nk',
      text: 'Review code',
      completed: true,
    },
  ],
};

const useTodoStore = create(
  persist<State & Actions>(
    (set, get) => ({
      ...initialState,

      addNewTodo: (todo) => set({ todos: [...get().todos, todo] }),
      removeTodo: (id) => {
        const filteredTodos = get().todos.filter((todo) => !(todo.id === id));

        get().setTodos(filteredTodos);
      },
      setTodos: (todos) => set({ todos }),
    }),
    {
      name: "Today's Todos",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useTodoStore;
