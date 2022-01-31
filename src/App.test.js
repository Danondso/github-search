import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders search component', () => {
  render(<App />);
  const linkElement = screen.getByText('Search Github Users');
  expect(linkElement).toBeInTheDocument();
});
