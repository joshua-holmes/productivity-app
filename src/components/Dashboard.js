import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import StocksCard from "./StocksCard";
import { useEffect, useState } from "react";
import IncomeExpenseAreaChart from "./IncomeExpenseAreaChart";

function Dashboard({ stockFaves, handleFave, currentMonthYear }) {

    const [ budgetData, setBudgetData ] = useState();

    // Date state & helper variables based off that
    const [ yearMonth, setYearMonth ] = useState(currentMonthYear)
    const yearValue = parseInt(yearMonth.slice(0, 4))
    const monthValue = parseInt(yearMonth.slice(-2))
    const yearToFetch = ( yearValue >= 2021 ? parseInt(yearMonth.slice(2, 4)) - 20 : null )
    const monthNamelist = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
    const monthName = monthNamelist[monthValue - 1];

    const renderedStockFaves = stockFaves.map((obj) => (
        <StocksCard key={obj.id} obj={obj} favedState={1} handleFave={handleFave} />
    ));
    useEffect(() => {
        fetch(`http://localhost:3000/budget/${yearToFetch}`)
        .then(r => r.json())
        .then(data => setBudgetData(data.data))
    }, [yearToFetch])

    function getAllBudgetDataByMonth(budgetData) {
        const returnedArray = [];
        for ( let month in budgetData ) {
            returnedArray.push({
                month: month,
                income: budgetData[month].income.total,
                expenses: budgetData[month].expenses.total,
            })
        }
        return returnedArray;
    }

    return (
        <Grid
            sx={{ flexGrow: 1 }}
            container spacing={3}
            justifyContent="space-evenly"
        >
            <Input
                type="month"
                value={yearMonth}
                onChange={e => setYearMonth(e.target.value)}
                style={{ margin: "10px 0 30px 0" }}
            /><br/>
            <IncomeExpenseAreaChart data={budgetData && getAllBudgetDataByMonth(budgetData)} />
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
