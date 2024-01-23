import { IconProps } from '@/types/props/IconProps';

const ChevronUpIcon = ({ className }: IconProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <path d='m18 15-6-6-6 6' />
    </svg>
  );
};

export default ChevronUpIcon;
