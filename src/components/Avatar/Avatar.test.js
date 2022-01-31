import React from 'react';
import { FaBeer } from 'react-icons/fa';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Avatar from './Avatar';

const onClickMock = jest.fn();
beforeEach(() => {
  onClickMock.mockReset();
});

const testImageUrl = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.distractify.com%2Fbrand-img%2FEm7U9Ugzx%2F0x0%2Fscreen-shot-2020-06-18-at-74312-pm-1592527404184.png&f=1&nofb=1';

describe('Avatar Test Suite', () => {
  test('renders avatar with all required props', () => {
    render(
      <Avatar imageSrc={testImageUrl} altText="Test Image" />,
    );
    const image = screen.getByAltText('Test Image');
    expect(image).toBeInTheDocument();
  });
});
