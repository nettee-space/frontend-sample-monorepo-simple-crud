'use client';

import { MouseEventHandler } from 'react';

interface ButtonProps {
  divClassName?: string;
  buttonClassName?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

const Button = ({
  divClassName = '',
  buttonClassName = '',
  onClick,
  children,
}: ButtonProps) => {
  return (
    <div className={divClassName}>
      <button onClick={onClick} className={buttonClassName}>
        {children}
      </button>
    </div>
  );
};

export { Button };
