import React from "react";

import { ApiResponse } from "src/shared/store/ApiStore/types";
import { RepoItem } from "@store/GitHubStore/types";
import GitHubStore from "@store/GitHubStore/GitHubStore";
import "./style.css";
export type AvatarProps ={
    letter?: string;
}
const Avatar: React.FC<AvatarProps> = ({letter}) => {
    const image = process.env.PUBLIC_URL + '/img/logo.png';


//     const EXAMPLE_ORGANIZATION = "ktsstudio";
//     const gitHubStore = new GitHubStore();
//     letter = gitHubStore.getOrganizationReposList({
//         organizaionName: EXAMPLE_ORGANIZATION,
//     }).then((result: ApiResponse<RepoItem[], any>) => {
//         if (!image) {
//           console.log(result.data.map((repo: any) => repo.name[0]))
//         }})
        
    return (
        <div className="icon-container icon_content_txt icon-accent">{letter}

       <img className="icon-content_img" src={image} alt=''>          
              </img>
        </div>
     
    );
}

export default Avatar;