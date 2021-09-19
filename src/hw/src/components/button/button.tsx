import React, { Children } from "react";

import "./style.css";
type BtnProps = {
  onBtn: (value: MouseEvent) => any;
};
const Button: React.FC<BtnProps> = () => {
  return <button className="btn-search">{Children}</button>;
};

export default Button;
