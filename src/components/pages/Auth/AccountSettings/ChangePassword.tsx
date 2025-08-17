import { Stack, Snackbar, Alert, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import type { userType } from "../../../shared/Header/type";
import TypoGraphy from "../../../common/TypoGraphy";
import CustomBtn from "../../../common/Button";
import PasswordInput from "../../../common/PasswordInput";

interface Props {
  user: Partial<userType> | null;
  onUpdate: () => void;
}

const ChangePassword: React.FC<Props> = ({ user, onUpdate }) => {
  const [isInput, setInput] = useState<boolean>(false);
  const [oldPassPassword, setOldPassword] = useState<string>("");
  const [newPassPassword, setNewPassword] = useState<string>("");
  const [confirmPassPassword, setConfirmPassword] = useState<string>("");
  const [addSnack, setAddSnack] = useState(false);
  const [errorSnack, setErrorSnack] = useState(false);

  const handleAddSnack = (
    _event: React.SyntheticEvent | Event,
    reason: string
  ): void => {
    if (reason === "clickaway") return;
    setAddSnack(false);
  };

  const handleErrorSnack = (
    _event: React.SyntheticEvent | Event,
    reason: string
  ): void => {
    if (reason === "clickaway") return;
    setErrorSnack(false);
  };

  return (
    <>
      <Grid container spacing={2} className="mb-4">
        <Grid size={3}>
          <Stack direction="row" alignItems="center">
            <VpnKeyIcon />
            <TypoGraphy variant="body1" className="semi-bold-font">
              {"Change Passwrod"}
            </TypoGraphy>
          </Stack>
        </Grid>
        <Grid size={9}>
          {isInput ? (
            <Stack display={"flex"} direction="column" spacing={2}>
              <PasswordInput
                inputId="old-password"
                label="Old Password"
                value={oldPassPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                variant="outlined"
                size={"small"}
              />
              <PasswordInput
                inputId="new-password"
                label="New Password"
                value={newPassPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                variant="outlined"
                size={"small"}
              />
              <PasswordInput
                inputId="confirm-password"
                label="Confirm Password"
                value={confirmPassPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                variant="outlined"
                size={"small"}
              />
              <Stack direction={"row"} spacing={1} justifyContent={"flex-end"}>
                <CustomBtn
                  variant={"contained"}
                  text={"Cancel"}
                  btnClass={"cancel-btn"}
                  onClick={() => setInput(!isInput)}
                 
                />
                <CustomBtn
                  variant={"contained"}
                  text={"Update"}
                  btnClass={"primary-btn"}
                  onClick={() => setInput(!isInput)}
                   disabled={oldPassPassword === '' || newPassPassword === '' || confirmPassPassword === ''}
                />
              </Stack>
            </Stack>
          ) : (
            <Stack direction="row" alignItems="center">
              <CustomBtn
                variant={"contained"}
                text={"Yes"}
                btnClass={"primary-btn"}
                onClick={() => setInput(!isInput)}
              />
            </Stack>
          )}
        </Grid>
      </Grid>

      <Snackbar
        open={addSnack}
        autoHideDuration={4000}
        onClose={handleAddSnack}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setAddSnack(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {"Password updated successfully"}!
        </Alert>
      </Snackbar>

      <Snackbar
        open={errorSnack}
        autoHideDuration={4000}
        onClose={handleErrorSnack}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setErrorSnack(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {"Password updated failed"}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ChangePassword;
