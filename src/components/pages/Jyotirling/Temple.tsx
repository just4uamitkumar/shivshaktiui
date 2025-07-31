import React from "react";
import { Grid, Stack } from "@mui/material";
import TypoGraphy from "../../common/TypoGraphy";
import CustomBtn from "../../common/Button";
import { navigateUrl, truncateText } from "../../../utils/commonFunc";
import { useViewportWidth } from "../../../utils/hooks";
import { tablet } from "../../../utils/constants";

interface Props {
  id: string;
  name: string;
  city: string;
  state: string;
  imgPath: string;
  description: string;
  latitude?: number;
  longitude?: number;
}

const Temple: React.FC<Props> = ({
  id,
  name,
  city,
  state,
  imgPath,
  description,
  latitude,
  longitude,
}) => {
  const windowWidth = useViewportWidth();
  
  return (
    <>
      <Grid size={windowWidth > tablet ? 6 : 12} className="pb-4 pt-2" key={id}>
        <Stack className="img-wrap">
          <img src={imgPath} alt={name} />
        </Stack>
        <Stack className={windowWidth > tablet ? "pt-2 pb-2" : "pt-1 pb-1"}>
          <TypoGraphy variant="h4">{name}</TypoGraphy>
        </Stack>
        <Stack className="secondary-text">
          <TypoGraphy variant="body1">
            <span className="mr-3">
              <strong>State : </strong>
              {state}
            </span>
            <span>
              <strong>City : </strong>
              {city}
            </span>
          </TypoGraphy>
        </Stack>
        <Stack className={windowWidth > tablet ? "pt-2 pb-2" : "pt-1 pb-1"}>
          <TypoGraphy variant="body1" typeClass={"regular-font"}>
            <strong>Location :</strong>{" "}
            <CustomBtn
              variant={"text"}
              text={"Open in Google Maps"}
              btnClass={"primary-btn"}
              onClick={() =>
                navigateUrl(
                  `https://www.google.com/maps?q=${latitude},${longitude}`
                )
              }
            />
          </TypoGraphy>
        </Stack>
        <Stack className={windowWidth > tablet ? "pb-2" : "pb-1"}>
          <TypoGraphy variant={"body1"}>
            {truncateText(description, 320)}
          </TypoGraphy>
        </Stack>
        <Grid>
          <CustomBtn
            variant={"contained"}
            text={"Read More"}
            btnClass={"primary-btn"}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default React.memo(Temple);
