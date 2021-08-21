
import {ApiResponse, IApiStore, RequestParams} from "./types";

export default class ApiStore implements IApiStore {
    constructor() {

      this.baseUrl = '${this.baseUrl}/orgs/${orgName}/repos';
      
    }
  baseUrl: string;

   async request<SuccessT, ErrorT = any, ReqT = {}>(params: RequestParams<ReqT>): Promise<ApiResponse<SuccessT, ErrorT>> {
      try {
        const response = await fetch(this.baseUrl, {
          method:params.method,
          body: JSON.stringify(params.endpoint),
          headers: params.headers
      });
      
        const data = await response.json();
      
        return {
          success: true,
          data,
          status: data
        };
      } catch (e) {
        return {
          success: false,
          data: e,
          status: e
        };
      } 
    }
}

