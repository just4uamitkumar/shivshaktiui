import { Stack, Snackbar, Alert, Grid } from "@mui/material";
import { memo, useEffect, useState } from "react";
import CakeIcon from "@mui/icons-material/Cake";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import type { userType } from "../../../shared/Header/type";
import { server } from "../../../../redux/store";
import TypoGraphy from "../../../common/TypoGraphy";
import CustomBtn from "../../../common/Button";
import IconBtn from "../../../common/IconBtn";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";

interface Props {
  user: Partial<userType> | null;
  onUpdate: () => void;
}

const BirthDate: React.FC<Props> = ({ user, onUpdate }) => {
  const [isInput, setInput] = useState<boolean>(false);
  const [dob, setDob] = useState<string | null>(null);
  const [addSnack, setAddSnack] = useState(false);
  const [errorSnack, setErrorSnack] = useState(false);
  const [snackMSG, setSnackMsg] = useState<string>("");
  const yourToken = localStorage.getItem("token");

  useEffect(() => {
    if (user?.birthDate) {
      setDob(user.birthDate);
    }
  }, [user]);

  const today = dayjs();
  const maxBirthDate = dayjs().year(today.year() - 15);

  const addBirthDate = async () => {
    if (!dob) {
      setErrorSnack(true);
      return;
    }

    axios
      .patch(
        `${server}user/${user?._id}/birthDate`,
        { birthDate: dob },
        {
          headers: {
            Authorization: `Bearer ${yourToken}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setInput(!isInput);
          setSnackMsg(response.data.message);
          setAddSnack(true);
          onUpdate();
        }
      })
      .catch((error) => {
        console.error("Full error object:", error);
        const errorMsg =
          error.response?.data?.message ||
          error.message ||
          "Something went wrong";
        setErrorSnack(true);
        setInput(!isInput);
        setSnackMsg(errorMsg);
      });
  };

  const handleChange = (newValue: dayjs.Dayjs | null) => {
    if (newValue && newValue.isValid()) {
      console.log("newValue", newValue);
      console.log("newValue", newValue.format("DD-MM-YYYY"));
      setDob(newValue.format("DD-MM-YYYY"));
    } else {
      setDob(null);
    }
  };

  const handleAddSnack = (
    _event: React.SyntheticEvent | Event,
    reason: string
  ): void => {
    if (reason === "clickaway") return;
    setAddSnack(false);
  };

  const handleErrorSnack = (
    _event: React.SyntheticEvent | Event,
    reason: string
  ): void => {
    if (reason === "clickaway") return;
    setErrorSnack(false);
  };

  return (
    <>
      <Grid container spacing={2} className="mb-4">
        <Grid size={3}>
          <Stack direction="row" alignItems="center">
            <CakeIcon />
            <TypoGraphy variant="body1" className="semi-bold-font">
              {"Birth Date"}
            </TypoGraphy>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <CustomBtn
              variant={"text"}
              text={!user?.birthDate ? "Add Birth Date" : "Update Birth Date"}
              btnClass={"primary-btn"}
              onClick={() => setInput(!isInput)}
            />
          </Stack>
        </Grid>
        <Grid size={9}>
          {isInput ? (
            <Stack
              display={"flex"}
              direction="row"
              alignItems="center"
              spacing={1}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    value={dob ? dayjs(dob) : null}
                    onChange={handleChange}
                    defaultValue={dob ? dayjs(dob) : undefined}
                    maxDate={maxBirthDate}
                    disableFuture
                    slotProps={{
                      textField: {
                        helperText: "You must be at least 15 years old",
                      },
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <IconBtn
                IconComponent={SaveIcon}
                onClick={addBirthDate}
                iconClass="primary-btn"
              />
              <IconBtn
                IconComponent={CloseIcon}
                onClick={() => setInput(false)}
                iconClass="cancel-btn"
              />
            </Stack>
          ) : (
            <Stack direction="row" alignItems="center" spacing={1}>
              <TypoGraphy variant="body1">
                {dob ? dayjs(dob).format("MMMM D, YYYY") : "Not Available"}
              </TypoGraphy>
            </Stack>
          )}
        </Grid>
      </Grid>

      <Snackbar
        open={addSnack}
        autoHideDuration={4000}
        onClose={handleAddSnack}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setAddSnack(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackMSG}!
        </Alert>
      </Snackbar>

      <Snackbar
        open={errorSnack}
        autoHideDuration={4000}
        onClose={handleErrorSnack}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setErrorSnack(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackMSG}
        </Alert>
      </Snackbar>
    </>
  );
};

export default memo(BirthDate);
