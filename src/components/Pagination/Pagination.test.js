import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from './Pagination';

const handlePaginateMock = jest.fn();
beforeEach(() => {
  handlePaginateMock.mockReset();
});

describe('Pagination Test Suite', () => {
  test('Renders with required props', () => {
    render(
      <Pagination
        handlePaginate={handlePaginateMock}
        totalPages={120}
      />,
    );
    const inputElement = screen.getByText('>>>');
    expect(inputElement).toMatchSnapshot();
  });

  test('Next and Previous clicks trigger the handlePaginateFunction', () => {
    render(
      <Pagination
        handlePaginate={handlePaginateMock}
        totalPages={120}
      />,
    );
    userEvent.click(screen.getByText('>>>'));
    userEvent.click(screen.getByText('<<<'));
    expect(handlePaginateMock).toHaveBeenCalledTimes(2);
  });
});
