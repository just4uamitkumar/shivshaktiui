import { Grid, Stack } from "@mui/material";
import React from "react";
import shivLing from "../../../styles/assets/images/system/shivling.png";
import temple from "../../../styles/assets/images/system/temple.png";
import swastik from "../../../styles/assets/images/system/swastik.png";
import TypoGraphy from "../../common/TypoGraphy";
import { tablet } from "../../../utils/constants";
import { useViewportWidth } from "../../../utils/hooks";

const Section2: React.FC = () => {
  const windowWidth = useViewportWidth();
  return (
    <section className="section2 pb-4 pt-4">
      <Grid
        className="container"
        container
        spacing={5}
        justifyContent={"space-between"}
        alignItems={"start"}
        flexDirection={windowWidth > tablet ? "row" : "column"}
      >
        <Grid size={windowWidth > tablet ? 4 : 12} className="widget">
          <Stack className="imgWrap">
            <img src={swastik} alt="Swastik" />
          </Stack>
          <Stack className="pt-2 pb-2">
            <TypoGraphy variant="h2">{"The Swastik Symbol"}</TypoGraphy>
          </Stack>
          <Stack className="section-text">
            <TypoGraphy variant="body1">
              {
                "What a joy it is to introduce you to our church! You’ll discover that our passion is to provide a place where people."
              }
            </TypoGraphy>
          </Stack>
        </Grid>
        <Grid size={windowWidth > tablet ? 4 : 12} className="widget">
          <Stack className="imgWrap">
            <img src={shivLing} alt="Shivling" />
          </Stack>
          <Stack className="pt-2 pb-2">
            <TypoGraphy variant="h2">{"12 Jyotriling"}</TypoGraphy>
          </Stack>
          <Stack className="section-text">
            <TypoGraphy variant="body1">
              {
                "What a joy it is to introduce you to our church! You’ll discover that our passion is to provide a place where people."
              }
            </TypoGraphy>
          </Stack>
        </Grid>
        <Grid size={windowWidth > tablet ? 4 : 12} className="widget">
          <Stack className="imgWrap">
            <img src={temple} alt="Temple" />
          </Stack>
          <Stack className="pt-2 pb-2">
            <TypoGraphy variant="h2">{"The Temple Online"}</TypoGraphy>
          </Stack>
          <Stack className="section-text">
            <TypoGraphy variant="body1">
              {
                "What a joy it is to introduce you to our church! You’ll discover that our passion is to provide a place where people."
              }
            </TypoGraphy>
          </Stack>
        </Grid>
      </Grid>
    </section>
  );
};

export default Section2;
