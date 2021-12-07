import StocksCard from "./StocksCard";

import Grid from "@mui/material/Grid";

function Stocks( { stocksData, stockFaves, handleFave } ) {

  const renderStocks = stocksData.map((obj) => {
    return (
      <StocksCard key={obj.id} obj={obj} handleFave={handleFave} 
      favedState={stockFaves.find(item => item.id === obj.id) === undefined ? 0 : 1} />
      // if our stock is favorited, render its default as such
    );
  });

  return (
    <Grid    justifyContent="space-evenly"
sx={{ flexGrow: 1 }} container spacing={3}>
      {renderStocks}
    </Grid>
  );
}

export default Stocks;
