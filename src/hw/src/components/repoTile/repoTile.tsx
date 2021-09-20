import React from "react";

import Avatar from "@components/avatar";
import "./style.css";
import StarIcon from "@components/starIcon/index";

import { RepoData } from "./types";

export type RepoTileProps = {
  repos: RepoData;
  onClick?: React.MouseEventHandler;
};
const RepoTile: React.FC<RepoTileProps> = ({ repos, onClick }) => {
  return (
    <div className="card card-primary">
      <Avatar letter={repos.name[0]} img={repos.avatar_url} />
      <div className="card-body">
        <h4 className="card-heading">{repos.name}</h4>
        <div className="card-link">
          {" "}
          <a className="card-link_txt " href="">
            {repos.owner.login}
          </a>
        </div>
        <div className="card-content ">
          <StarIcon />
          <span className="card-content_txt">
            {repos.stargazers_count}&ensp; {repos.updated_at}
          </span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(RepoTile);
