import { ILocalStore } from "@utils/UseLocalStore";

export default class RepoBranchesStore implements ILocalStore {
  getDetails(reponame: string) {
    return reponame;
  }
  destroy(): void {}
}
