import { Grid, Stack } from "@mui/material";
import React from "react";
import Vishwanath from "../../../styles/assets/images/system/vishwanath.png";
import CustomBtn from "../../common/Button";
import IconBtn from "../../common/IconBtn";
import {
  FaYoutube,
  FaRegFilePdf,
  FaHeadphones,
  FaLink,
  FaRegClock,
} from "react-icons/fa";
import TypoGraphy from "../../common/TypoGraphy";
import { smallDesktop, tablet } from "../../../utils/constants";
import { useViewportWidth } from "../../../utils/hooks";

const Section1: React.FC = () => {
  const windowWidth = useViewportWidth();
  return (
    <section className={windowWidth > tablet ? "section1" :"section1 mb-4"}>
      <Grid
        className="container"
        container
        spacing={windowWidth > smallDesktop ? 5 : 3}
        justifyContent={"space-between"}
        alignItems={"start"}
        flexDirection={windowWidth > tablet ? "row" : "column"}
      >
        <Grid size={windowWidth > tablet ? 6 : 12}>
          <Stack className="imgWrap">
            <img src={Vishwanath} alt="Vishwanath" />
          </Stack>
        </Grid>
        <Grid size={windowWidth > tablet ? 6 : 12}>
          <Stack
            justifyContent={"space-between"}
            alignItems={"center"}
            display={"flex"}
            flexDirection={"row"}
          >
            <Stack className="liveBtn">
              <CustomBtn
                variant="outlined"
                className="primary-btn"
                text="Live"
              />
            </Stack>
            <Stack className="support-icons">
              <ul>
                <li>
                  <IconBtn IconComponent={FaYoutube} />
                </li>
                <li>
                  <IconBtn IconComponent={FaHeadphones} />
                </li>
                <li>
                  <IconBtn IconComponent={FaRegFilePdf} />
                </li>
                <li>
                  <IconBtn IconComponent={FaLink} />
                </li>
              </ul>
            </Stack>
          </Stack>
          <Stack className="section-title">
            <TypoGraphy variant="h1">
              {"Preaching. Worship. An Online Family"}
            </TypoGraphy>
          </Stack>
          <Stack className="duration" display={"flex"} flexDirection={"row"}>
            <TypoGraphy variant="body1" typeClass={"pr-4"}>
              {<FaRegClock />}
            </TypoGraphy>
            <TypoGraphy variant="body1">{"Monday,  8:00 AM"}</TypoGraphy>
            <TypoGraphy variant="body1">{"-"}</TypoGraphy>
            <TypoGraphy variant="body1">{"Tuesday: 8:00 AM"}</TypoGraphy>
          </Stack>
          <Stack className="section-text">
            <TypoGraphy variant="body1">
              {
                "We want to welcome you at the church where you find people who worship Jesus and are passionate about spreading His Word. Salvation is a gift that you can Find in Jesus by following the mission."
              }
            </TypoGraphy>
          </Stack>
        </Grid>
      </Grid>
    </section>
  );
};

export default Section1;
