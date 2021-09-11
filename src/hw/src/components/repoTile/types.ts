export type repoData = {
    name: Array<string>,
    avatar_url: string,
    owner: repoOwner,
    stargazers_count: number,
    updated_at:string
}

export type repoOwner = {
    login: string,
}