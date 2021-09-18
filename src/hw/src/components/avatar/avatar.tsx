import React from "react";
import "./style.css";
 type AvatarProps ={
    letter: string;
    img?: string;
}
const Avatar: React.FC<AvatarProps> = ({letter}) => {
    const image = process.env.PUBLIC_URL + '/img/logo.png';

        
    return (
        <div className="icon-container icon_content_txt icon-accent">

       <img className="icon-content_img" src={image} alt={letter}>          
              </img>
        </div>
     
    );
}

export default React.memo(Avatar);