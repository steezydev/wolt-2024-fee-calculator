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
      it('matches snapshot', () => {
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

      it('renders with children', () => {
        render(
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

        expect(screen.getByLabelText('Tab 1 label')).toBeInTheDocument();
        expect(screen.getByLabelText('Tab 2 label')).toBeInTheDocument();
        expect(screen.getByText('Panel 1')).toBeInTheDocument();

        expect(screen.getByLabelText('Tab 1 label')).toHaveAttribute(
          'aria-selected',
          'true'
        );
      });
    });

    describe('when asked to render with additional class', () => {
      it('matches the snapshot', () => {
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

      it('renders with additional class', () => {
        const { container } = render(
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

        expect(container.firstChild).toHaveClass('some-class');
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

        expect(screen.getByLabelText('Tab 2 label')).toHaveAttribute(
          'aria-selected',
          'true'
        );

        expect(screen.getByText('Panel 2')).toBeInTheDocument();
      });
    });
  });
};
