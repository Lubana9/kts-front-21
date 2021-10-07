import { type } from "os";

export type RepoBranchesApi = {
  name: string;
  commit: commit;
};

export type commit = {
  sha: string;
  url: string;
};

export type RepoBranchesModel = {
  name: string;
  commit: commit;
};

export const normalaizRepoBranches = (
  from: RepoBranchesApi
): RepoBranchesModel => ({
  name: from.name,
  commit: from.commit,
});
