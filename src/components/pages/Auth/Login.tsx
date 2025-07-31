import CustomDrawer from "../../common/Drawer";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { server } from "../../../redux/store";
import axios from "axios";
import { RIGHT } from "../../../utils/constants";
import CustomBtn from "../../common/Button";

interface Props {
  isLoginDrawer?: boolean;
  toggleLoginDrawer: () => void;
  toggleRegisterDrawer:() => void;
}

const Login: React.FC<Props> = ({ isLoginDrawer, toggleLoginDrawer, toggleRegisterDrawer }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const loginHandler = async () => {
    if (email === "" || password === "") {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(`${server}user/login`, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      toggleLoginDrawer();
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid credentials");
    }
  };

  return (
    <>
      <CustomDrawer
        anchor={RIGHT}
        open={isLoginDrawer}
        className={"drawer"}
        closeBtnClass={"close"}
        drawerTitle={"Login"}
        titleClass={"titleClass"}
        onClose={toggleLoginDrawer}
        SubmitText={"Login"}
        submitHandler={loginHandler}
      >
        <Grid className="formWrapper">
          <Stack className="mb-2">
            <TextField
              label="Email ID"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
            />
          </Stack>
          <Stack>
            <TextField
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              type="password"
            />
          </Stack>
        </Grid>
        <Grid
          flexDirection={"column"}
          alignItems={"flex-end"}
          display={"flex"}
          spacing={3}
        >
          <Stack>
            <FormControlLabel control={<Checkbox />} label="Remember Me" />
          </Stack>
          <Stack>
            <CustomBtn
              variant={"text"}
              text={"Forgot UserName/Password ?"}
              btnClass={"primary-btn"}
            />
          </Stack>
          <Stack direction={"row"} alignItems={"center"}>
            {"Not a member ?"}
            <CustomBtn
              variant={"text"}
              text={"Register here"}
              btnClass={"primary-btn"}
              onClick={toggleRegisterDrawer}
            />
          </Stack>
        </Grid>
      </CustomDrawer>
    </>
  );
};

export default Login;
