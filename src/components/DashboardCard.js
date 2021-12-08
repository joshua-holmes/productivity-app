import Paper from "@mui/material/Paper";


function DashboardCard({children}){
return (
      <Paper elevation={3}>
        {children}
      </Paper>
)
}

export default DashboardCard