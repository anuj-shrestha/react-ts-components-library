import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Button, ButtonProps } from './Button';

import { expect } from '@storybook/jest';

const defaultProps: ButtonProps = {
  children: 'Button Text',
  onClick: jest.fn()
};

describe('<Button />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Rendering test
  test('renders with default props', () => {
    const { getByText } = render(<Button {...defaultProps} />);
    const button = getByText('Button Text');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('pro-btn');
  });

  // Props test
  test('renders different sizes and variants', () => {
    const { getByText } = render(<Button {...defaultProps} size="compact" variant="secondary" />);
    const button = getByText('Button Text');
    expect(button).toHaveClass('pro-btn--compact');
    expect(button).toHaveClass('pro-btn--secondary');
  });

  test('renders an <a> tag when isLink prop is true', () => {
    const { container } = render(<Button type="link" />);
    const anchorElement = container.querySelector('a');
    expect(anchorElement).toBeInTheDocument();
  });

  // Interaction test
  test('simulates click interaction', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });

  test('does not call onClick when button is disabled', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(
      <Button onClick={handleClick} disabled>
        Click Me
      </Button>
    );

    fireEvent.click(getByRole('button'));

    // Verify that handleClick is not called
    expect(handleClick).not.toHaveBeenCalled();
  });
});
