import React from "react";

import "./style.scss";
import logo from "./logo.png";
type AvatarProps = {
  letter: string;
  img?: string;
};
const Avatar: React.FC<AvatarProps> = ({ letter }) => {
  return (
    <div className="icon-container icon_content_txt ">
      <img className="icon-content_img" src={logo} alt={letter}></img>
    </div>
  );
};

export default React.memo(Avatar);
