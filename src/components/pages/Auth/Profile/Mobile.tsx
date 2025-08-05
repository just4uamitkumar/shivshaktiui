import { Stack, TextField, Snackbar, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import Phone from "@mui/icons-material/Phone";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import type { userType } from "../../../shared/Header/type";
import { server } from "../../../../redux/store";
import TypoGraphy from "../../../common/TypoGraphy";
import CustomBtn from "../../../common/Button";
import IconBtn from "../../../common/IconBtn";

interface Props {
  user: Partial<userType> | null;
  onUpdate: () => void;
}

const Mobile: React.FC<Props> = ({ user, onUpdate }) => {
  const [isInput, setInput] = useState<boolean>(false);
  const [mobile, setMobile] = useState<string | null>(null);
  const [addSnack, setAddSnack] = useState(false);
  const [errorSnack, setErrorSnack] = useState(false);

  useEffect(() => {
    if (user?.mobile) {
      setMobile(user.mobile);
    }
  }, [user]);

  const isValidMobile = (item: string) => {
    const regex = /^[6-9]\d{9}$/;
    return regex.test(item);
  };

  const addMobile = async () => {
    try {
      if (!mobile || !isValidMobile(mobile)) {
        setErrorSnack(true);
        return;
      }
      const response = await fetch(`${server}user/${user?._id}/mobile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile: mobile }),
      });

      console.log("Response: Mobile", response);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      await response.json();
      setInput(!isInput);
      onUpdate();
      setAddSnack(true);
    } catch (error) {
      console.error("Error updating user:", error);
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
      {isInput ? (
        <Stack display={"flex"} direction="row" alignItems="center" spacing={1}>
          <TextField
            label="Mobile"
            variant="outlined"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            type="text"
            size="small"
          />
          <IconBtn
            IconComponent={SaveIcon}
            onClick={addMobile}
            iconClass="primary-btn"
          />
          <IconBtn
            IconComponent={CloseIcon}
            onClick={() => setInput(false)}
            iconClass="cancel-btn"
          />
        </Stack>
      ) : (
        <>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Phone />
            <TypoGraphy variant="body1">
              {user?.mobile ?? "Not Available"}
            </TypoGraphy>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <CustomBtn
              variant={"text"}
              text={!user?.mobile ? "Add Number" : "Update Number"}
              btnClass={"primary-btn"}
              onClick={() => setInput(!isInput)}
            />
          </Stack>
        </>
      )}

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
          {"Mobile number updated successfully"}!
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
          {"Mobile number is invalid"}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Mobile;
