import React, { useEffect, useState } from "react";
import RepoTile from "@components/repoTile";
import "./style.css";
import SearchIcon from "@components/searchIcon";


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
      <div className="grid grid--1x2">
        <div className='input-group'>
          <input type="text"
            className="input input-group_input"
            placeholder="Введите название организации"
            onChange={handelFilter}
          />
          <button className="btn-search" type='submit'  >
          <SearchIcon />
          </button>
        </div>
      </div>

      <div className= "grid grid--1x3">
  {repos.map((user:any, id:number) => {
       return  <RepoTile userData={user} key= {id}  />
  })
        }
      </div>
    </>
  );
};


export default ReposSearchPage;
