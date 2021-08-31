import React from "react";

import SatrIcon from "@components/starIcon/index";
import { RepoItem } from "@store/GitHubStore/types";
import Avatar from "@components/avatar/avatar";
import "./style.css"


export type RepoTileProps = {
    item: RepoItem,
}
const RepoTile: React.FC<RepoItem> = (item) => {
    
    const handelClick = () => {
        console.log('clicked');
    }

    const handelName = () => {
        return item.name
    }
    return (
        <>
        <div
            onClick={handelClick}
            className="card card-primary">
            <Avatar />
            <div className="card-body">
                <h4 className="card-heading">{handelName }</h4>
                <div className="card-link"> <a className="card-link_txt " href="#">kts</a></div>
                <div className="card-content ">
                    <SatrIcon />
                    <span className="card-content_txt"> `${} &ensp; ${}` </span>
                </div>
            </div>
        </div>
    </>);
}

export default RepoTile;