import ApiStore from "@store/ApiStore";
import { HTTPMethod } from "@store/ApiStore/types";
import {
  normalaizRepoBranches,
  RepoBranchesApi,
  RepoBranchesModel,
} from "@store/modules/github/repoBranches";
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
  makeObservable,
  observable,
  runInAction,
} from "mobx";

import { getBranchesInfo, GetBranchesInfoParams, IBranchesInfo } from "./types";

const BASE_URL = "https://api.github.com";
type PrivateFilds = "_branchesInfo" | "_meta";
export default class BranchInfoStore implements IBranchesInfo, ILocalStore {
  private readonly apiStore = new ApiStore(BASE_URL);
  private _meta: Meta = Meta.initial;
  private _branchesInfo: CollectionModel<string, RepoBranchesModel> =
    getIniitCollectionModels();

  constructor() {
    makeObservable<BranchInfoStore, PrivateFilds>(this, {
      _branchesInfo: observable.ref,
      _meta: observable,
      metaBranches: computed,
      branches: computed,
      getBranchesInfo: action,
    });
  }
  get metaBranches(): Meta {
    return this._meta;
  }
  get branches(): RepoBranchesModel[] {
    return linearizedCollection(this._branchesInfo);
  }
  async getBranchesInfo(params: GetBranchesInfoParams): Promise<void> {
    this._meta = Meta.loading;
    this._branchesInfo = getIniitCollectionModels();
    const response = await this.apiStore.request<RepoBranchesApi[]>({
      method: HTTPMethod.get,
      data: {},
      headers: {},
      endpoint: getBranchesInfo(params.owner, params.repo, params.sha),
    });
    runInAction(() => {
      if (response.success) {
        try {
          const branches: RepoBranchesModel[] = [];
          for (const item of response.data) {
            branches.push(normalaizRepoBranches(item));
          }
          this._meta = Meta.succses;
          this._branchesInfo = normalaizCollection(
            branches,
            (item) => item.commit.sha
          );
          return;
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log(e);
          this._meta = Meta.error;
          this._branchesInfo = getIniitCollectionModels();
        }
      }
    });
  }

  destroy() {}
}
