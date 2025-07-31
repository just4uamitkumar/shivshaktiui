import { Stack, Grid } from "@mui/material";
import { Link } from "react-router";
import Nav from "./Nav";
import CustomBtn from "../../common/Button";
import { FaRegUserCircle, FaCaretDown } from "react-icons/fa";
import IconBtn from "../../common/IconBtn";
import DropDownMenu from "./DropDown";
import type { userType } from "./type";

interface Props {
  logo: string;
  userData: Partial<userType> | null;
  open: boolean;
  handleDropDown: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleDropDownClose: () => void;
  anchorEl: null | HTMLElement;
  toggleLoginDrawer: () => void;
}

const WebHeader: React.FC<Props> = ({
  logo,
  userData,
  open,
  handleDropDown,
  handleDropDownClose,
  anchorEl,
  toggleLoginDrawer,
}) => {
  return (
    <>
      <Grid size={3}>
        <Stack className="logo">
          <Link to="/">
            <img src={logo} alt="Shiv Shakti" />
          </Link>
        </Stack>
      </Grid>
      <Grid size={6}>
        <Nav />
      </Grid>
      <Grid size={3} display={"flex"} justifyContent={"flex-end"}>
        {userData ? (
          <>
            <Stack
              alignItems={"center"}
              direction={"row"}
              className="user-menu"
            >
              <span className="mr-2 user-icon">
                <FaRegUserCircle />
              </span>
              <span>
                {userData?.firstName} {userData?.lastName}
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
    </>
  );
};

export default WebHeader;
