export type RepoBranchesApi = {
  name: string;
  commit: commit;
};

export type commit = {
  sha: string;
  url: url;
};
export type url = {
  sha: string;
  commit: commitInfo;
};
export type commitInfo = {
  author: author;
};

export type author = {
  name: string;
  email: string;
  date: number;
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
