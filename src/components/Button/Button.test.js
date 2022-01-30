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
  test('renders learn react link and icon', () => {
    render(
      <Button onClick={onClickMock}>
        <FaBeer title="beer icon" />
        Test Button
      </Button>,
    );
    const buttonText = screen.getByText(/test button/i);
    const icon = screen.getByTitle('beer icon');
    expect(buttonText).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
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
