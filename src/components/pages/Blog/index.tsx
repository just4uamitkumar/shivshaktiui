import { Grid, Stack } from "@mui/material";

import PageBanner from "../../shared/PageBanner";

const Blog: React.FC = () => {
  return (
    <>
      <PageBanner title={"Blog"} />

      <Grid className="container pb-4 pt-4" spacing={3} container>
        <Grid size={12}>
          <Stack className="text-center">{"Page is under progress"}</Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default Blog;
