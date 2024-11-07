import React from 'react';
import { ThemeProvider } from 'styled-components';
import MergeSortVisualizer from './components/MergeSortVisualizer';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <MergeSortVisualizer />
    </ThemeProvider>
  );
}

export default App;