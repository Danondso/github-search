import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { act } from '@testing-library/react';
import Search from './Search';

import searchPayload from './__mocks__/payloads/Search';

jest.mock('axios');

describe('UserDetails Test Suite', () => {
  // the entire container setup to render this is lifted from https://reactjs.org/docs/testing-recipes.html#act
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  test('Renders correctly', async () => {
    axios.get.mockReturnValueOnce({ data: searchPayload });
    await act(async () => {
      ReactDOM.render(<Search />, container);
    });
    expect(container).toMatchSnapshot();
  });
});
