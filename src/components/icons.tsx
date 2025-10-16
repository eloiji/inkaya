import React from 'react';
import { twMerge } from 'tailwind-merge';

type IconProps = React.SVGProps<SVGSVGElement>;

export const CloseIcon = (props: IconProps) => {
  const { className, ...restProps } = props;
  return (
    <svg
      className={twMerge('w-6 h-6', className)}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
  );
};

export const MenuIcon = (props: IconProps) => {
  const { className, ...restProps } = props;
  return (
    <svg
      className={twMerge('w-6 h-6', className)}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
    </svg>
  );
};