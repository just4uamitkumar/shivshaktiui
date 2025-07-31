import { Grid } from "@mui/material";
import { Link } from "react-router";
import SocialLinks from "../SocialLinks";

const Courtesy: React.FC = () => {
  return (
    <>
      <section className="curtesy">
        <Grid className="container" spacing={2} container>
          <Grid size={6} className="curtseyLinks">
            <ul>
              <li>
                <Link to="/">Join the Shiva</Link>
              </li>
              <li>
                <Link to="/">Events</Link>
              </li>

              <li>
                <Link to="/">News</Link>
              </li>
              <li>
                <Link to="/">Media</Link>
              </li>
            </ul>
          </Grid>
          <Grid
            size={6}
            justifyContent={"flex-end"}
            display={"flex"}
          >
            <SocialLinks />
          </Grid>
        </Grid>
      </section>
    </>
  );
};

export default Courtesy;
