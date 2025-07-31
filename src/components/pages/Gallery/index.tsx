import { Grid, Stack } from "@mui/material";

import PageBanner from "../../shared/PageBanner";
import { useEffect, useState } from "react";
import ProgressBar from "../../shared/ProgressBar";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { decrement, increment } from "../../../features/counter";

const Gallery: React.FC = () => {
  const [value, setValue] = useState<number>(0);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    setInterval(() => {
      setValue((val) => val + 0.1);
    }, 20);
  }, []);

  const count = useAppSelector(
    (state: { counter: { value: number } }) => state.counter.value
  );
  const dispatch = useAppDispatch();

  return (
    <>
      <PageBanner title={"Gallery"} />

      <Grid className="container pb-4 pt-4" spacing={3} container>
        <Grid size={12}>
          <ProgressBar value={value} onComplete={() => setSuccess(true)} />
          <Stack className="text-center">
            {success ? "Complete!" : "Loading..."}
          </Stack>
        </Grid>
        <Grid>
          <Stack component={"h2"}>{`Count: ${count}`}</Stack>
          <Stack direction="row" spacing={2}>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
          </Stack>
        </Grid>
      </Grid>


      
      {/* <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnack}
          severity="success"
          variant="filled"
        >
          {"Successfully Registered!"}
        </Alert>
      </Snackbar> */}
    </>
  );
};

export default Gallery;
