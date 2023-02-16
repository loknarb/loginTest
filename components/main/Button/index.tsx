import React from "react";

interface ButtonProps {
  name?: string;
}

const Button = ({ name }: ButtonProps) => {
  return (
    <button className="btn btn-ghost normal-case text-xl" type="button">
      {name || "default props"}
    </button>
  );
};

export default Button;
