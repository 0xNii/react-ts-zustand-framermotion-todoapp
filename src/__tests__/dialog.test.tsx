import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import TodoApp from '../components/TodoApp';
import { renderApp } from '../testUtil';
import Dialog from '../components/dialog';
import type { Todo } from '../store/todoStore';

describe('Unit test for Dialog', () => {
  it('should render an empty input if action is add', () => {
    const dialogRef = React.createRef<HTMLDialogElement>(); // Create dialogRef
    const closeDialog = jest.fn(); // Mock function

    // prettier-ignore
    render(<Dialog dialogRef={dialogRef} closeDialog={closeDialog} action="add" />);

    expect(dialogRef.current).not.toBeNull();
    expect(screen.getByRole('heading')).toHaveTextContent(/type/i);
    expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe('');
  });

  it('should render an input with text if action is edit', () => {
    const dialogRef = React.createRef<HTMLDialogElement>();
    const closeDialog = jest.fn();
    const todo: Todo = {
      id: '1',
      text: 'Test dialog',
      completed: false,
    };

    render(
      <Dialog
        dialogRef={dialogRef}
        closeDialog={closeDialog}
        action="edit"
        todo={todo}
      />
    );

    expect(screen.getByRole('heading')).toHaveTextContent(/edit/i);
    expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe(
      'Test dialog'
    );
  });

  it('should trigger close dialog on close button click', () => {
    const dialogRef = React.createRef<HTMLDialogElement>();
    const closeDialog = jest.fn();

    // prettier-ignore
    render(<Dialog dialogRef={dialogRef} closeDialog={closeDialog} action="add" />);

    fireEvent.click(screen.getByLabelText('close-dialog-btn'));

    expect(closeDialog).toHaveBeenCalled();
  });
});

describe('Integration testing with Dialog', () => {
  // Runs before each test case
  beforeEach(() => {
    /**
     * JSDOM (the DOM implementation used by React Testing Library and Jest) does not implement
     * the dialog element API — so showModal() and close() are not available during tests.
     * Therefore, we mock the methods using jest.fn()
     */
    HTMLDialogElement.prototype.showModal = jest.fn();
    HTMLDialogElement.prototype.close = jest.fn();

    renderApp(<TodoApp />);

    // Mount dialog by triggering add new todo button
    const button = screen.getByText(/Add New Todo/);
    fireEvent.click(button);
  });

  it('should render an input for todo entry', () => {
    // Assert input by placeholder text
    expect(
      screen.getByPlaceholderText(/Take a course in JS/)
    ).toBeInTheDocument();
  });

  it('should unmount after todo entry', async () => {
    // Type data into input
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, {
      target: {
        value: 'Open a pull request',
      },
    });

    // Assert input value
    expect(input.value).toBe('Open a pull request');

    // Submit
    fireEvent.keyUp(input, { charCode: 13, code: 13, key: 'Enter' });

    // Text cleared
    expect(input.value).toBe('');

    // Assert todo is rendered
    expect(screen.getByText('Open a pull request')).toBeInTheDocument();

    // Delay to unmount dialog in ms as defined in setTimeout
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
    });

    // Assert dialog unmounts
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('should unmount after clicking close button', async () => {
    fireEvent.click(screen.getByLabelText('close-dialog-btn'));

    // Delay to unmount dialog in ms as defined in setTimeout
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
    });

    // Assert dialog unmounts
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
