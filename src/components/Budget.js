import { useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import { useEffect } from "react";
import BudgetList from "./BudgetList";
import BudgetFormBody from "./BudgetFormBody";

function Budget() {
    // Data from server
    const [budgetData, setBudgetData] = useState()

    //Data from forms
    const [formExpenseData, setFormExpenseData] = useState({})
    const [formIncomeData, setFormIncomeData] = useState({})

    // error handling
    const [isError, setIsError] = useState({ income: false, expenses: false });

    // Current date
    const newDate = new Date();
    const currentMonthValue = newDate.getMonth() + 1;
    const currentYearValue = newDate.getFullYear();

    // Date state & helper variables based off that
    const [yearMonth, setYearMonth] = useState(`${currentYearValue}-${currentMonthValue}`);
    const yearValue = parseInt(yearMonth.slice(0, 4))
    const monthValue = parseInt(yearMonth.slice(-2))
    const yearToFetch = ( yearValue >= 2021 ? parseInt(yearMonth.slice(2, 4)) - 20 : null )
    const monthNamelist = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
    const monthName = monthNamelist[monthValue - 1];

    // For currency formatting
    let formatAsDollar = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format;

    // Fetch
    useEffect(() => {
        fetch(`http://localhost:3000/budget/${yearToFetch}`)
        .then(r => r.json())
        .then(data => {
            setBudgetData(data.data)
        })
    }, [yearToFetch])

    // Handle functions
    function handleChange(e, incomeOrExpenses) {
        let setFormData;
        let formData;
        if (incomeOrExpenses === "income") {
            setFormData = setFormIncomeData
            formData = formIncomeData
        } else {
            setFormData = setFormExpenseData
            formData = formExpenseData
        }
        // sets income name field state when user types
        setIsError(() => {
            return {
                ...isError,
                [incomeOrExpenses]: false
            }
        });
        setFormData(() => {
            return {
                ...formData,
                [e.target.name]: e.target.value
            }
        });
    }
    function handleSubmit(incomeOrExpenses) {
        const form = ( incomeOrExpenses === "income" ? formIncomeData : formExpenseData )
        if ( Object.keys(form).length === 2 ) {
            const newCategories = {
                ...budgetData[monthName][incomeOrExpenses].categories,
                [form.name]: parseFloat(form.amount)
            }
            const body = {
                data: {
                    ...budgetData,
                }
            }
            body.data[monthName][incomeOrExpenses].categories = newCategories
            const config = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(body),
            }
            fetch(`http://localhost:3000/budget/${yearToFetch}`, config)
            .then(r => r.json())
            .then(data => {
                setBudgetData(data.data)
                setFormIncomeData({})
                setFormExpenseData({})
            })
        } else {
            setIsError({
                ...isError,
                [incomeOrExpenses]: true
            })
        }
    }
    function handleRemove(name, incomeOrExpenses) {
        // gives functionality to the trash icon button
        const categories = budgetData[monthName][incomeOrExpenses].categories;
        const newCategories = {}
        for ( let item in categories ) {
            if ( name !== item ) {
                newCategories[item] = categories[item];
            }
        }
        const body = {
            data: {
                ...budgetData,
            }
        }
        body.data[monthName][incomeOrExpenses].categories = newCategories
        const config = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(body),
        }
        fetch(`http://localhost:3000/budget/${yearToFetch}`, config)
        .then(r => r.json())
        .then(data => setBudgetData(data.data))
    }

    // Get totals for month
    function getTotals(monthlyData) {
        const returnedObject = {}
        let netSum = 0;
        for ( let incomeOrExpenses in monthlyData ) {
            const categories = monthlyData[incomeOrExpenses].categories;
            let sum = 0;
            for ( let item in categories ) {
                sum += categories[item];
            }
            returnedObject[incomeOrExpenses] = sum;
            netSum += ( incomeOrExpenses === "income" ? sum : - sum );
        }
        returnedObject.net = netSum;
        return returnedObject;
    }

    const total = budgetData ? getTotals(budgetData[monthName]) : {}

    return (
        <Grid sx={{ mx: 4 }}>
            <Typography variant="h2">Simple Budget</Typography>
            <Input
                type="month"
                value={yearMonth}
                onChange={e => setYearMonth(e.target.value)}
                style={{ margin: "10px 0 30px 0" }}
            /><br/>

            <Typography variant="h4" gutterBottom>
                Income
            </Typography>
            <BudgetList
                incomeOrExpenses="income"
                handleRemove={handleRemove}
                budgetData={budgetData}
                monthName={monthName}
            />
            <BudgetFormBody
                incomeOrExpenses="income"
                isError={isError}
                formData={formIncomeData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />

            <Typography variant="h4" gutterBottom>
                Expenses
            </Typography>
            <BudgetList
                incomeOrExpenses="expenses"
                handleRemove={handleRemove}
                budgetData={budgetData}
                monthName={monthName}
            />
            <BudgetFormBody
                incomeOrExpenses="expenses"
                isError={isError}
                formData={formExpenseData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />

            <Typography variant="h4" gutterBottom>Totals</Typography>
            <Typography variant="h5">
                Income: {budgetData ? formatAsDollar(total.income) : "loading..."}
            </Typography>
            <Typography variant="h5">
                Expenses: {budgetData ? formatAsDollar(total.expenses) : "loading..."}
            </Typography>
            <Typography
                style={{ color: total.net < 0 ? "red" : "green" }}
                variant="h5"
            >
                Net: {budgetData ? formatAsDollar(total.net) : "loading..."}
            </Typography>

        </Grid>
            );
        }

export default Budget;
