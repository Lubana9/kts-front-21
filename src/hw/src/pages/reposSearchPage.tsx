import React, { useEffect, useState, createContext, useContext } from "react";

import Button from "@components/button";
import RepoTile from "@components/repoTile";
import "./style.css";
import { RepoData } from "@components/repoTile/types";
import SearchIcon from "@components/searchIcon";
import { routes } from "@config/configs";
import "antd/dist/antd.css";
import ReposListStore from "@store/GitHubStore";
import RepoBranchesStore from "@store/RepoBranchesStore";
import { Meta } from "@utils/Meta";
import { UseLocalStore } from "@utils/UseLocalStore";
import { Drawer } from "antd";
import axios from "axios";
import { observer, useLocalStore } from "mobx-react-lite";
import { Link } from "react-router-dom";
const repoContext = createContext({
  repos: [],
});
const Provider = repoContext.Provider;
export const useReposContext = () => useContext(repoContext);

type ReposContext = { list: RepoData[]; isLoading: boolean; load: () => void };

const ReposSearchPage: React.FC = () => {
  const [details, setDetails] = useState([]);
  const [visible, setVisible] = useState(false);
  const [list, setList] = useState([]);
  const githubStore = useLocalStore(() => new ReposListStore());
  const repoBranchStore = UseLocalStore(() => new RepoBranchesStore());

  // eslint-disable-next-line no-console
  console.log("is rendred");
  useEffect(() => {
    githubStore.getOrganizationReposList({
      organizaionName: "ktsstudio",
    });
  }, [githubStore]);

  const searchRepos = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.toLowerCase();
    const filteredUsers = githubStore.list.filter((user: any) =>
      `${user.name}`.toLowerCase().includes(value)
    );
    githubStore.setList(filteredUsers);
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
          <Button onClick={() => searchRepos}>
            <SearchIcon />
          </Button>
        </form>
      </div>

      <div>
        {githubStore.meta === Meta.loading}
        <div className="grid grid--1x3" onClick={showDrawer}>
          {githubStore.list.map((user) => {
            return (
              <Link
                className="card-link_txt"
                to={routes.reposDetails.create(`${user.id}`)}
                onClick={() => getDetails(`${user.name}`)}
              >
                <RepoTile key={user.id} repos={user} />
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
                  branches: <br /> {branches.name}
                </div>
              );
            })}
          </Drawer>
        </div>
      </div>
    </>
  );
};

export default observer(ReposSearchPage);
