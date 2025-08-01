import { Grid, Stack } from "@mui/material";

import PageBanner from "../../shared/PageBanner";
import TypoGraphy from "../../common/TypoGraphy";

const NotFound: React.FC = () => {
  return (
    <>
      <PageBanner title={"Not Available"} />

      <Grid className="container pb-4 pt-4" spacing={3} container>
        <Grid size={12}>
          
          <Stack className="text-center">
            <TypoGraphy variant="h2" className="mb-3">
              404
            </TypoGraphy>
            {"Page you are trying to access is not available"}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default NotFound;
