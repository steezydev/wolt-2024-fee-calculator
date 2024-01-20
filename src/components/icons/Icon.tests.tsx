import { IconProps } from '@/types/props/IconProps';
import React from 'react';
import TestRenderer from 'react-test-renderer';

export const iconRenderTests = (name: string, Icon: React.FC<IconProps>) => {
  describe(name, () => {
    describe('when asked to render', () => {
      it('renders', () => {
        const component = TestRenderer.create(<Icon />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('when asked to render with additional class', () => {
      it('renders with additional class', () => {
        const component = TestRenderer.create(<Icon className='some-class' />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
};
