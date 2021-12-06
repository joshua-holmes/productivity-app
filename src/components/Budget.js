import { useState } from "react";
// import ListItemContainer from "./ListItem";

import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

function Budget() {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const [incomeNameField, setIncomeNameField] = useState("");
  const [incomeAmountField, setIncomeAmountField] = useState("");

  function handleChangeTextIncome(e) {
    e.preventDefault();
    setIncomeNameField(e.target.value);
  }

  function handleChangeAmountIncome(e) {
    e.preventDefault();
    setIncomeAmountField(e.target.value);
  }

  function handleSubmitIncome() {
    const formInfo = {
      name: incomeNameField,
      amount: incomeAmountField,
    };

    setIncome([...income, formInfo]);
    setIncomeNameField("");
    setIncomeAmountField("");
  }

  function handleIncomeRemove(name) {
    const filteredIncome = income.filter((item) => item.name !== name);
    setIncome(filteredIncome);
  }

  const renderIncome = income.map((inc) => {
    return (
      <ListItem key={income.indexOf(inc)}>
        <ListItemText primary={inc.name} />
        <ListItemText primary={inc.amount} />
        <IconButton onClick={() => handleIncomeRemove(inc.name)}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
    );
  });

  const [expenseNameField, setExpenseNameField] = useState("");
  const [expenseAmountField, setExpenseAmountField] = useState("");

  function handleChangeTextExpense(e) {
    e.preventDefault();
    setExpenseNameField(e.target.value);
  }

  function handleChangeAmountExpense(e) {
    e.preventDefault();
    setExpenseAmountField(e.target.value);
  }

  function handleSubmitExpense() {
    const formInfo = {
      name: expenseNameField,
      amount: expenseAmountField,
    };

    setExpenses([...expenses, formInfo]);
    setExpenseNameField("");
    setExpenseAmountField("");
  }

  function handleExpenseRemove(name) {
    const filteredExpense = expenses.filter((item) => item.name !== name);
    setExpenses(filteredExpense);
  }

  const renderExpenses = expenses.map((exp) => {
    return (
      <ListItem key={expenses.indexOf(exp)}>
        <ListItemText primary={exp.name} />
        <ListItemText primary={exp.amount} />
        <IconButton onClick={() => handleExpenseRemove(exp.name)}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
    );
  });

  return (
    <div>
      <Typography variant="h2">Budget</Typography>

      <Typography variant="h4" gutterBottom>
        Income
      </Typography>
      <List>{renderIncome}</List>
      <FormGroup row>
        <TextField
          sx={{ m: 1, minWidth: 120 }}
          id="outlined-basic"
          label="Income name"
          variant="outlined"
          onChange={handleChangeTextIncome}
          value={incomeNameField}
        />
        <TextField
          sx={{ m: 1, minWidth: 120 }}
          id="outlined-number"
          label="Amount"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChangeAmountIncome}
          value={incomeAmountField}
        />
        <Button onClick={handleSubmitIncome} sx={{ m: 1 }} variant="contained">
          <AddIcon />
        </Button>
      </FormGroup>

      <Typography variant="h4" gutterBottom>
        Expenses
      </Typography>
      <List>{renderExpenses}</List>
      <FormGroup row>
        <TextField
          sx={{ m: 1, minWidth: 120 }}
          id="outlined-basic"
          label="Expense name"
          variant="outlined"
          onChange={handleChangeTextExpense}
          value={expenseNameField}
        />
        <TextField
          sx={{ m: 1, minWidth: 120 }}
          id="outlined-number"
          label="Amount"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChangeAmountExpense}
          value={expenseAmountField}
        />
        <Button onClick={handleSubmitExpense} sx={{ m: 1 }} variant="contained">
          <AddIcon />
        </Button>
      </FormGroup>

      <Typography variant="h4" gutterBottom>
        Totals
      </Typography>
    </div>
  );
}

export default Budget;
