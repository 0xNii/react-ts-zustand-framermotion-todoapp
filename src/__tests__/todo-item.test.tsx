import { fireEvent, screen, act } from '@testing-library/react';
import { renderWithStore, preloadedState } from '../testUtil';
import Item from '../components/todos/todo';
import { Reorder } from 'framer-motion';
import userEvent from '@testing-library/user-event';
import { useTodoStoreTest } from '../store/todoStore';

describe('TodoItem', () => {
  it('should render a active todo item correctly', () => {
    renderWithStore(
      <Reorder.Group
        axis="y"
        values={preloadedState.todos}
        onReorder={() => {}}
      >
        <Item todo={preloadedState.todos[0]!!!} />
      </Reorder.Group>,
      {
        preloadedState: preloadedState,
      }
    );

    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    expect(screen.getByText(/Learn to code/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /edit/ })).toBeInTheDocument();

    // Checked
    expect(screen.getByLabelText('checkbox')).not.toBeChecked();
  });

  it('should render a completed todo item correctly', () => {
    renderWithStore(
      <Reorder.Group
        axis="y"
        values={preloadedState.todos}
        onReorder={() => {}}
      >
        <Item todo={preloadedState.todos[2]!!!} />
      </Reorder.Group>,
      {
        preloadedState: preloadedState,
      }
    );

    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    expect(screen.getByText(/Merge conflicts/)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /edit/ })).toBeNull();

    // Checked
    expect(screen.getByLabelText('checkbox')).toBeChecked();
  });

  it('should render delete and grab buttons', () => {
    renderWithStore(
      <Reorder.Group
        axis="y"
        values={preloadedState.todos}
        onReorder={() => {}}
      >
        <Item todo={preloadedState.todos[0]!!!} />
      </Reorder.Group>,
      {
        preloadedState: preloadedState,
      }
    );

    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    expect(screen.getByRole('button', { name: /delete/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /drag/ })).toBeInTheDocument();
  });

  it('should render a dialog on edit action', async () => {
    renderWithStore(
      <Reorder.Group
        axis="y"
        values={preloadedState.todos}
        onReorder={() => {}}
      >
        <Item todo={preloadedState.todos[0]!!!} />
      </Reorder.Group>,
      {
        preloadedState: preloadedState,
      }
    );

    expect(useTodoStoreTest.getState().todos[0]!!!.text).toBe('Learn to code');

    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    expect(screen.getByText(/Learn to code/)).toBeInTheDocument();

    const editBtn = screen.getByRole('button', { name: /edit/ });
    expect(editBtn).toBeInTheDocument();

    fireEvent.click(editBtn);

    // Dialog
    HTMLDialogElement.prototype.showModal = jest.fn();
    HTMLDialogElement.prototype.close = jest.fn();

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    const input = screen.getByRole('textbox') as HTMLInputElement;

    // Assert input value
    expect(input.value).toBe('Learn to code');

    // Edit input value and submit
    const user = userEvent.setup();
    await user.clear(input);
    await user.type(input, 'Open a pull request{enter}');

    expect(useTodoStoreTest.getState().todos[0]!!!.text).toBe(
      'Open a pull request'
    );

    // Delay to unmount dialog in ms as defined in setTimeout
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
    });

    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('should be removed from store todos on delete', () => {
    renderWithStore(
      <Reorder.Group
        axis="y"
        values={preloadedState.todos}
        onReorder={() => {}}
      >
        <Item todo={preloadedState.todos[0]!!!} />
      </Reorder.Group>,
      {
        preloadedState: preloadedState,
      }
    );

    expect(useTodoStoreTest.getState().todos[0]!!!.text).toBe('Learn to code');

    const deleteBtn = screen.getByRole('button', { name: /delete/ });
    expect(deleteBtn).toBeInTheDocument();

    fireEvent.click(deleteBtn);

    expect(useTodoStoreTest.getState().todos[0]!!!.text).not.toBe(
      'Learn to code'
    );
  });
});
