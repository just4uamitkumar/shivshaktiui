import { Grid } from "@mui/material";
import type { userType } from "../../../shared/Header/type";
import { useEffect, useState } from "react";
import { server } from "../../../../redux/store";
import axios from "axios";
import PageBanner from "../../../shared/PageBanner";
import ProfileLeft from "../Profile/ProfileLeft";
import ProfileRight from "./ProfileRight";
const AccountSettings: React.FC = () => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState<userType | null>(null);

  useEffect(() => {
    fetchProfile();
  }, [token]);

  useEffect(() => {
    if (user?.isVerified) {
      localStorage.removeItem("pendingEmail");
    }
  }, [user]);

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
        title={'Account Settings'}
      />
      <Grid container spacing={2} className="container profile-container">
        <Grid size={4} className="left-side">
          <ProfileLeft user={user} />
        </Grid>
        <Grid size={8} className="right-side mt-2">
          <ProfileRight user={user} fetchProfile={fetchProfile} />
        </Grid>
      </Grid>
    </>
  );
};

export default AccountSettings;
