import React from "react";

import SearchIcon from "@components/searchIcon";
import "./style.css";

const Button: React.FC = () => {
  const handelClick = () => {
    // eslint-disable-next-line no-console
    console.log("clicked");
  };
  return (
    <button className="btn-search" disabled onClick={handelClick}>
      <SearchIcon />
    </button>
  );
};

export default Button;
