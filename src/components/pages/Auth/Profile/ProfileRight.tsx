import { Stack } from "@mui/material";
import type { userType } from "../../../shared/Header/type";
import Address from "./Address";

interface Props {
  user: userType | null;
}

const ProfileRight: React.FC<Props> = ({ user }) => {
  return (
    <>
      <Stack className="profile-details mt-2">
        <Stack direction="row" alignItems="center" spacing={1}>
          <Stack
            direction="row"
            alignItems="flex-start"
            spacing={1}
            className="mb-2 mt-2"
            justifyContent={"flex-start"}
          >
            <Address user={user} />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default ProfileRight;
