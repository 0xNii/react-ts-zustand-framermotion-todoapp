import type { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useTodoStoreTest } from './store/todoStore';
import type { State, Paths } from './store/todoStore';

type TestOptions = {
  route?: Paths;
  preloadedState?: State;
};

export const renderWithStore = (
  ui: ReactNode,
  {
    route = '/',
    preloadedState = {
      todos: [],
    },
  }: TestOptions
) => {
  // Set store todos state
  useTodoStoreTest.setState({ ...preloadedState });

  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
};

export const renderApp = (ui: ReactNode) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

// Todos sample to be used in tests
export const preloadedState: State = {
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
