export type GetOrganizationReposListParams = {
  organizaionName: string;
};

export interface IGitHubStore {
  getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<void>;
}
