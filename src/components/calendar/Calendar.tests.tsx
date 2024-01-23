import { CalendarProps } from '@/types/props/CalendarProps';
import React from 'react';
import TestRenderer from 'react-test-renderer';

export const calendarRenderTests = (
  name: string,
  Calendar: React.FC<CalendarProps>
) => {
  describe(name, () => {
    describe('when asked to render', () => {
      it('renders', () => {
        const component = TestRenderer.create(<Calendar />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('when asked to render with week starting on Tuesday', () => {
      it('renders with week starting on Tuesday', () => {
        const component = TestRenderer.create(<Calendar weekStartsOn={2} />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('when asked to render without outside dates', () => {
      it('renders without outside dates', () => {
        const component = TestRenderer.create(
          <Calendar showOutsideDays={false} />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('when asked to render with additional class', () => {
      it('renders with additional class', () => {
        const component = TestRenderer.create(
          <Calendar className='some-class' />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
};
