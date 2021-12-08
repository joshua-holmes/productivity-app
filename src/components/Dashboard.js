import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import StocksCard from "./StocksCard";
import IncomeExpensesPieChart from "./IncomeExpensesPieChart";
import { useEffect, useState } from "react";
import IncomeExpenseAreaChart from "./IncomeExpenseAreaChart";
import Container from "@mui/material/Container";
import { ResponsiveContainer } from "recharts";

import DashboardCard from "./DashboardCard";
import { Typography } from "@mui/material";

function Dashboard({ stockFaves, handleFave, currentMonthYear }) {
  const [budgetData, setBudgetData] = useState();

  // Date state & helper variables based off that
  const [yearMonth, setYearMonth] = useState(currentMonthYear);
  const yearValue = parseInt(yearMonth.slice(0, 4));
  const monthValue = parseInt(yearMonth.slice(-2));
  const yearToFetch =
    yearValue >= 2021 ? parseInt(yearMonth.slice(2, 4)) - 20 : null;
  const monthNamelist = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = monthNamelist[monthValue - 1];

  const renderedStockFaves = stockFaves.map((obj) => (
    <StocksCard key={obj.id} obj={obj} favedState={1} handleFave={handleFave} />
  ));
  useEffect(() => {
    fetch(`http://localhost:3000/budget/${yearToFetch}`)
      .then((r) => r.json())
      .then((data) => setBudgetData(data.data));
  }, [yearToFetch]);

  function getAllBudgetDataByMonth(budgetData) {
    const returnedArray = [];
    for (let month in budgetData) {
      returnedArray.push({
        month: month,
        income: budgetData[month].income.total,
        expenses: budgetData[month].expenses.total,
      });
    }
    return returnedArray;
  }


  return (
    <>
        <Input
            type="month"
            value={yearMonth}
            onChange={(e) => setYearMonth(e.target.value)}
            style={{ margin: "10px 0 30px 0" }}
        />
        <Grid
            sx={{ flexGrow: 1 }}
            container
            spacing={3}
            justifyContent="space-evenly"
        >
            <IncomeExpensesPieChart
                budgetData={budgetData}
                monthName={monthName}
                incomeOrExpenses="expenses"
            />
            <IncomeExpensesPieChart
                budgetData={budgetData}
                monthName={monthName}
                incomeOrExpenses="income"
            />

            {renderedStockFaves}

            <Grid item xs={12} md={8} lg={6}>
                <DashboardCard>
                    <Container sx={{ py: 3 }}>
                        <Typography gutterBottom variant="h5">Graph Title</Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <IncomeExpenseAreaChart
                                data={budgetData && getAllBudgetDataByMonth(budgetData)}
                            />
                        </ResponsiveContainer>
                    </Container>
                </DashboardCard>
            </Grid>
        </Grid>
    </>
  );
}

export default Dashboard;
