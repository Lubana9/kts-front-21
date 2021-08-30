import ApiStore from "../../shared/store/ApiStore";
import { ApiResponse, HTTPMethod } from "../../shared/store/ApiStore/types";
import {
  GetOrganizationReposListParams,
  IGitHubStore,
  RepoItem,
} from "./types";
const baseUrl = " https://api.github.com";
export default class GitHubStore implements IGitHubStore {
  private readonly apiStore = new ApiStore(baseUrl);

  async getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<ApiResponse<RepoItem[], any>> {
    return await this.apiStore.request({
      method: HTTPMethod.get,
      data: {},
      headers: {},
      endpoint: `/orgs/${params.organizaionName}/repos`,
    });
  }
}
