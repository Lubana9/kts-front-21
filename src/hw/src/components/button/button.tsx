import React, { useState } from "react";

import SearchIcon from "@components/searchIcon";
import "./style.css";
type BtnProps = {
  onBtn: (value: MouseEvent) => any;
 }
const Button: React.FC<BtnProps> = () => {


  return (
    <button className="btn-search" >
      <SearchIcon />
    </button>
  );
};

export default Button;
