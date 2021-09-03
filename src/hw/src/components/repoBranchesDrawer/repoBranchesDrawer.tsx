import { RepoItem } from "@store/GitHubStore/types";

export type RepoBranchesDrawerProps= {
    selectedRepo: RepoItem | null,
    onClose: () => void
}
 
const RepoBranchesDrawer:React.FC<RepoBranchesDrawerProps> = ({selectedRepo,onClose}) => {
    return (<div></div>  );
}
 
export default RepoBranchesDrawer;

