import { screen, fireEvent, act } from '@testing-library/react';
import TodoApp from '../components/TodoApp';
import { renderApp } from '../testUtil';

describe('Dialog', () => {
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

    // Delay to unmount dialog in ms as defined in setTimeout
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
    });

    // Assert dialog unmounts
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should unmount after clicking close button', async () => {
    fireEvent.click(screen.getByLabelText('close-dialog-btn'));

    // Delay to unmount dialog in ms as defined in setTimeout
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
    });

    // Assert dialog unmounts
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should unmount on light dismiss', async () => {
    fireEvent.click(screen.getByRole('dialog'));

    // Delay to unmount dialog in ms as defined in setTimeout
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    });

    // Assert dialog unmounts
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
