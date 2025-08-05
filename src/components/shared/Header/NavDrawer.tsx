import CustomDrawer from "../../common/Drawer";
import { Grid } from "@mui/material";
import { RIGHT } from "../../../utils/constants";
import Nav from "./Nav";
import './styles.scss';

interface Props {
  isNavDrawer?: boolean;
  toggleNavDrawer: () => void;
}

const NavDrawer: React.FC<Props> = ({ isNavDrawer, toggleNavDrawer }) => {
  return (
    <>
      <CustomDrawer
        anchor={RIGHT}
        open={isNavDrawer}
        className={"drawer"}
        closeBtnClass={"close"}
        drawerTitle={"Menu"}
        onClose={toggleNavDrawer}
        noFooter={true}
      >
        <Grid size={12} onClick={toggleNavDrawer}>
          <Nav />
        </Grid>
      </CustomDrawer>
    </>
  );
};

export default NavDrawer;
