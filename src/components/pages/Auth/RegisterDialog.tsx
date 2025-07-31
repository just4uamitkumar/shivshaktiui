import { Grid, Stack } from "@mui/material";
import CustomDialog from "../../common/Dialog";

interface Props {
    openModal: boolean;
    closeModal?: () => void;
    handleRegister: () => void;
}

const AddModal: React.FC<Props> = ({ openModal, closeModal, handleRegister }) => {
 
    return (
        <>
            <CustomDialog
                title={"Confirm Regsiteration"}
                dialogClass="confirm-dialog"
                open={openModal}
                onCancel={closeModal}
                onConfirm={handleRegister}
                confirmText={"Yes, Register"}
                cancelText={"No, Cancel"}
                confirmBtnClass={"primary-btn"}
                cancelBtnClass={"cancel-btn"}
                isCancelIcon={true}
                contentClass="dialog-content"
                maxWidth={'lg'}
            >
                <Grid size={12}>
                    <Stack>
                    {'Are you sure you want to register?'}
                    </Stack>
                </Grid>
            </CustomDialog>
        </>
    );
};

export default AddModal;