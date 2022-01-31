import React from 'react';
import { FaBeer } from 'react-icons/fa';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

const onClickMock = jest.fn();
beforeEach(() => {
  onClickMock.mockReset();
});

describe('Button Test Suite', () => {
  test('renders button with link and icon', () => {
    render(
      <Button onClick={onClickMock}>
        <FaBeer title="beer icon" />
        Test Button
      </Button>,
    );
    const button = screen.getByText(/test button/i);
    expect(button).toMatchSnapshot();
  });

  test('button is clickable', () => {
    render(
      <Button onClick={onClickMock}>
        <FaBeer title="beer icon" />
        Test Button
      </Button>,
    );
    userEvent.click(screen.getByTitle('beer icon'));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test('button is not clickable when disabled', () => {
    render(
      <Button onClick={onClickMock} disabled>
        <FaBeer title="beer icon" />
        Test Button
      </Button>,
    );
    userEvent.click(screen.getByTitle('beer icon'));
    expect(onClickMock).toHaveBeenCalledTimes(0);
  });
});
