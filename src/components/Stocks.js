import { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

function Stocks() {
  const [stocksData, setStocksData] = useState([]);

  useEffect(() => {
    fetch("https://api.coinstats.app/public/v1/coins?skip=0&limit=10")
      .then((response) => response.json())
      .then((obj) => {
        setStocksData(obj.coins);
      });
  }, []);

  const renderStocks = stocksData.map((obj) => {
    return (
      <Grid key={obj.rank} item xs>
        <Paper elevation={3} sx={{ px: 2, py: 5 }}>
          <Typography variant="h5" gutterBottom>
            {obj.symbol}
          </Typography>
          <Typography>{obj.priceChange1w}</Typography>
        </Paper>
      </Grid>
    );
  });

  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={3}>
      {renderStocks}
    </Grid>
  );
}

export default Stocks;
