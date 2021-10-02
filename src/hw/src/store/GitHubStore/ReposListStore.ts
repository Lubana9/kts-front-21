import {
  normalizeRepoItem,
  RepoItemApi,
  RepoItemModel,
} from "@store/modules/github";
import {
  CollectionModel,
  getIniitCollectionModels,
  linearizedCollection,
  normalaizCollection,
} from "@store/modules/shared/collection";
import { Meta } from "@utils/Meta";
import { ILocalStore } from "@utils/UseLocalStore";
import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from "mobx";

import ApiStore from "../ApiStore";
import { HTTPMethod } from "../ApiStore/types";
import { GetOrganizationReposListParams, IGitHubStore } from "./types";
const baseUrl = " https://api.github.com";

type PrivateFilds = "_list" | "_meta";
export default class ReposListStore implements IGitHubStore, ILocalStore {
  private readonly apiStore = new ApiStore(baseUrl);
  private _list: CollectionModel<number, RepoItemModel> =
    getIniitCollectionModels();
  private _meta: Meta = Meta.initial;
  constructor() {
    makeObservable<ReposListStore, PrivateFilds>(this, {
      _list: observable.ref,
      _meta: observable,
      list: computed,
      meta: computed,
      getOrganizationReposList: action,
      setList: action,
    });
  }

  get list(): RepoItemModel[] {
    return linearizedCollection(this._list);
  }
  get meta(): Meta {
    return this._meta;
  }

  setList(e: any) {
    return e;
  }
  async getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<void> {
    this._meta = Meta.loading;
    this._list = getIniitCollectionModels();
    const response = await this.apiStore.request<RepoItemApi[]>({
      method: HTTPMethod.get,
      data: {},
      headers: {},
      endpoint: `/orgs/${params.organizaionName}/repos`,
    });

    runInAction(() => {
      if (response.success) {
        try {
          const list: RepoItemModel[] = [];
          for (const item of response.data) {
            list.push(normalizeRepoItem(item));
          }
          this._meta = Meta.succses;
          this._list = normalaizCollection(list, (item) => item.id);
          return;
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log(e);
          this._meta = Meta.error;
          this._list = getIniitCollectionModels();
        }
      }
    });
  }
  // private readonly _qsReaction: IReactionDisposer = reaction(
  //   () => rootStore.query.getParam("search"),
  //   (search) => {
  //     // return this.getOrganizationReposList({search});
  //   }
  // );
  destroy() {}
}
