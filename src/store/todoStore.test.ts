/** Test-only store without persist providing a clean
 * separation from the production store.
 */
import { create } from 'zustand';
import type { Todo } from './todoStore';

export type Paths = '/' | '/active' | '/completed';

export type State = {
  todos: Todo[];
};

type Actions = {
  addNewTodo: (todo: Todo) => void;
  removeTodo: (id: Todo['id']) => void;
  setTodos: (todos: State['todos']) => void;
};

export const initialState: State = {
  todos: [],
};

const useTestTodoStore = create<State & Actions>((set, get) => ({
  ...initialState,

  addNewTodo: (todo) => set({ todos: [...get().todos, todo] }),
  removeTodo: (id) => {
    const filteredTodos = get().todos.filter((todo) => !(todo.id === id));

    get().setTodos(filteredTodos);
  },
  setTodos: (todos) => set({ todos }),
}));

export default useTestTodoStore;
