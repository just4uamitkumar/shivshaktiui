import { Grid, Stack } from "@mui/material";
import PageBanner from "../../../shared/PageBanner";
import TypoGraphy from "../../../common/TypoGraphy";
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { server } from "../../../../redux/store";
import CustomBtn from "../../../common/Button";

const VerifyEmail: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [resendStatus, setResendStatus] = useState<string>("");
  const [resStatusText, setStatusText] = useState<string | null>(null);
  const { token } = useParams();
  const navigate = useNavigate();
  const hasVerified = useRef(false);
  const userEmail = localStorage.getItem("pendingEmail");

  useEffect(() => {
    if (token && !hasVerified.current) {
      hasVerified.current = true;
      verifyEmail(token as string);
    }
  }, [token]);

  useEffect(() => {
    if (resStatusText === "OK") {
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 5000);
    }
  }, [message]);

  const verifyEmail = async (myToken: string) => {
    try {
      const response = await axios.get(`${server}user/verify-email/${myToken}`);
      if (response.status === 200) {
        setMessage(response.data.message || "Email verified successfully!");
        setStatusText(response.statusText);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.message || "Verification failed.");
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
  };

  const resendEmail = async () => {
    try {
      const response = await axios.post(`${server}user/resend-verification`, {
        email: userEmail,
      });
      setResendStatus(response.data.message || "Verification email resent!");
    } catch (error) {
      console.error("Resend error:", error);
      if (axios.isAxiosError(error)) {
        setResendStatus(error.response?.data?.message || "Resend failed.");
      } else {
        setResendStatus("Unexpected error occurred.");
      }
    }
  };

  return (
    <>
      <PageBanner title={"Verify Email"} />

      <Grid className="container pb-4 pt-4" spacing={3} container>
        <Grid size={12}>
          <Stack className="mb-2">
            <TypoGraphy variant="h4">Your Email Verification Status</TypoGraphy>
          </Stack>
          <Stack className="mb-2">
            <TypoGraphy variant="h5">{message}</TypoGraphy>
          </Stack>
          {message === "Verification failed." && (
            <>
              <Stack className="mb-2">
                <TypoGraphy variant="body1">{resendStatus}</TypoGraphy>
              </Stack>
              <Stack
                spacing={2}
                className="text-center"
                display={"inline-block"}
              >
                <CustomBtn
                  variant={"contained"}
                  text={"Resend Verification Email"}
                  btnClass={"primary-btn"}
                  onClick={resendEmail}
                />
              </Stack>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default VerifyEmail;
