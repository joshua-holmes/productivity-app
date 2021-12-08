import { useState } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function StocksCard({ obj, handleFave, favedState }) {
  const [faved, setFaved] = useState(favedState);
  const [changeTime, setTime] = useState("Hour");

  function handleClick(e) {
    setTime(e.target.value);
  }

  let change;
  if (changeTime === "Hour") {
    change = obj.priceChange1h;
  } else if (changeTime === "Day") {
    change = obj.priceChange1d;
  } else if (changeTime === "Week") {
    change = obj.priceChange1w;
  }

  // formats dollar amounts
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Paper elevation={3} sx={{ px: 2, py: 3 }}>
        <Stack alignItems='center' sx={{ pb: 1 }} direction="row" justifyContent="center" spacing={4}>
          <Avatar alt={obj.name} src={obj.icon} />
          <Typography variant="h4">{obj.symbol}</Typography>
          <Rating
            name="simple-controlled"
            max={1}
            value={faved}
            onChange={(event, newValue) => {
              setFaved(newValue);
              handleFave(obj, newValue);
            }}
          />
        </Stack>

        <Typography variant="h5">{formatter.format(obj.price)}</Typography>
        <Typography color={change < 0 ? "red" : "green"} gutterBottom>{change} %</Typography>
        <Stack direction="row" justifyContent="center" spacing={1} >
          <Button
            variant={changeTime === "Hour" ? "contained" : "outlined"}
            value="Hour"
            onClick={handleClick}
          >
            Hour
          </Button>
          <Button
            variant={changeTime === "Day" ? "contained" : "outlined"}
            value="Day"
            onClick={handleClick}
          >
            Day
          </Button>
          <Button
            variant={changeTime === "Week" ? "contained" : "outlined"}
            value="Week"
            onClick={handleClick}
          >
            Week
          </Button>
        </Stack>
      </Paper>
    </Grid>
  );
}

export default StocksCard;
