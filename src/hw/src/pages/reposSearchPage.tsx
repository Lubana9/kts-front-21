import React from "react";

import Button from "@components/button/button";
import Input from "@components/input/input";
import RepoTile from "@components/repoTile";
import "./style.css";
import { useState } from "react";

const ReposSearchPage: React.FC = () => {
    const [input, isLoading] = useState<string | HTMLLIElement>('');
    const repoList = () => {
        isLoading(list =>list)
    }
    
    return (
      <>
        <div className="grid grid--1x2">
          <div className="input-group">
            <Input />{input}
            <Button />
          </div>
            </div>
            
            <div className="grid grid--1x3">
                <RepoTile />{repoList}
            </div>
      </>
    );
  };

export default ReposSearchPage;