import { Divider, Grid, Stack } from "@mui/material";
import React from "react";
import TypoGraphy from "../../common/TypoGraphy";
import CustomBtn from "../../common/Button";
import { FaCalendarAlt, FaUser } from "react-icons/fa";
import satatan1 from "../../../styles/assets/images/system/sanatan1.png";
import satatan2 from "../../../styles/assets/images/system/satatan2.png";
import { useViewportWidth } from "../../../utils/hooks";
import { tablet } from "../../../utils/constants";

const Section3: React.FC = () => {
  const windowWidth = useViewportWidth();
  return (
    <section className="section3 pb-4">
      <Grid className="container" container>
        <Grid size={12} className="text-center pb-4 pt-4">
          <Divider />
          <Stack className="pt-4 pb-2 secondary-text">
            <TypoGraphy variant="body1" typeClass="">
              {"What a joy to introduce"}
            </TypoGraphy>
          </Stack>
          <Stack>
            <TypoGraphy variant="h2">{"Sanatan Education Blog"}</TypoGraphy>
          </Stack>
        </Grid>

        <Grid
          size={12}
          className={windowWidth > tablet ? "widget" : "widget mb-3"}
          container
          justifyContent={"space-between"}
          flexDirection={"row"}
          alignItems={"center"}
        >
          <Grid size={windowWidth > tablet ? 6 : 12}>
            <Stack className="widget-text left">
              <TypoGraphy variant="h2">
                {"How To Enjoy A Gift That Lasts Forever"}
              </TypoGraphy>
              <Stack
                flexDirection={"row"}
                display={"flex"}
                alignItems={"center"}
                className="pt-2 pb-2 textSource"
              >
                <Stack className="mr-4">
                  <TypoGraphy variant="body1">
                    <span className="mr-2">{<FaCalendarAlt />}</span>
                    {"22/01/2024"}
                  </TypoGraphy>
                </Stack>
                <Stack className="ml-4">
                  <TypoGraphy variant="body1">
                    <span className="mr-2">{<FaUser />}</span>{" "}
                    {"By deeds2admin"}
                  </TypoGraphy>
                </Stack>
              </Stack>
              <TypoGraphy variant="body1">
                {
                  "Community is the context for discipleship. The Christian faith is not intended to be lived in isolation  for relationship Cultures…"
                }
              </TypoGraphy>
              <Grid size={6} className={windowWidth > tablet ? "pt-2" : "pt-2 mb-2"}>
                <CustomBtn
                  variant={"contained"}
                  text={"Read More"}
                  btnClass={"primary-btn"}
                />
              </Grid>
            </Stack>
          </Grid>
          <Grid size={windowWidth > tablet ? 6 : 12}>
            <Stack className={"widget-img"}>
              <img
                src={satatan1}
                alt="Sanatan Education Blog"
              />
            </Stack>
          </Grid>
        </Grid>
        <Grid
          size={12}
          className="widget"
          container
          justifyContent={"space-between"}
          flexDirection={"row"}
          alignItems={"center"}
        >
          <Grid size={windowWidth > tablet ? 6 : 12}>
            <Stack className={windowWidth > tablet ? "widget-img" : "widget-img mb-2"}>
              <img
                src={satatan2}
                alt="Sanatan Education Blog"
              />
            </Stack>
          </Grid>
          <Grid size={windowWidth > tablet ? 6 : 12}>
            <Stack className={windowWidth > tablet ? "widget-text right" : "widget-text"}>
              <TypoGraphy variant="h2">
                {"How To Enjoy A Gift That Lasts Forever"}
              </TypoGraphy>
              <Stack
                flexDirection={"row"}
                display={"flex"}
                alignItems={"center"}
                className="pt-2 pb-2 textSource"
              >
                <Stack className="mr-4">
                  <TypoGraphy variant="body1">
                    <span className="mr-2">{<FaCalendarAlt />}</span>
                    {"22/01/2024"}
                  </TypoGraphy>
                </Stack>
                <Stack className="ml-4">
                  <TypoGraphy variant="body1">
                    <span className="mr-2">{<FaUser />}</span>{" "}
                    {"By deeds2admin"}
                  </TypoGraphy>
                </Stack>
              </Stack>
              <TypoGraphy variant="body1">
                {
                  "Community is the context for discipleship. The Christian faith is not intended to be lived in isolation  for relationship Cultures…"
                }
              </TypoGraphy>
              <Grid size={windowWidth > tablet ? 6 : 12} className="pt-2">
                <CustomBtn
                  variant={"contained"}
                  text={"Read More"}
                  btnClass={"primary-btn"}
                />
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </section>
  );
};

export default Section3;
