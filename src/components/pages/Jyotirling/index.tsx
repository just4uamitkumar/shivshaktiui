import { Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
  type RootState,
} from "../../../redux/store";
import { getJyotirling } from "../../../features/jyotirling/action";
import type { JyotirliingType } from "../../../features/jyotirling/type";
import Loader from "../../shared/Loader";
import PageBanner from "../../shared/PageBanner";
import Temple from "./Temple";
import { useViewportWidth } from "../../../utils/hooks";
import { smallDesktop } from "../../../utils/constants";

const Jyotirling: React.FC = () => {
  const windowWidth = useViewportWidth();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: RootState) => state.jyotirling);
  const [data, setData] = useState<JyotirliingType[]>([]);

  const getJyotirlingData = useCallback(() => {
    dispatch(getJyotirling()).then((response) => {
      if (response.meta.requestStatus === "fulfilled") {
        setData(response.payload as JyotirliingType[]);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    getJyotirlingData();
  }, [getJyotirlingData]);

  return (
    <>
      <PageBanner title={"Jyotirling"} />

      <Grid
        className="container pb-4 pt-4"
        spacing={windowWidth > smallDesktop ? 4 : 2}
        container
      >
        {loading ? (
          <Grid size={12} className="text-center">
            <Loader />
          </Grid>
        ) : (
          data &&
          data.length > 0 &&
          data.map((item: JyotirliingType) => (
            <Temple
              key={item?._id}
              id={item?._id}
              imgPath={item?.imgPath}
              name={item?.name}
              city={item?.city}
              state={item?.state}
              description={item?.description}
              longitude={item?.location?.longitude}
              latitude={item?.location?.latitude}
            />
          ))
        )}
      </Grid>
    </>
  );
};

export default Jyotirling;
