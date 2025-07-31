import { useEffect, useState } from "react";
import { MAX, MIN } from "./constants";
import './styles.scss'
import { Stack } from "@mui/material";


interface Props{
    value:number;
    onComplete:() => void;
}

const ProgressBar:React.FC<Props> = ({ value = 0, onComplete = () => {} }) => {
  const [percent, setPercent] = useState<number>(value);

  useEffect(() => {
    setPercent(Math.min(Math.max(value, MIN), MAX));

    if (value >= MAX) {
      onComplete();
    }
  }, [value]);

  return (
    <Stack className="progress">
      <span
        style={{
          color: percent > 49 ? "white" : "black"
        }}
      >
        {percent.toFixed()}%
      </span>
      <Stack
        // style={{ width: `${percent}%` }}
        style={{
          transform: `scaleX(${percent / MAX})`,
          transformOrigin: "left"
        }}
        aria-valuemin={MIN}
        aria-valuemax={MAX}
        aria-valuenow={percent}
        role="progressbar"
      />
    </Stack>
  );
}

export default ProgressBar