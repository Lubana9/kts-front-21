import Button from "@components/button";
import GitHubStore from "@store/GitHubStore";
import { RepoItem } from "@store/GitHubStore/types";
import React from "react";
import { useState } from "react";
import { ApiResponse } from "src/shared/store/ApiStore/types";
import "./style.css";
import axios from "axios";

export type inputProps = {
  value: string;
  onChange: (value:string) => void;
}
const Input: React.FC<inputProps> = () => {
  const [value, onChange] = useState<string>("");
 
  const handelChange = (e: React.FormEvent<HTMLInputElement>) => {

    onChange(e.currentTarget.value);
  };



  return (
    <input
      className="input input-group_input"
      value={value}
      placeholder="Введите название организации"
      onChange={handelChange}
    >
    </input>
  );
};

export default React.memo(Input);