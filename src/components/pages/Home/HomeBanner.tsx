import { Grid, Stack } from "@mui/material";
import TypoGraphy from "../../common/TypoGraphy";
import { mobile, monthArray, tablet } from "../../../utils/constants";
import { useEffect, useState } from "react";
import mahadevImg from "../../../styles/assets/images/web/mahadev.png"; // Assuming you have an image of Lord Shiva
import { useViewportWidth } from "../../../utils/hooks";

const HomeBanner: React.FC = () => {
  const [hours, setHours] = useState<number | string>("00");
  const [minutes, setMinutes] = useState<number | string>("00");
  const [seconds, setSeconds] = useState<number | string>("00");
  const windowWidth = useViewportWidth();

  useEffect(() => {
    const interval = setInterval(() => {
      setHours(String(new Date().getHours()).padStart(2, "0"));
      setMinutes(String(new Date().getMinutes()).padStart(2, "0"));
      setSeconds(String(new Date().getSeconds()).padStart(2, "0"));
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const CurrentDate = () => {
    const today = new Date();
    const currentDate = String(today.getDate()).padStart(2, "0");
    const currentMonth = monthArray[today.getMonth()];
    const currentYear = today.getFullYear();

    return { currentDate, currentMonth, currentYear };
  };

  return (
    <>
      <section className="banner">
        <Grid
          className="container"
          container
          spacing={2}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Grid size={4} className="lordShiva">
            <img src={mahadevImg} alt={"Har Har Mahadev"} />
          </Grid>
          <Grid size={8} className="banner-text">
            <Stack>
              <TypoGraphy variant="h1">{"Om Namah Shivay"}</TypoGraphy>
            </Stack>
            <Stack
              direction={"row"}
              spacing={ windowWidth > tablet ? 2 : 1}
              alignItems={"center"}
              justifyContent={"center"}
              className={ windowWidth > tablet ? "pt-3 pb-3" : windowWidth > mobile ? "pt-2 pb-2" : "pt-1 pb-1"}
            >
              <Stack className="circle dateCircle">
                <TypoGraphy variant="h2">
                  {CurrentDate()?.currentDate}
                </TypoGraphy>
              </Stack>
              <Stack className="circle dateCircle">
                <TypoGraphy variant="h2">
                  {CurrentDate()?.currentMonth}
                </TypoGraphy>
              </Stack>
              <Stack className="circle dateCircle">
                <TypoGraphy variant="h2">
                  {CurrentDate()?.currentYear}
                </TypoGraphy>
              </Stack>
            </Stack>
            <Stack
              direction={"row"}
              spacing={ windowWidth > tablet ? 2 : 1}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Stack className="circle timeCircle">
                <TypoGraphy variant="h2">{hours}</TypoGraphy>
              </Stack>
              <Stack className="circle timeCircle">
                <TypoGraphy variant="h2"> {minutes} </TypoGraphy>
              </Stack>
              <Stack className="circle timeCircle">
                <TypoGraphy variant="h2">{seconds}</TypoGraphy>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </section>
    </>
  );
};

export default HomeBanner;
