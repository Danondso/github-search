import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { act } from '@testing-library/react';
import UserDetails from './UserDetails';

import { userDetailsPayload, userDetailsReposPayload } from './__mocks__/payloads/UserDetails';

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

  test('Renders with required props', async () => {
    axios.get.mockReturnValueOnce({ data: userDetailsPayload });
    axios.get.mockReturnValueOnce({ data: userDetailsReposPayload });
    await act(async () => {
      ReactDOM.render(<UserDetails
        userUrl="http://locahost"
        reposUrl="http://locahost"
      />, container);
    });
    expect(container).toMatchSnapshot();
  });

  test('On Error, the user details displays the error', async () => {
    axios.get.mockReturnValueOnce(Promise.resolve(userDetailsPayload));
    axios.get.mockRejectedValueOnce({ message: 'Something awful happened upstairs' });
    await act(async () => {
      ReactDOM.render(<UserDetails
        userUrl="http://locahost"
        reposUrl="http://locahost"
      />, container);
    });
    expect(container).toMatchSnapshot();
  });
});
