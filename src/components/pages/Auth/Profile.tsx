import { Grid, Stack  } from "@mui/material";
import { useEffect, useState } from "react";
import { server } from "../../../redux/store";
import axios from "axios";
import PageBanner from "../../shared/PageBanner";
import type { userType } from "../../shared/Header/type";
import { FaUserCircle } from "react-icons/fa";
import TypoGraphy from "../../common/TypoGraphy";
import Email from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import Mobile from "./Mobile";

const Profile: React.FC = () => {
  const token = localStorage.getItem("token");

  const [user, setUser] = useState<Partial<userType> | null>(null);

  useEffect(() => {
    fetchProfile();
  }, [token]);

  const fetchProfile = async () => {
    try {
      if (token) {
        const response = await axios.get(`${server}user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data?.user);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <PageBanner
        title={
          user?.firstName && user?.lastName
            ? user?.firstName + " " + user?.lastName
            : "Profile"
        }
      />
      <Grid container spacing={2} className="container profile-container">
        <Grid size={4} className="left-side">
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
            justifyContent={"space-between"}
            spacing={1}
          >
            <Mobile user={user} onUpdate={fetchProfile}/>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
