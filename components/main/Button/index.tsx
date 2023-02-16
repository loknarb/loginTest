import React from "react";

interface ButtonProps {
  name?: string;
}

const Button = ({ name }: ButtonProps) => {
  return <button type="button">{name || "default props"}</button>;
};

export default Button;
