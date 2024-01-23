import { classNames } from '@/helpers/classNames';
import { TabsPanelProps } from '@/types/props/TabsPanelProps';

const Panel = ({ children, className }: TabsPanelProps) => {
  return <div className={classNames('p-4', className)}>{children}</div>;
};

export default Panel;
