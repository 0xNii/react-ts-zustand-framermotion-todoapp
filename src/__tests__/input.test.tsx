import React from 'react';
import { render } from '@testing-library/react';
import TodoInput from '../components/input';

describe('TodoInput', () => {
  it('renders with a placeholder', () => {
    const ref = React.createRef<HTMLInputElement>();

    render(<TodoInput ref={ref} placeholder="eg. Take a course in JS" />);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.placeholder).toMatch(/Take a course in JS/);
  });
});
