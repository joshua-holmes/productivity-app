import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

function BudgetFormBody({ isError, formData, handleChange, handleSubmit, incomeOrExpenses }) {

    return (
        <FormControl error={isError[incomeOrExpenses]} style={{ margin: "0 0 50px 0" }}>
            <FormHelperText sx={{ m: 1 }} color="warning">
                Be sure to enter a unique name and an amount
            </FormHelperText>

            <FormGroup row>
                <TextField
                    sx={{ m: 1, minWidth: 120 }}
                    id="outlined-basic"
                    label={`${incomeOrExpenses} name`}
                    variant="outlined"
                    name="name"
                    onChange={e => handleChange(e, incomeOrExpenses)}
                    value={formData.name || ""}
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
                    onChange={e => handleChange(e, incomeOrExpenses)}
                    value={formData.amount || ""}
                />
                <Button
                    onClick={() => handleSubmit(incomeOrExpenses)}
                    sx={{ m: 1 }}
                    variant="contained"
                >
                    <AddIcon />
                </Button>
            </FormGroup>
        </FormControl>
    )
}

export default BudgetFormBody;
