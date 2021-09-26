export type RepoBranchesApi = {
  name: string;
  sha: number;
};

export type RepoBranchesModel = {
  name: string;
  sha: number;
};

export const normalaizRepoBranches = (
  from: RepoBranchesApi
): RepoBranchesModel => ({
  name: from.name,
  sha: from.sha,
});
