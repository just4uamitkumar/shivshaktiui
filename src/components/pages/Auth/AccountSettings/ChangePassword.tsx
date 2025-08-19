import { Stack, Snackbar, Alert, Grid } from "@mui/material";
import { memo, useEffect, useState } from "react";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import type { userType } from "../../../shared/Header/type";
import TypoGraphy from "../../../common/TypoGraphy";
import CustomBtn from "../../../common/Button";
import PasswordInput from "../../../common/PasswordInput";
import { server } from "../../../../redux/store";
import axios from "axios";
import { AuthEnum } from "../enum";
import PasswordRule from "../ResetPassword/PasswordRule";

interface Props {
  user: Partial<userType> | null;
  onUpdate: () => void;
}

const ChangePassword: React.FC<Props> = () => {
  const [isInput, setInput] = useState<boolean>(false);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorSnack, setErrorSnack] = useState<boolean>(false);
  const [successSnack, setSuccessSnack] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [snackMSG, setSnackMsg] = useState<string>("");
  const yourToken = localStorage.getItem("token");

  useEffect(() => {
    if (newPassword.length >= 8 && confirmPassword.length >= 6) {
      if (confirmPassword !== newPassword) {
        setMessage(AuthEnum.notSamePassword);
      } else {
        setMessage("");
      }
    }
  }, [confirmPassword]);

  const submitHadler = async () => {
    axios
      .put(
        `${server}user/changePassword`,
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${yourToken}`,
          },
        }
      )
      .then((response) => {
        console.log("response:", response);
        if (response.status === 200) {
          setSnackMsg(response.data.message);
          setSuccessSnack(true);
        }
      })
      .catch((error) => {
        console.error("Full error object:", error);

        const errorMsg =
          error.response?.data?.message ||
          error.message ||
          "Something went wrong";
        setErrorSnack(true);
        setSnackMsg(errorMsg);
      });
  };

  const handleSuccessSnack = (
    _event: React.SyntheticEvent | Event,
    reason: string
  ): void => {
    if (reason === "clickaway") return;
    setSuccessSnack(false);
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
            <>
              <Stack display={"flex"} direction="column" spacing={2}>
                <PasswordInput
                  inputId="old-password"
                  label="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  variant="outlined"
                  size={"small"}
                />
                <PasswordInput
                  inputId="new-password"
                  label="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  variant="outlined"
                  size={"small"}
                />
                <PasswordInput
                  inputId="confirm-password"
                  label="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  variant="outlined"
                  size={"small"}
                />
                {message !== "" && (
                  <TypoGraphy variant="body2" typeClass="danger-text pb-1 pl-1">
                    {message}
                  </TypoGraphy>
                )}
                <PasswordRule password={newPassword} />
                <Stack
                  direction={"row"}
                  spacing={1}
                  justifyContent={"flex-end"}
                >
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
                    onClick={submitHadler}
                    disabled={
                      oldPassword === "" ||
                      newPassword === "" ||
                      confirmPassword === ""
                    }
                  />
                </Stack>
              </Stack>
            </>
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
        open={successSnack}
        autoHideDuration={4000}
        onClose={handleSuccessSnack}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSuccessSnack(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackMSG}!
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
          {snackMSG}
        </Alert>
      </Snackbar>
    </>
  );
};

export default memo(ChangePassword);
