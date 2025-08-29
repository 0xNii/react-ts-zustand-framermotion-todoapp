import React from 'react';
import { render } from '@testing-library/react';
import TodoInput from '../components/input';
import userEvent from '@testing-library/user-event';

describe('TodoInput', () => {
  it('renders with a placeholder', async () => {
    const ref = React.createRef<HTMLInputElement>();
    const keyUp = jest.fn();

    render(
      <TodoInput
        ref={ref}
        placeholder="eg. Take a course in JS"
        onKeyUp={keyUp}
      />
    );

    expect(ref.current).not.toBeNull();
    expect(ref.current?.placeholder).toMatch(/Take a course in JS/);
  });

  it('calls event handler properly', async () => {
    const ref = React.createRef<HTMLInputElement>();
    const keyUp = jest.fn();

    render(
      <TodoInput
        ref={ref}
        placeholder="eg. Take a course in JS"
        onKeyUp={keyUp}
      />
    );

    const user = userEvent.setup();
    await user.clear(ref.current!);
    await user.type(ref.current!, 'Open a pull request{enter}');

    expect(keyUp).toHaveBeenCalled();
  });
});
