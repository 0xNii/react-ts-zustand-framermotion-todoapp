import { renderWithStore } from '../testUtil';
import TodoList from '../components/todos';
import type { State } from '../store/todoStore';

const preloadedState: State = {
  todos: [
    {
      id: 'TsHx9eEN5Y4A',
      text: 'Learn to code',
      completed: false,
    },
    {
      id: 'ba91OwrK0Dt8',
      text: 'Write tests',
      completed: false,
    },
    {
      id: 'QeejYipEf5nk',
      text: 'Merge conflicts',
      completed: true,
    },
  ],
};

test('should render 3 todo items in initialAppState', async () => {
  const screen = renderWithStore(<TodoList />, {
    preloadedState: preloadedState,
    route: '/',
  });

  expect(screen.getByTestId('todo-list')).toBeInTheDocument();
  expect(screen.getByTestId('todo-list').children.length).toBe(6);
});
