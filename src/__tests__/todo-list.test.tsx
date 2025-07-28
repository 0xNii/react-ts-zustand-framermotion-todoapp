import { screen, fireEvent } from '@testing-library/react';
import { renderWithStore } from '../testUtil';
import TodoList from '../components/todos';
import type { State } from '../store/todoStore';
import FilterActions from '../components/filters/actions';

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

describe('TodoList', () => {
  it("should render 3 todo items with preloadedState on path '/'", () => {
    renderWithStore(<TodoList />, {
      preloadedState: preloadedState,
    });

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByRole('list').children.length).toBe(3);
    expect(Array.isArray(screen.getAllByRole('listitem'))).toBe(true);
    expect(screen.getAllByRole('listitem')[0]).toHaveTextContent(
      'Learn to code'
    );
    expect(screen.getAllByRole('listitem')[1]).toHaveTextContent('Write tests');
    expect(screen.getAllByRole('listitem')[2]).toHaveTextContent(
      'Merge conflicts'
    );
  });

  it('should remain 2 todos after completed todos delete', () => {
    renderWithStore(
      <>
        <FilterActions />
        <TodoList />
      </>,
      {
        preloadedState: preloadedState,
      }
    );

    expect(screen.getByTestId('clear-todos-btn')).toBeInTheDocument();

    // Clear completed todos
    fireEvent.click(screen.getByTestId('clear-todos-btn'));

    // Assertions
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByRole('list').children.length).toBe(2);
    expect(screen.getAllByRole('listitem')[0]).toHaveTextContent(
      'Learn to code'
    );
    expect(screen.getAllByRole('listitem')[1]).toHaveTextContent('Write tests');
  });

  it("should render 2 todo items with preloadedState on path '/active'", () => {
    renderWithStore(<TodoList />, {
      preloadedState: preloadedState,
      route: '/active',
    });

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByRole('list').children.length).toBe(2);
    expect(screen.getAllByRole('listitem')[0]).toHaveTextContent(
      'Learn to code'
    );
    expect(screen.getAllByRole('listitem')[1]).toHaveTextContent('Write tests');
    expect(screen.getAllByLabelText('checkbox')[0]).not.toBeChecked();
    expect(screen.getAllByLabelText('checkbox')[1]).not.toBeChecked();
    expect(screen.getAllByRole('button', { name: /edit/i }).length).toBe(2);
  });

  it("should render a todo item with preloadedState on path '/completed'", () => {
    renderWithStore(<TodoList />, {
      preloadedState: preloadedState,
      route: '/completed',
    });

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByRole('list').children.length).toBe(1);
    expect(screen.getAllByRole('listitem')[0]).toHaveTextContent(
      'Merge conflicts'
    );
    expect(screen.getAllByLabelText('checkbox')[0]).toBeChecked();
    expect(screen.queryByRole('button', { name: /edit/i })).toBeNull();
  });

  it("should not render a todo list on path '/active' with no active todos", () => {
    renderWithStore(
      <>
        <FilterActions />
        <TodoList />
      </>,
      {
        preloadedState: preloadedState,
        route: '/active',
      }
    );

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByTestId('mark-all-todos-btn')).toBeInTheDocument();

    // Check all active todos
    fireEvent.click(screen.getByTestId('mark-all-todos-btn'));

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
    expect(screen.getByText(/Great job! get some rest/)).toBeInTheDocument();
  });

  it("should not render a todo list on path '/completed' when no todos are completed", () => {
    renderWithStore(
      <>
        <FilterActions />
        <TodoList />
      </>,
      {
        preloadedState: preloadedState,
        route: '/completed',
      }
    );

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByTestId('readd-todos-btn')).toBeInTheDocument();

    // Readd all completed todos
    fireEvent.click(screen.getByTestId('readd-todos-btn'));

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
    expect(screen.getByText(/Strangest Loop/i)).toBeInTheDocument();
  });
});
