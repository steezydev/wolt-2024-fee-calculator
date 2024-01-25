import { TabsProps } from '@/types/props/TabsProps';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import TestRenderer from 'react-test-renderer';

import TabsPanel from './TabsPanel';
import TabsTab from './TabsTab';

// TabsPanel and TabsTab are not covered due to being proxy components with no rendering logic

export const tabsRenderTests = (name: string, Tabs: React.FC<TabsProps>) => {
  describe(name, () => {
    describe('when asked to render without children', () => {
      it('renders without children', () => {
        const component = TestRenderer.create(<Tabs></Tabs>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('when asked to render with children', () => {
      it('renders with children', () => {
        const component = TestRenderer.create(
          <Tabs>
            <TabsTab id='tab1Button' ariaLabel='Tab 1 label' value='tab1'>
              Tab 1
            </TabsTab>
            <TabsPanel value='tab1'>Panel 1 </TabsPanel>
            <TabsTab id='tab2Button' ariaLabel='Tab 2 label' value='tab2'>
              Tab 2
            </TabsTab>
            <TabsPanel value='tab2'>Panel 2</TabsPanel>
          </Tabs>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('when asked to render with additional class', () => {
      it('renders with additional class', () => {
        const component = TestRenderer.create(
          <Tabs className='some-class'>
            <TabsTab id='tab1Button' ariaLabel='Tab 1 label' value='tab1'>
              Tab 1
            </TabsTab>
            <TabsPanel value='tab1'>Panel 1 </TabsPanel>
            <TabsTab id='tab2Button' ariaLabel='Tab 2 label' value='tab2'>
              Tab 2
            </TabsTab>
            <TabsPanel value='tab2'>Panel 2</TabsPanel>
          </Tabs>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('when asked to render', () => {
      it('first tab is active and first panel is visible', () => {
        render(
          <Tabs className='some-class'>
            <TabsTab id='tab1Button' ariaLabel='Tab 1 label' value='tab1'>
              Tab 1
            </TabsTab>
            <TabsPanel value='tab1'>Panel 1</TabsPanel>
            <TabsTab id='tab2Button' ariaLabel='Tab 2 label' value='tab2'>
              Tab 2
            </TabsTab>
            <TabsPanel value='tab2'>Panel 2</TabsPanel>
          </Tabs>
        );

        expect(screen.getByLabelText('Tab 1 label')).toHaveClass(
          'bg-primary-300'
        );

        expect(screen.getByText('Panel 1')).toHaveClass('block');

        expect(screen.getByText('Panel 2')).toHaveClass('hidden');
      });
    });
  });
};

export const tabsEventTests = (name: string, Tabs: React.FC<TabsProps>) => {
  describe(name, () => {
    describe('when second tab is clicked', () => {
      it('second panel is shown', () => {
        render(
          <Tabs className='some-class'>
            <TabsTab id='tab1Button' ariaLabel='Tab 1 label' value='tab1'>
              Tab 1
            </TabsTab>
            <TabsPanel value='tab1'>Panel 1</TabsPanel>
            <TabsTab id='tab2Button' ariaLabel='Tab 2 label' value='tab2'>
              Tab 2
            </TabsTab>
            <TabsPanel value='tab2'>Panel 2</TabsPanel>
          </Tabs>
        );

        const tab2Button = screen.getByLabelText('Tab 2 label');
        fireEvent.click(tab2Button);

        expect(screen.getByLabelText('Tab 2 label')).toHaveClass(
          'bg-primary-300'
        );

        expect(screen.getByText('Panel 1')).toHaveClass('hidden');

        expect(screen.getByText('Panel 2')).toHaveClass('block');
      });
    });
  });
};
