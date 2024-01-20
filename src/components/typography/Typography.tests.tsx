import React from 'react';
import TestRenderer from 'react-test-renderer';
import { TypographyProps } from '~/types/props/TypographyProps';

export const typographyRenderTests = (
  name: string,
  Text: React.FC<TypographyProps>
) => {
  describe(name, () => {
    describe('when asked to render ', () => {
      it('renders', () => {
        const component = TestRenderer.create(
          <Text>Hello world!</Text>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('when asked to render with additional class ', () => {
      it('renders with additional class', () => {
        const component = TestRenderer.create(
          <Text className='some-class'>Hello world!</Text>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
};
