import { screen } from '@testing-library/react';
import TestRenderer from '../testUtil';
import TodoList from '../components/todos';
import Item from '../components/todos/todo';
// import type { State } from '../store/todoStore';

const initialState = {
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
  const screen = TestRenderer(<TodoList />, initialState, '/completed');

  // screen.debug();

  // console.log('Environment:', process.env.NODE_ENV);

  expect(screen.getByTestId('todo-list')).toBeInTheDocument();
  expect(screen.getByTestId('todo-list').children.length).toBe(2);

  // expect(screen.getByText(/Review code/i)).toBeInTheDocument();
});
