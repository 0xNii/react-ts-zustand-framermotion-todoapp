import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import useTestTodoStore from './store/todoStore.test';
import type { State, Paths } from './store/todoStore.test';

const defaultValue: State = {
  todos: [],
};

const TestRenderer = (
  ui: React.ReactElement,
  initialState: State = defaultValue,
  route: Paths = '/'
) => {
  // Set store todos state
  useTestTodoStore.setState({ ...initialState });

  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="*" element={ui} />
      </Routes>
    </MemoryRouter>
  );
};

export default TestRenderer;
