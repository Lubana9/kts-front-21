import { Meta } from "@utils/Meta";
import { ILocalStore } from "@utils/UseLocalStore";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

import ApiStore from "../../shared/store/ApiStore";
import { ApiResponse, HTTPMethod } from "../../shared/store/ApiStore/types";
import {
  GetOrganizationReposListParams,
  IGitHubStore,
  RepoItem,
} from "./types";
const baseUrl = " https://api.github.com";

type PrivateFilds = "_list" | "_meta";
export default class GitHubStore implements IGitHubStore, ILocalStore {
  private readonly apiStore = new ApiStore(baseUrl);
  private _list: RepoItem[] = [];
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<GitHubStore, PrivateFilds>(this, {
      _list: observable.ref,
      _meta: observable,
      list: computed,
      meta: computed,
      getOrganizationReposList: action,
    });
  }

  get list(): RepoItem[] {
    return this._list;
  }
  get meta(): Meta {
    return this._meta;
  }
  async getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<void> {
    this._meta = Meta.loading;
    this._list = [];
    const response = await this.apiStore.request<RepoItem[]>({
      method: HTTPMethod.get,
      data: {},
      headers: {},
      endpoint: `/orgs/${params.organizaionName}/repos`,
    });

    runInAction(() => {
      if (response.success) {
        this._meta = Meta.succses;
        this._list = response.data;
        return;
      }
      this._meta = Meta.error;
    });
  }

  destroy() {}
}
