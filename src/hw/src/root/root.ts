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
    if (result.success) {
      console.log(result.data.map(rep => rep.name));
    }
    // eslint-disable-next-line no-console
    // в консоли появится список репозиториев в ktsstudio
  });
