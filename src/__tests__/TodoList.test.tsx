import { screen } from '@testing-library/react';
import TestRenderer from '../testUtil';
import TodoList from '../components/todos';
import Item from '../components/todos/todo';
// import type { State } from '../store/todoStore';

const initialState = {
  todos: [
    {
      id: 'TsHx9eEN5Y4A',
      text: 'Learn TypeScript',
      completed: false,
    },
    {
      id: 'ba91OwrK0Dt8',
      text: 'Merge conflicts',
      completed: true,
    },
    {
      id: 'QeejYipEf5nk',
      text: 'Review code',
      completed: true,
    },
  ],
};

test('should be render 3 todo items in initialAppState', async () => {
  TestRenderer(<TodoList />, initialState, '/completed');

  // screen.debug();

  expect(screen.getByTestId('todo-list')).toBeInTheDocument();
  expect(screen.getByTestId('todo-list').children.length).toBe(2);

  // expect(screen.getByText(/Review code/i)).toBeInTheDocument();
});
