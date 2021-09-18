import {
    Dialog,
    DialogContent,
    DialogTitle,
    makeStyles,
} from "@material-ui/core";
import { Children, Dispatch, SetStateAction } from "react";
  
type PopUpProps = {
    openPopUp: boolean;
    setopenPopUp: Dispatch<SetStateAction<boolean>>;
}


const PopUp: React.FC<PopUpProps> = ({ openPopUp, setopenPopUp }) => {
    
    const handelClose = () => {
        setopenPopUp(false);
    }
    return <Dialog open={openPopUp}>
        <button onClick={handelClose}></button>
        <DialogTitle>
            <div>Information </div>
            <DialogContent>
                {Children}
            </DialogContent>
        </DialogTitle>
    </Dialog>;
}

export default PopUp;