import { Stack } from "@mui/material";
import type { userType } from "../../../shared/Header/type";
import { memo, useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Email from "@mui/icons-material/Email";
import TypoGraphy from "../../../common/TypoGraphy";
import PersonIcon from "@mui/icons-material/Person";
import TrolleyIcon from "@mui/icons-material/Trolley";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import dayjs from "dayjs";

interface Props {
  user: userType | null;
}

const ProfileLeft: React.FC<Props> = ({ user }) => {
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    if (user?.role === "admin") {
      setRole("Admin");
    }
    if (user?.role === "superAdmin") {
      setRole("Super Admin");
    }
    if (user?.role === "proUser") {
      setRole("Pro User");
    }
    if (user?.role === "user") {
      setRole("User");
    }
  }, [user]);
  
  return (
    <>
      <Stack className="profile-image ">
        {user?.profilePic ? (
          <img
            src={user?.profilePic}
            alt={user?.firstName ?? "Profile Picture"}
          />
        ) : (
          <FaUserCircle />
        )}
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        className="mb-2 mt-2"
      >
        <Email />
        <TypoGraphy variant="body1">
          {user?.email ?? "Not Available"}
        </TypoGraphy>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        className="mb-2 mt-2"
      >
        <PersonIcon />
        <TypoGraphy variant="body1">
          {user?.firstName} {user?.lastName}
        </TypoGraphy>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        className="mb-2 mt-2"
      >
        <TrolleyIcon />
        <TypoGraphy variant="body1">{role ?? "Not Available"}</TypoGraphy>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        className="mb-2 mt-2"
      >
        <AccessTimeIcon />
        <TypoGraphy variant="body1">
          {"Member since : "}
          {user?.createdAt
            ? dayjs(user.createdAt).format("MMMM D, YYYY")
            : "Not Available"}
        </TypoGraphy>
      </Stack>
    </>
  );
};

export default memo(ProfileLeft);
