import { Grid, Stack } from "@mui/material";
import TypoGraphy from "../../common/TypoGraphy";
import React from "react";

interface Props {
  title: string;
  category: string;
  description: string;
  image: string;
  price: number;
  rating: { count: number; rate: number };
}

const Product: React.FC<Props> = ({
  title,
  category,
  description,
  image,
  price,
  rating,
}) => {
  return (
    <>
      <Grid size={4} className="ProductCard">
        <Stack className="title">
          <TypoGraphy variant="h4">{title}</TypoGraphy>
        </Stack>
        <Stack className="imgWrapper">
          <img src={image} alt={title} />
        </Stack>
        <Stack className="description">
          <TypoGraphy variant="body1">{description}</TypoGraphy>
        </Stack>
        <Stack className="price">
          <TypoGraphy variant="body1" typeClass="semi-bold-font">
            $ {price}
          </TypoGraphy>
        </Stack>
        <Stack className="category">
          <TypoGraphy variant="body1">
            {"Category : "}
            {category}
          </TypoGraphy>
        </Stack>
        <Stack direction={"row"} display={"flex"}>
          <Stack direction={"row"}>
            <TypoGraphy variant="body1">
              {"Rating : "}
              {rating.rate}
            </TypoGraphy>
          </Stack>
        </Stack>
      </Grid>
    </>
  );
};

export default React.memo(Product);
