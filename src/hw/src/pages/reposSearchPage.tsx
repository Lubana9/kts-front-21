import React, { useEffect, useState, createContext, useContext } from "react";

import RepoTile from "@components/repoTile";
import "./style.css";
import { RepoData } from "@components/repoTile/types";
import SearchIcon from "@components/searchIcon";
import { routes } from "@config/configs";
import "antd/dist/antd.css";
import { Drawer } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
const repoContext = createContext({
  repos: [],
});
const Provider = repoContext.Provider;
export const useReposContext = () => useContext(repoContext);

type ReposContext = { list: RepoData[]; isLoading: boolean; load: () => void };

const ReposSearchPage: React.FC = () => {
  const [repos, setRepos] = useState([]);
  const [allRepos, setAllRepos] = useState([]);
  const [details, setDetails] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    (async () => {
      let userData;
      try {
        const response = await fetch(
          "https://api.github.com/orgs/ktsstudio/repos"
        );
        const userData: [] = await response.json();
        setAllRepos(userData);
        setRepos(userData);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        userData = [];
      }
    })();
  }, []);
  const searchRepos = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.toLowerCase();
    const filteredUsers = allRepos.filter((user: any) =>
      `${user.name}`.toLowerCase().includes(value)
    );
    setRepos(filteredUsers);
  };

  const getDetails = (reponame: string) => {
    axios
      .get(`https://api.github.com/repos/ktsstudio/${reponame}/branches`)
      .then((res) => {
        setDetails(res.data);
      });
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <div className="grid grid-1x2">
        <form className="input-group">
          <input
            type="text"
            className="input input-group_input"
            placeholder="Введите название организации"
            onChange={searchRepos}
          />
          <button className="btn-search">
            <SearchIcon />
          </button>
        </form>
      </div>
      <Provider value={{ repos }}>
        <div className="grid grid--1x3" onClick={showDrawer}>
          {repos.map((user: RepoData) => {
            return (
              <Link
                className="card-link_txt"
                to={routes.reposDetails.create(`${user.id}`)}
                onClick={() => getDetails(`${user.name}`)}
                key={user.id}
              >
                <RepoTile repos={user} />
              </Link>
            );
          })}

          <Drawer
            title="information"
            placement="right"
            onClose={onClose}
            visible={visible}
          >
            {details.map((branches: any) => {
              return (
                <div key={branches.sha}>
                  <div>
                    branches: <br /> {branches.name}
                  </div>
                </div>
              );
            })}
          </Drawer>
        </div>
      </Provider>
    </>
  );
};

export default ReposSearchPage;
