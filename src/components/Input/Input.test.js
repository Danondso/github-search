import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';

const onChangeMock = jest.fn();
beforeEach(() => {
  onChangeMock.mockReset();
});

const placeholderText = 'Test Input';

describe('Input Test Suite', () => {
  test('Input is clickable', () => {
    render(
      <Input
        onChange={onChangeMock}
        placeholder={placeholderText}
      />,
    );
    const inputElement = screen.getByPlaceholderText(placeholderText);
    expect(inputElement).toBeInTheDocument();
  });

  test('onChangeMock is called when text is input', () => {
    render(
      <Input
        onChange={onChangeMock}
        placeholder={placeholderText}
      />,
    );
    const text = 'test';
    userEvent.type(screen.getByPlaceholderText(placeholderText), text);
    expect(onChangeMock.mock.calls[0][0].target.value).toEqual(text);
    expect(onChangeMock).toHaveBeenCalledTimes(4);
  });

  test('Text cannot be input when disabled', () => {
    render(
      <Input
        onChange={onChangeMock}
        placeholder={placeholderText}
        disabled
      />,
    );
    userEvent.type(screen.getByPlaceholderText(placeholderText), 'test');
    expect(onChangeMock).toHaveBeenCalledTimes(0);
  });
});
