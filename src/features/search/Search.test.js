import React from 'react';
import ReactDOM from 'react-dom';
import { act } from '@testing-library/react';
import Search from './Search';

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
    await act(async () => {
      ReactDOM.render(<Search />, container);
    });
    expect(container).toMatchSnapshot();
  });

  // I had a bit of trouble with re-rendering so I'm calling out the missed case here
  // I didn't get the userEvent.type to work with the input
  // so I never got a snapshot test rendering correctly
  // for when data is returned from the API call..
});
