import { Stack, Grid } from "@mui/material";
import { memo, useEffect, useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import type { userType } from "../../../shared/Header/type";
import TypoGraphy from "../../../common/TypoGraphy";
import dayjs from "dayjs";

interface Props {
  user: Partial<userType> | null;
}

const Age: React.FC<Props> = ({ user }) => {
  const [age, setAge] = useState<number | null>(null);

  useEffect(() => {
    if (user?.birthDate) {
      setAge(dayjs().diff(dayjs(user.birthDate), "year"));
    }
  }, [user]);

  return (
    <>
      <Grid container spacing={2} className="mb-4">
        <Grid size={3}>
          <Stack direction="row" alignItems="center">
            <AccessTimeIcon /> 
            <TypoGraphy variant="body1" className="semi-bold-font">
              {"Age"}
            </TypoGraphy>
          </Stack>
        </Grid>
        <Grid size={9}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <TypoGraphy variant="body1" className="semi-bold-font">
              {user?.birthDate ? age : "Not Available"}
            </TypoGraphy>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default memo(Age);
