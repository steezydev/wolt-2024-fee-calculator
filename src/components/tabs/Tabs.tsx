import { classNames } from '@/helpers/classNames';
import { TabsPanelProps } from '@/types/props/TabsPanelProps';
import { TabsProps } from '@/types/props/TabsProps';
import { TabsTabProps } from '@/types/props/TabsTabProps';
import React, { ReactElement, useEffect, useState } from 'react';

import ButtonUnstyled from '../button/ButtonUnstyled';
import Panel from './TabsPanel';
import Tab from './TabsTab';

const Tabs = ({ children, className }: TabsProps) => {
  const [activeTab, setActiveTab] = useState<string>('');

  useEffect(() => {
    const filteredChildren = React.Children.toArray(children).filter(
      React.isValidElement
    );
    const firstTab = filteredChildren.find(
      (child) => (child as ReactElement).type === Tab
    ) as ReactElement<TabsTabProps>;

    if (firstTab) {
      setActiveTab(firstTab.props.value);
    }
  }, []);

  const tabs = React.Children.toArray(children).filter(
    (child) =>
      React.isValidElement(child) && (child as ReactElement).type === Tab
  );
  const panels = React.Children.toArray(children).filter(
    (child) =>
      React.isValidElement(child) && (child as ReactElement).type === Panel
  );

  return (
    <div className={classNames('flex flex-col', className)}>
      <div className='flex w-full rounded-xl'>
        {tabs.map((tab, index) => (
          <ButtonUnstyled
            id={(tab as ReactElement<TabsTabProps>).props.id}
            ariaLabel={(tab as ReactElement<TabsTabProps>).props.ariaLabel}
            key={index}
            className={classNames(
              'py-1 px-4 w-full ',
              index === 0 ? 'rounded-l-xl' : '',
              index === tabs.length - 1 ? 'rounded-r-xl' : '',
              activeTab === (tab as ReactElement<TabsTabProps>).props.value
                ? 'bg-primary-300 text-white'
                : 'bg-primary-100 hover:bg-primary-300/80 hover:text-white text-black dark:text-white'
            )}
            onClick={() =>
              setActiveTab((tab as ReactElement<TabsTabProps>).props.value)
            }
          >
            {(tab as ReactElement<TabsTabProps>).props.children}
          </ButtonUnstyled>
        ))}
      </div>
      <div className='flex-grow'>
        {panels.map((panel, index) => (
          <div
            className={classNames(
              'h-full',
              (panel as ReactElement<TabsPanelProps>).props.className
            )}
            key={index}
            style={{
              display:
                (panel as ReactElement<TabsPanelProps>).props.value ===
                activeTab
                  ? 'block'
                  : 'none',
            }}
          >
            {(panel as ReactElement<TabsPanelProps>).props.children}
          </div>
        ))}
      </div>
    </div>
  );
};

export { Tabs, Tab, Panel };
