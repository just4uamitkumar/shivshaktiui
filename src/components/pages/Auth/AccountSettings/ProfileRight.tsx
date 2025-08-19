import { memo } from "react";
import type { userType } from "../../../shared/Header/type";
import Address from "./Address";
import ChangePassword from "./ChangePassword";
import Mobile from "./Mobile";


interface Props {
  user: userType | null;
  fetchProfile: () => void;
}

const ProfileRight: React.FC<Props> = ({ user, fetchProfile }) => {
  return (
    <>
      <Address user={user} />
      <Mobile user={user} onUpdate={fetchProfile} />
      <ChangePassword user={user} onUpdate={fetchProfile} />
    </>
  );
};

export default memo(ProfileRight);
