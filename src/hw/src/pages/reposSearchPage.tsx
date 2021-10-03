import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useMemo,
} from "react";

import Button from "@components/button";
import Input from "@components/input";
import RepoTile from "@components/repoTile";
import "./style.scss";
import { RepoData } from "@components/repoTile/types";
import SearchIcon from "@components/searchIcon";
import { routes } from "@config/configs";
import "antd/dist/antd.css";
import ReposListStore from "@store/GitHubStore";
import RepoBranchesStore from "@store/RepoBranchesStore";
import { Meta } from "@utils/Meta";
import { useLocalStore } from "@utils/UseLocalStore";
import { Drawer } from "antd";
import axios from "axios";
import { observer } from "mobx-react-lite";
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
  const [list, setList] = useState("");
  const githubStore = useLocalStore(() => new ReposListStore());
  const repoBranchStore = useLocalStore(() => new RepoBranchesStore());

  useEffect(() => {
    githubStore.getOrganizationReposList({
      organizaionName: "ktsstudio",
    });
  }, [githubStore]);

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

  const handelSearch = useMemo(() => {
    return (value: string) => {
      githubStore.setValue(value);
    };
  }, [githubStore]);

  return (
    <>
      <div className="grid grid-1x2">
        <form className="input-group">
          <Input value={githubStore.value} onChange={handelSearch} />
          <Button
            isLoading={githubStore.meta}
            onClick={() => {
              githubStore.getOrganizationReposList({
                organizaionName: githubStore.value,
              });
            }}
          >
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
