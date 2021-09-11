import React, { useState, useContext } from "react";
import Avatar from "@components/avatar/avatar";
import "./style.css";
import StarIcon from "@components/starIcon/index";
import { useReposContext } from "@pages/reposSearchPage";
import { repoData } from "./types";
import { useParams } from "react-router";
export type RepoTileProps = {
  repos: repoData
};
const RepoTile: React.FC<RepoTileProps> = ({repos}) => {
  const repoContext = useReposContext();

  return (


      <>
      <div  className="card card-primary">
        <Avatar letter={repos.name[0]} img={repos.avatar_url} />
        <div className="card-body">
          <h4 className="card-heading">{repos.name}</h4>
          <div className="card-link">
            {" "}
            <a className="card-link_txt " href= ''>
            {repos.owner.login}
            </a>
          </div>
          <div className="card-content ">
            <StarIcon />
            <span className="card-content_txt">
              
              {repos.stargazers_count }&ensp; {repos.updated_at}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(RepoTile);

