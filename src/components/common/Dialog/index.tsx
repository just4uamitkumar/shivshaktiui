import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  type DialogProps,
  Stack,
} from "@mui/material";
import CustomIconBtn from "../IconBtn";
import  CloseRounded  from "@mui/icons-material/CloseRounded";
import "./styles.scss";
import CustomBtn from "../Button";

interface Props extends DialogProps {
  title?: string;
  children?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  dialogClass?: string;
  titleClass?: string;
  contentClass?: string;
  confirmBtnClass?: string;
  cancelBtnClass?: string;
  isCancelIcon?: boolean;
}

const CustomDialog: React.FC<Props> = ({
  title,
  children,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  dialogClass,
  titleClass,
  contentClass,
  open,
  confirmBtnClass,
  cancelBtnClass,
  isCancelIcon,
  ...props
}) => {
  return (
    <Dialog {...props} className={dialogClass} open={open}>
      {isCancelIcon ? (
        <Stack
          className="dialog-header"
          direction="row"
          justifyContent={"space-between"}
        >
          <DialogTitle className={titleClass}>{title}</DialogTitle>
          <CustomIconBtn IconComponent={CloseRounded} onClick={onCancel} />
        </Stack>
      ) : (
        <Stack
          className="dialog-header"
          direction="row"
          justifyContent={"space-between"}
        >
          <DialogTitle className={titleClass}>{title}</DialogTitle>
        </Stack>
      )}
      <DialogContent className={contentClass}>{children}</DialogContent>
      <DialogActions>
        <CustomBtn
          variant="contained"
          onClick={onConfirm}
          className={confirmBtnClass}
          text={confirmText}
        />
        <CustomBtn
          variant="contained"
          onClick={onCancel}
          className={cancelBtnClass}
          text={cancelText}
        />
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
