import "./styles.scss";
import { Stack, Grid } from "@mui/material";
import CustomBtn from "../../common/Button";
import SkipPrevious from "@mui/icons-material/SkipPrevious";

interface Props {
  title?: string;
  isleftSection?: boolean;
  handleBack?: () => void;
}

const PageBanner: React.FC<Props> = ({ title, isleftSection, handleBack }) => {
  return (
    <>
      <Grid className="pageBanner" container>
        {isleftSection ? (
          <Grid
            className="container"
            justifyContent={"space-between"}
            display={"flex"}
          >
            <Stack>
              <CustomBtn
                btnClass="primary-btn"
                startIcon={<SkipPrevious />}
                text="Back"
                onClick={handleBack}
              />
            </Stack>

            <Stack className="pageTitle">{title}</Stack>
          </Grid>
        ) : (
          <Grid className="container">
            <Stack className="pageTitle">{title}</Stack>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default PageBanner;
