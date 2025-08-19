import CustomDrawer from "../../../common/Drawer";
import { Alert, Grid, Snackbar, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { server } from "../../../../redux/store";
import axios from "axios";
import { RIGHT } from "../../../../utils/constants";
import type { user } from "../type";
import { AuthEnum } from "../enum";
import TypoGraphy from "../../../common/TypoGraphy";

interface Props {
  isForgotPasswordDrawer?: boolean;
  toggleForgotPasswordDrawer: () => void;
}

const ForgotPassword: React.FC<Props> = ({
  isForgotPasswordDrawer,
  toggleForgotPasswordDrawer,
}) => {
  const [email, setEmail] = useState<string>("");
  const [successSnack, setSuccessSnack] = useState<boolean>(false);
  const [errorSnack, setErrorSnack] = useState<boolean>(false);
  const [allUsers, setAllUsers] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (email.length > 0) {
      getAllUsers();
    }
  }, [email]);

  const checkExistingEmail = () => {
    const regex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setMessage(AuthEnum.invalidEmail);
      return;
    }
    if (!allUsers.includes(email)) {
      setMessage(AuthEnum.notExistEmail);
      return;
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await axios.get(`${server}user/allUsers`);
      const data: string[] = response.data?.users?.map(
        (user: user) => user.email
      );
      setAllUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const submitHadler = async () => {
    if (email === "") {
      setErrorSnack(true);
      return;
    }

    try {
      const response = await axios.post(`${server}user/forgetpassword`, {
        email,
      });

      if (response.statusText === '"OK"') {
        await response.data;
      }
      setSuccessSnack(true);
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid credentials");
    }
  };

  const handleSuccessSnack = (
    _event: React.SyntheticEvent | Event,
    reason: string
  ): void => {
    if (reason === "clickaway") return;
    setSuccessSnack(false);
    toggleForgotPasswordDrawer();

  };

  const handleErrorSnack = (
    _event: React.SyntheticEvent | Event,
    reason: string
  ): void => {
    if (reason === "clickaway") return;
    setErrorSnack(false);
    toggleForgotPasswordDrawer();
  };

  return (
    <>
      <CustomDrawer
        anchor={RIGHT}
        open={isForgotPasswordDrawer}
        className={"drawer"}
        closeBtnClass={"close"}
        drawerTitle={"Forgot Password"}
        titleClass={"titleClass"}
        onClose={toggleForgotPasswordDrawer}
        SubmitText={"Submit"}
        submitHandler={submitHadler}
      >
        <Grid className="formWrapper">
          {message !== "" && (
            <TypoGraphy variant="body2" typeClass="danger-text pb-1 pl-1">
              {message}
            </TypoGraphy>
          )}
          <Stack className="mb-2">
            <TextField
              label="Email ID"
              variant="outlined"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setMessage("");
              }}
              name="email"
              size="small"
              onBlur={checkExistingEmail}
            />
          </Stack>
        </Grid>
      </CustomDrawer>

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
          {`Reset link sent to your email ${email}`}
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
          {"Reset link failed to send"}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ForgotPassword;
