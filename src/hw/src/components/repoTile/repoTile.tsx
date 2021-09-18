import React, { useState } from "react";

import Avatar from "@components/avatar/avatar";
import { RepoItem } from "@store/GitHubStore/types";
import "./style.css";
import StarIcon from "@components/starIcon/index";
import GitHubStore from "@store/GitHubStore";

export type RepoTileProps = {
  item?: RepoItem;
  userData: any;
};
const RepoTile: React.FC<RepoTileProps> = ({userData}) => {
 
  return (


      <>
      <div  className="card card-primary">
        <Avatar letter={userData.name[0]} img={userData.avatar_url} />
        <div className="card-body">
          <h4 className="card-heading">{userData.name}</h4>
          <div className="card-link">
            {" "}
            <a className="card-link_txt " href= ''>
            {userData.owner.login}
            </a>
          </div>
          <div className="card-content ">
            <StarIcon />
            <span className="card-content_txt">
              
              {userData.stargazers_count }&ensp; {userData.updated_at}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(RepoTile);

