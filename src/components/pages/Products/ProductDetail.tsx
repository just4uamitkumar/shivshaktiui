import { Grid, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { ProductType } from "./type";
import PageBanner from "../../shared/PageBanner";
import TypoGraphy from "../../common/TypoGraphy";
import { getOriginalPrice } from "../../../utils/commonFunc";
import Loader from "../../shared/Loader";
import React from "react";

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [data, setData] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      getProduct();
    }
  }, [id]);

  const getProduct = async () => {
    setLoading(true);
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    setData(response?.data);
    setLoading(false);
  };

  return (
    <>
      <PageBanner title={data ? data.title : "Product Detail"} />
      <Grid size={12} className="container" container>
        <Grid
          size={12}
          className="ProductDetail"
          flexDirection={"row"}
          display={"flex"}
        >
          {loading ? (
            <Loader />
          ) : (
            <>
              <Grid size={4}>
                <Stack className="img-wrap">
                  {data && data.images && data.images.length > 0 && (
                    <img src={data.images[0]} alt={data.title} />
                  )}
                </Stack>
              </Grid>
              <Grid size={8} className="content-wrap">
                <Stack>
                  <TypoGraphy variant="h4">{data?.title}</TypoGraphy>
                </Stack>
                <Stack className="price" direction={"row"} display={"flex"}>
                  <Stack className="mr-2 buyPrice">
                    <TypoGraphy variant="body1" typeClass="semi-bold-font">
                      ${data?.price}
                    </TypoGraphy>
                  </Stack>
                  <Stack className="mr-2 line-through">
                    <TypoGraphy variant="body1">
                      {data &&
                        getOriginalPrice(
                          data?.discountPercentage,
                          data?.price
                        ).toFixed(2)}
                    </TypoGraphy>
                  </Stack>
                  <Stack className="green500">
                    <TypoGraphy variant="body1" typeClass="orange">
                      {`${data?.discountPercentage}% off`}
                    </TypoGraphy>
                  </Stack>
                </Stack>
                <Stack direction={"row"} display={"flex"}>
                  <Stack className="mr-2" direction={"row"}>
                    <TypoGraphy variant="body1">
                      {"Category : "}
                      {data?.category}
                    </TypoGraphy>
                  </Stack>
                  <Stack direction={"row"}>
                    <TypoGraphy variant="body1">
                      {"Brand : "}
                      {data?.brand}
                    </TypoGraphy>
                  </Stack>
                </Stack>
                <Stack className="shippingInfo">
                  <TypoGraphy variant="body1">
                    {data?.shippingInformation}
                  </TypoGraphy>
                </Stack>
                <Stack>
                  <TypoGraphy variant="body1">
                    <strong>{"Availability : "}</strong>
                    {data?.availabilityStatus}
                  </TypoGraphy>
                </Stack>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default React.memo(ProductDetail);
