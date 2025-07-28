import { screen, fireEvent } from '@testing-library/react';
import { renderApp } from '../testUtil';
import Header from '../components/header';

describe('Header', () => {
  it('renders a dialog', () => {
    renderApp(<Header />);

    const button = screen.getByText(/Add New Todo/);
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
