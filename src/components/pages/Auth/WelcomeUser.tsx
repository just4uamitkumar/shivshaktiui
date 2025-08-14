import { Grid, Stack } from "@mui/material";
import PageBanner from "../../shared/PageBanner";
import TypoGraphy from "../../common/TypoGraphy";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const WelcomeUser: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showCountdown, setShowCountdown] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    if (!location.state?.fromRegister) {
      navigate("/"); // block manual access
      return;
    }

    const delayTimer = setTimeout(() => {
      setShowCountdown(true);
    }, 5000); // wait 5 seconds before showing countdown

    return () => clearTimeout(delayTimer);
  }, [location, navigate]);

  useEffect(() => {
    if (showCountdown) {
      const countdown = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            navigate("/");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [showCountdown, navigate]);

  return (
    <>
      <PageBanner title={"Welcome"} />

      <Grid className="container pb-4 pt-4" spacing={3} container>
        <Grid size={12} className="text-center">
          <Stack className="mt-2">
            <TypoGraphy variant="h4" className="text-center">
              You are registered successfully!{" "}
            </TypoGraphy>
            <TypoGraphy variant="body1" className="text-center">
              You will get verification link on your email soon!{" "}
            </TypoGraphy>
            <TypoGraphy variant="body1" className="text-center">
              if you still did not get the link, please check your spam folder.
            </TypoGraphy>
          </Stack>

          {showCountdown && (
            <Stack>
              <TypoGraphy variant="h4" className="text-center">
                Redirecting in {secondsLeft} seconds...
              </TypoGraphy>
            </Stack>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default WelcomeUser;
