import Grid from "@mui/material/Grid";

import StocksCard from "./StocksCard";

function Dashboard({ stockFaves, handleFave }) {

  const renderedStockFaves = stockFaves.map((obj) => (
    <StocksCard key={obj.id} obj={obj} favedState={1} handleFave={handleFave} />
  ));

  

  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={3}   justifyContent="space-evenly"
    >
      {renderedStockFaves}

      {/* <Grid item xs>
              <Paper elevation={3} sx={{ px: 2, py: 5 }}>
                      <Typography variant="h5" gutterBottom>Testing</Typography>
                      <Typography>Testing</Typography>
              </Paper>
          </Grid>
          <Grid item xs>
              <Paper elevation={3} sx={{ px: 2, py: 5 }}>
                      <Typography variant="h5" gutterBottom>Testing</Typography>
                      <Typography>Testing</Typography>
              </Paper>
          </Grid>
          <Grid item xs>
              <Paper elevation={3} sx={{ px: 2, py: 5 }}>
                      <Typography variant="h5" gutterBottom>Testing</Typography>
                      <Typography>Testing</Typography>
              </Paper>
          </Grid>
          <Grid item xs>
              <Paper elevation={3} sx={{ px: 2, py: 5 }}>
                      <Typography variant="h5" gutterBottom>Testing</Typography>
                      <Typography>Testing</Typography>
              </Paper>
          </Grid>
          */}
    </Grid>
  );
}

export default Dashboard;
