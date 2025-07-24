import { render } from '@testing-library/react';
import TodoApp from '../components/TodoApp';
import { MemoryRouter } from 'react-router-dom';

test('renders Vite + React text', () => {
  const screen = render(
    <MemoryRouter>
      <TodoApp />
    </MemoryRouter>
  );
  expect(screen.getByText(/0xNii/)).toBeInTheDocument();
});
