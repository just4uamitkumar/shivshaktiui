import { Stack, Grid } from "@mui/material";
import TypoGraphy from "../../common/TypoGraphy";
import { Link } from "react-router";
import Logo from "../../../styles/assets/images/web/whiteLogo.png";
import SocialLinks from "../SocialLinks";

const Footer: React.FC = () => {
  return (
    <>
      <footer>
        <Grid
          className="footer pt-4 pb-4"
          container
          spacing={2}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Grid className="container" container spacing={4}>
            <Grid size={{ xs: 6, md: 3 }}>
              <Stack className="logo">
                <Link to="/">
                  <img src={Logo} alt="Shiv Shakti" />
                </Link>
              </Stack>
              <Stack>
                <TypoGraphy variant="body1">
                  {
                    "At tincidunt vulputate dis natoque sed parturient proine mperdiet. Quisque lig pede eu, malesuda. Felis. Semper orc gue lorem. Integer ipsum nibh semper suscipit dolor fames interd.."
                  }
                </TypoGraphy>
              </Stack>
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <Stack>
                <TypoGraphy variant="h4">{"Explore"}</TypoGraphy>
              </Stack>
              <Stack className="footer-links">
                <ul>
                  <li>
                    <Link to="/">About Us</Link>
                  </li>
                  <li>
                    <Link to="/code">Code</Link>
                  </li>
                  <li>
                    <Link to="/develop">Develop</Link>
                  </li>
                  <li>
                    <Link to="/">Contact Us</Link>
                  </li>
                  <li>
                    <Link to="/">My Account</Link>
                  </li>
                  <li>
                    <Link to="/">Sign In</Link>
                  </li>
                </ul>
              </Stack>
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <Stack>
                <TypoGraphy variant="h4">{"Contact info"}</TypoGraphy>
              </Stack>
              <Stack className="footer-links">
                <ul>
                  <li>
                    <Link to="/devotee">Devotee</Link>
                  </li>
                  <li>
                    <Link to="/">Read</Link>
                  </li>
                  <li>
                    <Link to="/">Listen</Link>
                  </li>
                  <li>
                    <Link to="/">Contact Us</Link>
                  </li>
                  <li>
                    <Link to="/">My Account</Link>
                  </li>
                  <li>
                    <Link to="/">Sign In</Link>
                  </li>
                </ul>
              </Stack>
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <Stack>
                <TypoGraphy variant="h4">{"Connect with us"}</TypoGraphy>
              </Stack>
              <SocialLinks />
            </Grid>
          </Grid>
        </Grid>
      </footer>
    </>
  );
};

export default Footer;
