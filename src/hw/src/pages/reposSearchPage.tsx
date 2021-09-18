import React, { useEffect, useState, createContext, useContext } from "react";
import RepoTile from "@components/repoTile";
import "./style.css";
import SearchIcon from "@components/searchIcon";
import { Link} from "react-router-dom";
import { RepoData } from "@components/repoTile/types";
import axios from "axios";
import PopUp from "@components/Popup";
import CardPopUp from "@components/CardPopUp";
import { routes } from "@config/configs";



 const repoContext = createContext({
  repos: []
 });
const Provider = repoContext.Provider;
export const useReposContext = () => useContext(repoContext);

type ReposContext = { list: RepoData[]; isLoading: boolean; load: () => void; }

const ReposSearchPage: React.FC = () => {
  const [repos, setRepos] = useState([]);
  const [allRepos, setAllRepos] = useState([]);
  const [branches, setBranches] = useState({});
 

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
  const searchRepos = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.toLowerCase();
    const filteredUsers = allRepos.filter((user:any) => (`${user.name}`
      .toLowerCase()
      .includes(value)
    ));
    setRepos(filteredUsers);
  }

    const getBranches = (reponame:any) => {
 
    let dat = axios
      .get(`https://api.github.com/repos/ktsstudio/${reponame}/branches`)
      .then(res => {
        setBranches(res.data);
      })
      console.log('data:', dat);
    }
  

  return (
    <>
      <div className="grid grid-1x2">
        <form className="input-group">
          <input type="text"
            className="input input-group_input"
            placeholder="Введите название организации"
            onChange={searchRepos}
          />
          <button className="btn-search" >
            <SearchIcon /></button>
        </form>
      </div>
      <Provider value={{repos}}>
        <div className="grid grid--1x3">
                 {repos.map((user:RepoData) => {
                   return <Link className="card-link_txt" to={routes.reposDetails.create(`${user.id}`)} onClick={getBranches}  key={user.id} >
                     <RepoTile repos={user} />
                     
                            </Link>
                 })
          }

       
        </div>
      

      </Provider>
    </>
  );
};


export default ReposSearchPage;
