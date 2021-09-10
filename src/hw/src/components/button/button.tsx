import React, { useState } from "react";

import SearchIcon from "@components/searchIcon";
import "./style.css";
type btnProps = {
  onBtn: (value: MouseEvent) => any;
 }
const Button: React.FC<btnProps> = () => {


  return (
    <button className="btn-search" >
      <SearchIcon />
    </button>
  );
};

export default Button;
