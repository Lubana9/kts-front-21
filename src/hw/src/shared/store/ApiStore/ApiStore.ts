  
import {ApiResponse, IApiStore, RequestParams} from "./types";

export default class ApiStore implements IApiStore {
   baseUrl = '${this.baseUrl}/orgs/${orgName}/repos';
   async request<SuccessT, ErrorT = any, ReqT = {}>(params: RequestParams<ReqT>): Promise<ApiResponse<SuccessT, ErrorT>>{

    return await fetch(this.baseUrl, {
      method:params.method,
      body: JSON.stringify(params.endpoint),
      headers: params.headers
  }).then(response => {
      if(response.ok)
      return response.json()
  })
    



  // не получились (((
  /* try {
    const response = await fetch(this.baseUrl, {
      method:params.method,
      body: JSON.stringify(params.endpoint),
      headers: params.headers
  });
  
    const data = await response.json();
  
    return {
      success: true,
      data,
      status: StatusHTTP.ok
    };
  } catch (e) {
    return {
      success: false,
      data: e,
      status: StatusHTTP.NOT_FOUND
    };
  } */


}}

