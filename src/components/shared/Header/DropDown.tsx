import { Menu, MenuItem } from "@mui/material";
import axios from "axios";
import { server } from "../../../redux/store";
import { useNavigate  } from "react-router";

interface Props {
  handleDropDownClose: () => void;
  anchorEl: null | HTMLElement;
  open: boolean;
}

const DropDownMenu: React.FC<Props> = ({ handleDropDownClose, anchorEl, open }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(`${server}user/logout`);
      localStorage.removeItem("token");
      window.location.reload();
      handleDropDownClose();
      alert("Logout successful!");
    } catch (error) {
      console.error(" error:", error);
    }
  };

  const goToProfile = () => {
    handleDropDownClose();
    navigate("/Profile");
  }

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleDropDownClose}
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      className="dropdown-menu"
    >
      <MenuItem onClick={goToProfile}>Profile</MenuItem>
      <MenuItem onClick={handleDropDownClose}>My account</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );
};

export default DropDownMenu;
