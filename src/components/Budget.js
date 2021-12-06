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
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { TableCell, TableContainer, TableRow, Table } from "@mui/material";

function Budget() {
  const [income, setIncome] = useState([]); // stores incomes
  const [expenses, setExpenses] = useState([]); // stores expenses

  const [incomeNameField, setIncomeNameField] = useState(""); // controls income name field
  const [incomeAmountField, setIncomeAmountField] = useState(""); // controls income amount field

  const [expenseNameField, setExpenseNameField] = useState("");
  const [expenseAmountField, setExpenseAmountField] = useState("");

  const [errorIn, setErrorIn] = useState(false); // error handling
  const [errorExp, setErrorExp] = useState(false);

  function handleChangeTextIncome(e) {
    // sets income name field state when user types
    e.preventDefault();
    setErrorIn(false);
    setIncomeNameField(e.target.value);
  }

  function handleChangeTextExpense(e) {
    e.preventDefault();
    setExpenseNameField(e.target.value);
  }

  function handleChangeAmountIncome(e) {
    // sets income amount field state when user types
    e.preventDefault();
    setErrorIn(false);
    setIncomeAmountField(e.target.value);
  }

  function handleChangeAmountExpense(e) {
    e.preventDefault();
    setErrorExp(false);
    setExpenseAmountField(e.target.value);
  }

  function handleSubmitIncome() {
    // updates income state upon submit
    const formInfo = {
      name: incomeNameField,
      amount: incomeAmountField,
    };
    const checkDup = income.find((obj) => obj.name === formInfo.name);

    if (formInfo.amount !== "" && formInfo.name !== "") {
      if (checkDup === undefined) {
        setIncome([...income, formInfo]);
        setIncomeNameField(""); // resets fields after submit
        setIncomeAmountField("");
      } else {
        alert("duplicate!"); // do something if name is duplicated
      }
    } else {
      if (formInfo.amount === "") {
        // alert("specify amount"); // do something if not specified, like shake or turn red
        setErrorIn(true);
      }
      if (formInfo.name === "") {
        // alert("specify name"); // do something if not specified, like shake or turn red
        setErrorIn(true);
      }
    }
  }

  function handleSubmitExpense() {
    const formInfo = {
      name: expenseNameField,
      amount: expenseAmountField,
    };
    const checkDup = expenses.find((obj) => obj.name === formInfo.name);

    if (formInfo.amount !== "" && formInfo.name !== "") {
      if (checkDup === undefined) {
        setExpenses([...expenses, formInfo]);
        setExpenseNameField("");
        setExpenseAmountField("");
      } else {
        alert("duplicate!"); // do something if name is duplicated
      }
    } else {
      if (formInfo.amount === "") {
        setErrorExp(true);
      }
      if (formInfo.name === "") {
        setErrorExp(true);
      }
    }
  }

  function handleIncomeRemove(name) {
    // gives functionality to the trash icon button
    const filteredIncome = income.filter((item) => item.name !== name);
    setIncome(filteredIncome);
  }

  function handleExpenseRemove(name) {
    const filteredExpense = expenses.filter((item) => item.name !== name);
    setExpenses(filteredExpense);
  }

  const renderIncome = income.map((inc) => {
    // an array of our income list items
    return (
      //   <ListItem key={income.indexOf(inc)}>
      //     <ListItemText primary={inc.name} />
      //     <ListItemText primary={inc.amount} />
      //     <IconButton onClick={() => handleIncomeRemove(inc.name)}>
      //       <DeleteIcon />
      //     </IconButton>
      //   </ListItem>
      <TableRow key={income.indexOf(inc)}>
        <TableCell align="left" sx={{ width: '33%' }}>{inc.name}</TableCell>
        <TableCell align="center" sx={{ width: '33%' }}>{inc.amount}</TableCell>
        <TableCell align="right" sx={{ width: '33%' }}>
          <IconButton onClick={() => handleIncomeRemove(inc.name)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  });

  const renderExpenses = expenses.map((exp) => {
    return (
      // <ListItem key={expenses.indexOf(exp)}>
      //   <ListItemText primary={exp.name} />
      //   <ListItemText primary={exp.amount} />
      //   <IconButton onClick={() => handleExpenseRemove(exp.name)}>
      //     <DeleteIcon />
      //   </IconButton>
      // </ListItem>
      <TableRow key={expenses.indexOf(exp)}>
      <TableCell align="left" sx={{ width: '33%' }}>{exp.name}</TableCell>
      <TableCell align="center" sx={{ width: '33%' }}>{exp.amount}</TableCell>
      <TableCell align="right" sx={{ width: '33%' }}>
        <IconButton onClick={() => handleExpenseRemove(exp.name)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
    );
  });

  // hard coded placeholders
  let incomeSum = 0;
  let expenseSum = 0;

  if (income.length !== 0) {
    const amountArrayIncome = income.map((obj) => obj.amount); // returns array of amounts only
    incomeSum = amountArrayIncome
      .map((num) => parseInt(num))
      .reduce((a, b) => {
        return a + b;
      });
  }

  if (expenses.length !== 0) {
    const amountArrayExpense = expenses.map((obj) => obj.amount); // returns array of amounts only
    expenseSum = amountArrayExpense
      .map((num) => parseInt(num))
      .reduce((a, b) => {
        return a + b;
      });
  }

  return (
    <div>
      <Typography variant="h2">Budget</Typography>

      <Typography variant="h4" gutterBottom>
        Income
      </Typography>
      <TableContainer ><Table>{renderIncome}</Table></TableContainer>
      {/* <List>{renderIncome}</List> */}
      <FormControl error={errorIn}>
        <FormHelperText sx={{ m: 1 }} color="warning">
          {" "}
          Be sure to enter a name and amount{" "}
        </FormHelperText>
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
          <Button
            onClick={handleSubmitIncome}
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
      {/* <List>{renderExpenses}</List> */}
      <TableContainer ><Table>{renderExpenses}</Table></TableContainer>
      <FormControl error={errorExp}>
        <FormHelperText sx={{ m: 1 }} color="warning">
          {" "}
          Be sure to enter a name and amount{" "}
        </FormHelperText>

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
          <Button
            onClick={handleSubmitExpense}
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
      <Typography variant="h5">Income: {incomeSum}</Typography>
      <Typography variant="h5">Expenses: {expenseSum}</Typography>
      <Typography variant="h5">Net: {incomeSum - expenseSum}</Typography>
    </div>
  );
}

export default Budget;
