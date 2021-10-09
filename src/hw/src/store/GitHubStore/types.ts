export type GetOrganizationReposListParams = {
  organizaionName: string;
};

export type GetAdditionalOrganization = {
  additionalOrganizaionName: string;
};

export type GetOrganizationRepoBranchesParams = {
  owner: string;
  repo: string;
};

export type GetBranchesInfoParams = {
  owner: string;
  repo: string;
  sha: string;
};

export const getBranchesList = (owner: string, repo: string) =>
  `/repos/${owner}/${repo}/branches`;

export const getBranchesInfo = (owner: string, repo: string, sha: string) =>
  `/repos/${owner}/${repo}/commits/${sha}`;

export interface IGitHubStore {
  getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<void>;
}

export interface IBranches {
  getBranchesList(params: GetOrganizationRepoBranchesParams): Promise<void>;
}

export interface IBranchesInfo {
  getBranchesInfo(params: GetBranchesInfoParams): Promise<void>;
}
