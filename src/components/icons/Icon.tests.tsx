import { IconProps } from '@/types/props/IconProps';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import TestRenderer from 'react-test-renderer';

export const iconRenderTests = (name: string, Icon: React.FC<IconProps>) => {
  describe(name, () => {
    describe('when asked to render', () => {
      it('matches snapshot', () => {
        const component = TestRenderer.create(<Icon />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('has aria-hidden true', () => {
        const { container } = render(<Icon />);

        expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
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
