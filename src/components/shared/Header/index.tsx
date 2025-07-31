import { Grid } from "@mui/material";
import logo from "../../../styles/assets/images/web/shivShakti.png";
import { useViewportWidth } from "../../../utils/hooks";
import Courtesy from "./courtsey";
import { smallDesktop } from "../../../utils/constants";
import { useEffect, useState } from "react";
import Login from "../../pages/Auth/Login";
import axios from "axios";
import { server } from "../../../redux/store";
import Register from "../../pages/Auth/Register";
import "./styles.scss";
import WebHeader from "./WebHeader";
import type { userType } from "./type";
import MobileHeader from "./MobileHeader";

const Header: React.FC = () => {
  const windowWidth = useViewportWidth();
  const [isLoginDrawer, setIsLoginDrawer] = useState<boolean>(false);
  const [isRegisterDrawer, setIsRegisterDrawer] = useState<boolean>(false);
  const token = localStorage.getItem("token");
  const [userData, setUserData] = useState<userType | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    fetchProfile();
  }, [token]);

  const handleDropDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDropDownClose = () => {
    setAnchorEl(null);
  };

  const fetchProfile = async () => {
    try {
      if (token) {
        const response = await axios.get(`${server}user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data?.user);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleLoginDrawer = () => {
    if (isRegisterDrawer) {
      setIsRegisterDrawer(false);
    }
    setIsLoginDrawer(!isLoginDrawer);
  };

  const toggleRegisterDrawer = () => {
    if (isLoginDrawer) {
      setIsLoginDrawer(false);
    }

    setIsRegisterDrawer(!isRegisterDrawer);
  };

  return (
    <>
      <Courtesy />
      <header>
        <Grid className="container" spacing={2} container>
          {windowWidth > smallDesktop ? (
            <WebHeader
              logo={logo}
              userData={userData}
              open={open}
              handleDropDown={handleDropDown}
              handleDropDownClose={handleDropDownClose}
              anchorEl={anchorEl}
              toggleLoginDrawer={toggleLoginDrawer}
            />
          ) : (
            <MobileHeader
              logo={logo}
              userData={userData}
              open={open}
              handleDropDown={handleDropDown}
              handleDropDownClose={handleDropDownClose}
              anchorEl={anchorEl}
              toggleLoginDrawer={toggleLoginDrawer}
            />
          )}
        </Grid>
      </header>
      {isLoginDrawer && (
        <Login
          isLoginDrawer={isLoginDrawer}
          toggleLoginDrawer={toggleLoginDrawer}
          toggleRegisterDrawer={toggleRegisterDrawer}
        />
      )}
      {isRegisterDrawer && (
        <Register
          isRegisterDrawer={isRegisterDrawer}
          toggleLoginDrawer={toggleLoginDrawer}
          toggleRegisterDrawer={toggleRegisterDrawer}
        />
      )}
    </>
  );
};

export default Header;