import { memo } from "react";
import BirthDate from "./BirthDate";
import type { userType } from "../../../shared/Header/type";
import Age from "./Age";

interface Props {
  user: userType | null;
  fetchProfile: () => void;
}

const ProfileRight: React.FC<Props> = ({ user, fetchProfile }) => {
  return (
    <>
      <BirthDate user={user} onUpdate={fetchProfile} />
      <Age user={user} />
    </>
  );
};

export default memo(ProfileRight);
