import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card, CardContent, CardHeader } from './Card';

describe('Card Test Suite', () => {
  test('renders card with children', () => {
    render(
      <Card>
        I am text!
      </Card>,
    );
    const card = screen.getByText('I am text!');
    expect(card).toBeInTheDocument();
  });

  test('renders CardHeader with headerText', () => {
    render(
      <Card>
        <CardHeader headerText="Test" />
      </Card>,
    );
    const cardHeader = screen.getByText('Test');
    expect(cardHeader).toBeInTheDocument();
  });

  test('renders CardContent with children', () => {
    render(
      <Card>
        <CardHeader headerText="Test" />
        <CardContent contentStyle={{ color: 'pink' }}>
          <div>I am card content!</div>
        </CardContent>
      </Card>,
    );
    const cardContent = screen.getByText('I am card content!');
    expect(cardContent).toBeInTheDocument();
  });
});
