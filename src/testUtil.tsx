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
