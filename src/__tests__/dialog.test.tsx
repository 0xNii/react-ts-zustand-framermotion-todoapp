import { render, screen, fireEvent } from '@testing-library/react';
import TodoApp from '../components/TodoApp';
import { MemoryRouter } from 'react-router-dom';

const renderApp = () => {
  return render(
    <MemoryRouter>
      <TodoApp />
    </MemoryRouter>
  );
};

describe('Dialog', () => {
  /**
   * JSDOM (the DOM implementation used by React Testing Library and Jest) does not implement
   * the <dialog> element API — so showModal() and close() are not available during tests.
   * Therefore, we mock showModal() and close()
   */
  beforeEach(() => {
    HTMLDialogElement.prototype.showModal = jest.fn();
    HTMLDialogElement.prototype.close = jest.fn();
  });

  test('renders a todo text input', () => {
    renderApp();

    const button = screen.getByText(/Add New Todo/);

    fireEvent.click(button);

    expect(
      screen.getByPlaceholderText('eg. Take a course in JS')
    ).toBeInTheDocument();
  });

  test('todo text input takes a value', () => {
    renderApp();

    const button = screen.getByText(/Add New Todo/);

    fireEvent.click(button);

    const input = screen.getByRole('textbox') as HTMLInputElement;

    fireEvent.change(input, {
      target: { value: 'Read a book' },
    });

    expect(input.value).toBe('Read a book');
  });
});
