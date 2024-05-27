import React from "react";

type ButtonProps = {
  className: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
  text: string;
};

const Button: React.FC<ButtonProps> = (props) => {
  const { className, onClick, disabled, text } = props;
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      Previous
    </button>
  );
};

export default Button;
