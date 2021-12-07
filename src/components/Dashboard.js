import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';


function Dashboard() {
  return (
      <Grid sx={{ flexGrow: 1 }} container spacing={3}>
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
          <Grid item xs>
              <Paper elevation={3} sx={{ px: 2, py: 5 }}>
                      <Typography variant="h5" gutterBottom>Testing</Typography>
                      <Typography>Testing</Typography>
              </Paper>
          </Grid>
         
      </Grid>
  );
}

export default Dashboard;
