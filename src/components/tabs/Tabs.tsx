import ButtonUnstyled from '@/components/button/ButtonUnstyled';
import { classNames } from '@/helpers/classNames';
import { TabsPanelProps } from '@/types/props/TabsPanelProps';
import { TabsProps } from '@/types/props/TabsProps';
import { TabsTabProps } from '@/types/props/TabsTabProps';
import React, { ReactElement, useMemo, useState } from 'react';

import Panel from './TabsPanel';
import Tab from './TabsTab';

const Tabs = ({ children, className }: TabsProps) => {
  const tabsAndPanels = useMemo(() => {
    const tabs: ReactElement<TabsTabProps>[] = [];
    const panels: ReactElement<TabsPanelProps>[] = [];
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        if (child.type === Tab) {
          tabs.push(child as ReactElement<TabsTabProps>);
        } else if (child.type === Panel) {
          panels.push(child as ReactElement<TabsPanelProps>);
        }
      }
    });
    return { tabs, panels };
  }, [children]);

  const [activeTab, setActiveTab] = useState<string>(
    tabsAndPanels.tabs[0]?.props.value || ''
  );

  const handleTabClick = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className={classNames('flex flex-col', className)}>
      <div className='flex w-full rounded-xl'>
        {tabsAndPanels.tabs.map((tab, index) => (
          <ButtonUnstyled
            id={tab.props.id}
            ariaLabel={tab.props.ariaLabel}
            key={tab.props.id || index}
            className={classNames(
              'py-1 px-4 w-full',
              index === 0 ? 'rounded-l-xl' : '',
              index === tabsAndPanels.tabs.length - 1 ? 'rounded-r-xl' : '',
              activeTab === tab.props.value
                ? 'bg-primary-300 text-white'
                : 'bg-primary-100 hover:bg-primary-300/80 hover:text-white text-black dark:text-white',
              tab.props.className
            )}
            onClick={() => handleTabClick(tab.props.value)}
          >
            {tab.props.children}
          </ButtonUnstyled>
        ))}
      </div>
      <div>
        {tabsAndPanels.panels.map((panel, index) => (
          <div
            className={classNames(
              'h-full',
              activeTab === panel.props.value ? 'block' : 'hidden',
              panel.props.className
            )}
            key={panel.props.value || index}
          >
            {panel.props.children}
          </div>
        ))}
      </div>
    </div>
  );
};

Tabs.Panel = Panel;
Tabs.Tab = Tab;

export default Tabs;
