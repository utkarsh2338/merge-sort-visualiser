import { render, screen } from '@testing-library/react';
import App from './App';

test('renders merge sort visualizer', () => {
  render(<App />);
  const titleElement = screen.getByText(/Merge Sort Visualizer/i);
  expect(titleElement).toBeInTheDocument();
});