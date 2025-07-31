import { Grid } from "@mui/material";
import HomeBanner from "./HomeBanner.tsx";
import Section1 from "./Section1.tsx";
import Section2 from "./Section2.tsx";
import Section3 from "./Section3.tsx";

const Home: React.FC = () => {
  return (
    <>
      <Grid container spacing={2} flexDirection={"column"}>
        <HomeBanner />
        <Section1 />
        <Section2 />
        <Section3 />
      </Grid>
    </>
  );
};

export default Home;
