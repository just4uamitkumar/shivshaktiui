import { Grid, Stack } from "@mui/material";
import CustomDialog from "../../common/Dialog";

interface Props {
    openModal: boolean;
    closeModal?: () => void;
    handleRegister: () => void;
    firstName?: string;
    lastName?: string;
    email?: string;
}

const AddModal: React.FC<Props> = ({ openModal, closeModal, handleRegister, firstName, lastName, email }) => {

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
                    {'Are you sure you want to register with below details ?'}
                    
                    </Stack>
                    <Stack className="mt-2">
                        <Stack>
                            <span><strong> Name:</strong> {firstName} {' '} {lastName}</span>
                        </Stack>
                        <Stack>
                            <span><strong>Email:</strong> {email}</span>
                        </Stack>
                    </Stack>
                </Grid>
            </CustomDialog>
        </>
    );
};

export default AddModal;