import { Alert, Grid, Snackbar, Stack, TextField } from "@mui/material";
import PageBanner from "../../../shared/PageBanner";
import TypoGraphy from "../../../common/TypoGraphy";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import CustomBtn from "../../../common/Button";
import { AuthEnum } from "../enum";
import PasswordRule from "./PasswordRule";
import axios from "axios";
import { server } from "../../../../redux/store";

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [successSnack, setSuccessSnack] = useState<boolean>(false);
  const [errorSnack, setErrorSnack] = useState<boolean>(false);
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (password.length >= 8 && confirmPassword.length >= 6) {
      if (confirmPassword !== password) {
        setMessage(AuthEnum.notSamePassword);
      } else {
        setMessage("");
      }
    }
  }, [confirmPassword]);

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const submitHadler = async () => {
    try {
      const response = await axios.put(`${server}user/resetpassword/${token}`,
        {
          password,
        }
      );
      if (response.statusText === '"OK"') {
        await response.data;
      }
      setSuccessSnack(true);
    } catch (error) {
      console.error("Login error:", error);
      setErrorSnack(true);
    }
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
      <PageBanner title={"Reset Password"} />

      <Grid className="container pb-4 pt-4" spacing={6} container>
        <Grid size={4}>
          <Stack className="mb-2">
            <TypoGraphy variant="h4">Please reset your password</TypoGraphy>
          </Stack>
          <Stack className="mb-2">
            <TextField
              label="New Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              size="small"
            />
          </Stack>
          <Stack className="mb-2">
            <TextField
              label="Confirm Password"
              variant="outlined"
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleConfirmPassword(e)
              }
              name="confirmPassword"
              type="password"
              size="small"
            />
          </Stack>
          {message !== "" && (
            <TypoGraphy variant="body2" typeClass="danger-text pb-1 pl-1">
              {message}
            </TypoGraphy>
          )}
          <Stack>
            <CustomBtn
              variant={"contained"}
              disabled={password === "" || confirmPassword === ""}
              text={"Update Password"}
              btnClass={"primary-btn"}
              onClick={submitHadler}
            />
          </Stack>
        </Grid>
        <Grid size={4}>
          <PasswordRule password={password} />
        </Grid>
      </Grid>

      <Snackbar
        open={successSnack}
        autoHideDuration={6000}
        onClose={handleSuccessSnack}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSuccessSnack(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {`Password reset successfully`}
        </Alert>
      </Snackbar>

      <Snackbar
        open={errorSnack}
        autoHideDuration={6000}
        onClose={handleErrorSnack}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setErrorSnack(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {"Password reset failed"}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ResetPassword;
