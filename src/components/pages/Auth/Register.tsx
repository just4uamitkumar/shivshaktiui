import CustomDrawer from "../../common/Drawer";
import { Grid, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { server } from "../../../redux/store";
import axios from "axios";
import { RIGHT } from "../../../utils/constants";
import CustomBtn from "../../common/Button";
import type { user } from "./type";
import TypoGraphy from "../../common/TypoGraphy";
import { AuthEnum } from "./enum";
import RegisterDialog from "./RegisterDialog";

interface Props {
  isRegisterDrawer?: boolean;
  toggleLoginDrawer: () => void;
  toggleRegisterDrawer: () => void;
}

const Register: React.FC<Props> = ({
  isRegisterDrawer,
  toggleLoginDrawer,
  toggleRegisterDrawer,
}) => {
  const [formData, setFormData] = useState<user>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPasswrod] = useState<string>("");
  const [allUsers, setAllUsers] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    if (formData?.password.length >= 8 && confirmPassword.length > 5) {
      if (confirmPassword !== formData?.password) {
        setMessage(AuthEnum.notSamePassword);
      } else {
        setMessage("");
      }
    }
  }, [formData, confirmPassword]);

  useEffect(() => {
    if (formData.email.length > 0) {
      getAllUsers();
    }
  }, [formData]);

  const checkExistingEmail = () => {
    if (allUsers.includes(formData.email)) {
      setMessage(AuthEnum.existEmail);
      return;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPasswrod(e.target.value);
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

  const submitHandler = async () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      setMessage(AuthEnum.fillAllFields);
      return;
    }

    if (formData.firstName.length < 3) {
      setMessage(AuthEnum.invalidFName);
      return;
    }

    if (formData.lastName.length < 3) {
      setMessage(AuthEnum.invalidLName);
      return;
    }

    if (formData.firstName === formData.lastName) {
      setMessage(AuthEnum.sameName);
      return;
    }

    const regex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(formData.email)) {
      setMessage(AuthEnum.invalidEmail);
      return;
    }

    if (formData.password.length < 8) {
      setMessage(AuthEnum.invalidPassword);
      return;
    }

    setOpenModal(true);
  };

  const handleRegister =  () => {
    axios.post(`${server}user/register`, formData).then(() => {
      toggleRegisterDrawer();
      setOpenModal(false);
    }).catch((error) => {
      console.error("Registration error:", error);
      toggleRegisterDrawer();
      setOpenModal(false);
    })
  };

  const closeModal = () => {
    setOpenModal(!openModal);
  };


  return (
    <>
      <CustomDrawer
        anchor={RIGHT}
        open={isRegisterDrawer}
        className={"drawer"}
        closeBtnClass={"close"}
        drawerTitle={"Register"}
        titleClass={"titleClass"}
        onClose={toggleRegisterDrawer}
        SubmitText={"Register"}
        submitHandler={submitHandler}
      >
        <Grid className="formWrapper">
          {message !== "" && (
            <TypoGraphy variant="body2" typeClass="danger-text pb-1 pl-1">
              {message}
            </TypoGraphy>
          )}
          <Stack className="mb-2">
            <TextField
              label="First Name"
              variant="outlined"
              value={formData?.firstName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e)
              }
              name="firstName"
            />
          </Stack>
          <Stack className="mb-2">
            <TextField
              label="Last Name"
              variant="outlined"
              value={formData?.lastName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e)
              }
              name="lastName"
            />
          </Stack>
          <Stack className="mb-2">
            <TextField
              label="Email ID"
              variant="outlined"
              value={formData?.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e)
              }
              onBlur={checkExistingEmail}
              name="email"
            />
          </Stack>
          <Stack className="mb-2">
            <TextField
              label="Password"
              variant="outlined"
              value={formData?.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e)
              }
              name="password"
              type="password"
            />
          </Stack>
          <Stack>
            <TextField
              label="Confirm Password"
              variant="outlined"
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleConfirmPassword(e)
              }
              name="confirmPassword"
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
          <Stack direction={"row"} alignItems={"center"}>
            {"Already Registered ?"}
            <CustomBtn
              variant={"text"}
              text={"Login here"}
              btnClass={"primary-btn"}
              onClick={toggleLoginDrawer}
            />
          </Stack>
        </Grid>
      </CustomDrawer>
      <RegisterDialog
        closeModal={closeModal}
        openModal={openModal}
        handleRegister={handleRegister}
      />
    </>
  );
};

export default Register;
