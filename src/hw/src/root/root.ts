import { ApiResponse } from "../shared/store/ApiStore/types";
import GitHubStore from "../store/GitHubStore/GitHubStore";
import { RepoItem } from "../store/GitHubStore/types";
const gitHubStore = new GitHubStore();
const EXAMPLE_ORGANIZATION = "ktsstudio";
gitHubStore
  .getOrganizationReposList({
    organizaionName: EXAMPLE_ORGANIZATION,
  })
  .then((result: ApiResponse<RepoItem[], any>) => {
    // eslint-disable-next-line no-console
    console.log(result); // в консоли появится список репозиториев в ktsstudio
  });
