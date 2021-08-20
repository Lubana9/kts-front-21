  
import {ApiResponse, IApiStore, RequestParams} from "./types";

export default class ApiStore implements IApiStore {
   baseUrl = 'https://api.github.com/orgs/octo-org/repos';
   request<SuccessT, ErrorT = any, ReqT = {}>(params: RequestParams<ReqT>): Promise<ApiResponse<SuccessT, ErrorT>>{
    const headers ={
        'Content-Type': 'application-json'
    }
    return fetch(this.baseUrl, {
        method:params.method,
        body: JSON.stringify(params.endpoint),
        headers
    }).then(response => {
        if(response.ok)
        return response.json()
    })

}}

