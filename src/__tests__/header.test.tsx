import { screen, fireEvent } from '@testing-library/react';
import { renderApp } from '../testUtil';
import Header from '../components/header';

describe('Header', () => {
  beforeEach(() => {
    renderApp(<Header />);
  });

  it('displays a heading and date', () => {
    expect(screen.getByText(/Today's Todos/)).toBeInTheDocument();
    expect(screen.getByLabelText('date')).toBeInTheDocument();
  });

  it('has a button which renders a dialog on click', () => {
    const button = screen.getByRole('button', { name: /Add New Todo/ });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
