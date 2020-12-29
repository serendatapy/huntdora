import React from 'react';
import { render } from '@testing-library/react';
import 'jest-canvas-mock'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

import App from './App';

test('renders welcome', () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>
  );
  // const textElement = screen.getByt(/Huntdora/i);
  // expect(textElement).toBeInTheDocument();
});