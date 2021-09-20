import React, { useEffect, useState, createContext, useContext } from "react";

import Button from "@components/button";
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getRepos = () => {
      setIsLoading(true);
      axios.get("https://api.github.com/orgs/ktsstudio/repos").then((res) => {
        setIsLoading(false);
        setRepos(res.data);
        setAllRepos(res.data);
      });
    };
    getRepos();
  }, []);
  const searchRepos = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.toLowerCase();
    const filteredUsers = allRepos.filter((user: any) =>
      `${user.name}`.toLowerCase().includes(value)
    );
    setRepos(filteredUsers);
  };

  const getDetails = (reponame: string) => {
    setIsLoading(true);
    axios
      .get(`https://api.github.com/repos/ktsstudio/${reponame}/branches`)
      .then((res) => {
        setIsLoading(false);
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
          <Button onClick={() => searchRepos}>
            <SearchIcon />
          </Button>
        </form>
      </div>
      <Provider value={{ repos }}>
        <div>
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
          </div>
          <div>
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
        </div>
      </Provider>
    </>
  );
};

export default ReposSearchPage;
