import React, { Children } from "react";

import "./style.css";
type BtnProps = {
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
};
const Button: React.FC<BtnProps> = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className="btn-search">
      {children}
    </button>
  );
};

export default Button;
