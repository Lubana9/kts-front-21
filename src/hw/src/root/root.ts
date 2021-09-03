import { ApiResponse } from "../shared/store/ApiStore/types";
import GitHubStore from "../store/GitHubStore/GitHubStore";
import { RepoItem } from "../store/GitHubStore/types";

export const OrgName = () => {
  const gitHubStore = new GitHubStore();
const EXAMPLE_ORGANIZATION = "ktsstudio";
gitHubStore
  .getOrganizationReposList({
    organizaionName: EXAMPLE_ORGANIZATION,
  })
  .then((result: ApiResponse<RepoItem[], any>) => {
    if (result.success) {
      return result.data.map(rep => rep.name);
    }
  });
}

