import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Todo {
  id: string;
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

/* Practice with no store actions */
// export const updateTodos = (todos: State["todos"]) => {
//   useTodoStore.setState({ todos });
// };

// export const todos = () => {
//     useTodoStore.getState().todos
// }
