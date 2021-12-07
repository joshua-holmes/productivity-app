import { useState } from "react";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import { useEffect } from "react";
import BudgetList from "./BudgetList";

function Budget() {
    // Data from server
    const [budgetData, setBudgetData] = useState()

    //Data from forms
    const [formExpenseData, setFormExpenseData] = useState({})
    const [formIncomeData, setFormIncomeData] = useState({})

    // error handling
    const [error, setError] = useState({ income: false, expenses: false });
    console.log(error);
    // Current date
    const newDate = new Date();
    const currentMonthValue = newDate.getMonth() + 1;
    const currentYearValue = newDate.getFullYear();

    // Date state & variables based on date state
    const [yearMonth, setYearMonth] = useState(`${currentYearValue}-${currentMonthValue}`);
    const yearValue = parseInt(yearMonth.slice(0, 4))
    const monthValue = parseInt(yearMonth.slice(-2))
    const yearToFetch = ( yearValue >= 2021 ? parseInt(yearMonth.slice(2, 4)) - 20 : null )
    const monthNamelist = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
    const monthName = monthNamelist[monthValue - 1];

    useEffect(() => {
        fetch(`http://localhost:3000/budget/${yearToFetch}`)
        .then(r => r.json())
        .then(data => {
            setBudgetData(data.data)
        })
    }, [yearToFetch])

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
        e.preventDefault();
        setError(() => {
            return {
                ...error,
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
        const form = incomeOrExpenses === "income" ? formIncomeData : formExpenseData
        if ( Object.keys(form).length === 2 ) {
            const newCategories = {
                ...budgetData[monthName][incomeOrExpenses].categories,
                [form.name]: form.amount
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
            setError({
                ...error,
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
    function changeMonth(e) { setYearMonth(e.target.value) }

    return (
        <Grid sx={{ mx: 4 }}>
            <Typography variant="h2">Simple Budget</Typography>

            <Typography variant="h4" gutterBottom>
                Income
            </Typography>

            <Input type="month" value={yearMonth} onChange={changeMonth}/>
            <BudgetList
                incomeOrExpenses="income"
                handleRemove={handleRemove}
                budgetData={budgetData}
                monthName={monthName}
            />
            <FormControl error={error.income}>
                <FormHelperText sx={{ m: 1 }} color="warning">
                    Be sure to enter a unique name and an amount
                </FormHelperText>
                <FormGroup row>
                    <TextField
                        sx={{ m: 1, minWidth: 120 }}
                        id="outlined-basic"
                        label="Income name"
                        variant="outlined"
                        onChange={e => handleChange(e, "income")}
                        name="name"
                        value={formIncomeData.name || ""}
                    />
                    <TextField
                        sx={{ m: 1, minWidth: 120 }}
                        id="outlined-number"
                        label="Amount"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={e => handleChange(e, "income")}
                        name="amount"
                        value={formIncomeData.amount || ""}
                    />
                    <Button
                        onClick={() => handleSubmit("income")}
                        sx={{ m: 1 }}
                        variant="contained"
                    >
                        <AddIcon />
                    </Button>
                </FormGroup>
            </FormControl>

            <Typography variant="h4" gutterBottom>
                Expenses
            </Typography>
            <BudgetList
                incomeOrExpenses="expenses"
                handleRemove={handleRemove}
                budgetData={budgetData}
                monthName={monthName}
            />
            <FormControl error={error.expenses} >
                <FormHelperText sx={{ m: 1 }} color="warning">
                    Be sure to enter a unique name and an amount
                </FormHelperText>

                <FormGroup row>
                    <TextField
                        sx={{ m: 1, minWidth: 120 }}
                        id="outlined-basic"
                        label="Expense name"
                        variant="outlined"
                        name="name"
                        onChange={e => handleChange(e, "expenses")}
                        value={formExpenseData.name || ""}
                    />
                    <TextField
                        sx={{ m: 1, minWidth: 120 }}
                        id="outlined-number"
                        label="Amount"
                        type="number"
                        name="amount"
                        InputLabelProps={{
                                shrink: true,
                        }}
                        onChange={e => handleChange(e, "expenses")}
                        value={formExpenseData.amount || ""}
                    />
                    <Button
                        onClick={() => handleSubmit("expenses")}
                        sx={{ m: 1 }}
                        variant="contained"
                    >
                        <AddIcon />
                    </Button>
                </FormGroup>
            </FormControl>
            <Typography variant="h4" gutterBottom>
                Totals
            </Typography>
            <Typography variant="h5">Income: SET</Typography>
            <Typography variant="h5">Expenses: SET</Typography>
            <Typography variant="h5">Net: SET</Typography>


        </Grid>
            );
        }

        export default Budget;
