import { TypographyProps } from '@/types/props/TypographyProps';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import TestRenderer from 'react-test-renderer';

export const typographyRenderTests = (
  name: string,
  Text: React.FC<TypographyProps>
) => {
  describe(name, () => {
    describe('when asked to render ', () => {
      it('matches snapshot', () => {
        const component = TestRenderer.create(<Text>Hello world!</Text>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('renders correctly', () => {
        render(<Text>Hello world!</Text>);

        expect(screen.getByText('Hello world!')).toBeInTheDocument();
      });
    });

    describe('when asked to render with additional class ', () => {
      it('matches snapshot', () => {
        const component = TestRenderer.create(
          <Text className='some-class'>Hello world!</Text>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('renders with additional class', () => {
        render(<Text className='some-class'>Hello world!</Text>);

        expect(screen.getByText('Hello world!')).toHaveClass('some-class');
      });
    });
  });
};
