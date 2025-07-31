import { Stack, Grid } from "@mui/material";
import { Link } from "react-router";
import CustomBtn from "../../common/Button";
import { FaRegUserCircle, FaCaretDown, FaBars } from "react-icons/fa";
import IconBtn from "../../common/IconBtn";
import DropDownMenu from "./DropDown";
import type { userType } from "./type";
import NavDrawer from "./NavDrawer";
import { useState } from "react";

interface Props {
  logo: string;
  userData: userType | null;
  open: boolean;
  handleDropDown: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleDropDownClose: () => void;
  anchorEl: null | HTMLElement;
  toggleLoginDrawer: () => void;
}

const MobileHeader: React.FC<Props> = ({
  logo,
  userData,
  open,
  handleDropDown,
  handleDropDownClose,
  anchorEl,
  toggleLoginDrawer,
}) => {
   const [isNavDrawer, setIsNavDrawer] = useState<boolean>(false);

   const toggleNavDrawer = () => {
    setIsNavDrawer(!isNavDrawer);
  };

  return (
    <>
      <Grid size={3}>
        <IconBtn IconComponent={FaBars} iconClass="mobile-nav" onClick={toggleNavDrawer} />
      </Grid>
      <Grid size={6}>
        <Stack className="logo">
          <Link to="/">
            <img src={logo} alt="Shiv Shakti" />
          </Link>
        </Stack>
      </Grid>
      <Grid size={3} display={"flex"} justifyContent={"flex-end"}>
        {userData ? (
          <>
            <Stack
              alignItems={"center"}
              direction={"row"}
              className="user-menu"
            >
              <span className="user-icon">
                <FaRegUserCircle />
              </span>
              <IconBtn
                IconComponent={FaCaretDown}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleDropDown}
                iconClass={"menu-anchor"}
              />
            </Stack>
            <DropDownMenu
              handleDropDownClose={handleDropDownClose}
              anchorEl={anchorEl}
              open={open}
            />
          </>
        ) : (
          <CustomBtn
            variant={"contained"}
            text={"Login"}
            btnClass={"primary-btn"}
            onClick={toggleLoginDrawer}
          />
        )}
      </Grid>
      {isNavDrawer && (
        <NavDrawer
          isNavDrawer={isNavDrawer}
          toggleNavDrawer={toggleNavDrawer}
        />
      )}
    </>
  );
};

export default MobileHeader;
