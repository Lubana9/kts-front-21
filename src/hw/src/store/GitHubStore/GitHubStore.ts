import ApiStore from '../../shared/store/ApiStore';
import {IGitHubStore} from "./types";

export default class GitHubStore implements IGitHubStore {
    private readonly apiStore = new ApiStore();
    baseUrl: string;

    constructor(baseUrl:string) {

      this.baseUrl =baseUrl;
      
    }
    // TODO: не забудьте передать baseUrl в конструктор

    // TODO: реализовать интерфейс IGitHubStore

    async getOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResp<RepoItem[]>> {
     
          const response = await this.apiStore.request(params.getOrganizationReposList);
          return response;
        
        // TODO: Здесь сделайте вызов из this.apiStore и верните результат
        // Документация github: https://docs.github.com/en/rest/reference/repos#list-organization-repositories
    }
}