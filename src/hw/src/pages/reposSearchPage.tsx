import React, { useEffect, useState, createContext, useContext } from "react";
import RepoTile from "@components/repoTile";
import "./style.css";
import SearchIcon from "@components/searchIcon";
import { Link, useParams } from "react-router-dom";
import { repoData } from "@components/repoTile/types";

 const repoContext = createContext({
  repos: []
 });
const Provider = repoContext.Provider;
export const useReposContext = () => useContext(repoContext);

type ReposContext = { list: repoData[]; isLoading: boolean; load: () => void; }

const ReposSearchPage: React.FC = () => {
  const [repos, setRepos] = useState([]);
  const [allRepos, setAllRepos] = useState([]);
  


  useEffect(() => {
    (
      async () => {
        let userData;
        try {
          const response = await fetch('https://api.github.com/orgs/ktsstudio/repos');
          const userData: [] = await response.json();
          setAllRepos(userData);
          setRepos(userData);
        }
        catch (e) {
          console.log(e);
          userData = [];
  
        }
        
      }
    )();
  }, []);
  const handelFilter = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.toLowerCase();
    const filteredUsers = allRepos.filter((user:any) => (`${user.name}`
      .toLowerCase()
      .includes(value)
    ));
    setRepos(filteredUsers);
  }


        
  return (
    <>
      <div className="grid grid-1x2">
        <div className="input-group">
          <input type="text"
            className="input input-group_input"
            placeholder="Введите название организации"
            onChange={handelFilter}
          />
          <button className="btn-search" type='submit'  >  <SearchIcon /></button>
        </div>
      </div>
      <Provider value={{repos}}>
        <div className="grid grid--1x3">
                 {repos.map((user:any) => {
                   return <Link className="card-link_txt" to={`/repos/${user.id}`}> <RepoTile repos={user} key= {user.id}  /> </Link>
          })
          }</div>
      </Provider>
    </>
  );
};


export default ReposSearchPage;
