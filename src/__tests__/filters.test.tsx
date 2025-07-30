import { screen } from '@testing-library/react';
import { renderApp, renderWithStore, preloadedState } from '../testUtil';
import FilterTabs from '../components/filters/tabs';

describe('Filters', () => {
  it('has 3 tabs', () => {
    renderApp(<FilterTabs />);

    expect(screen.getAllByRole('link')).toHaveLength(3);
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('displays tab tags correctly', () => {
    renderWithStore(<FilterTabs />, {
      preloadedState: preloadedState,
    });

    expect(screen.getAllByRole('link')[0]).toHaveTextContent(/3/);
    expect(screen.getAllByRole('link')[1]).toHaveTextContent(/2/);
    expect(screen.getAllByRole('link')[2]).toHaveTextContent(/1/);
  });
});
