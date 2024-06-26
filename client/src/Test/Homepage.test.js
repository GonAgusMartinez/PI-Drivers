import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Homepage from '../Components/Homepage/Homepage';

describe('Homepage', () => {
  beforeEach(() => {
    render(
      <Router>
        <Homepage />
      </Router>
    );
  });

  it('should render the homepage title', () => {
    const titleElement = screen.getByText(/Drivers Homepage/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('should render the filter section', () => {
    const filterSection = screen.getByTestId('filter-section');
    expect(filterSection).toBeInTheDocument();
  });

  it('should render the list of drivers', () => {
    const driversList = screen.getByTestId('drivers-list');
    expect(driversList).toBeInTheDocument();
  });

  it('should render at least one driver card', async () => {
    const driverCard = await screen.findByTestId('driver-card');
    expect(driverCard).toBeInTheDocument();
  });
});