import Box from '@mui/material/Box';
import InputField from "./InputField";
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";

function RetCalcForm({ formData, setFormData, handleSubmit }) {
    function handleChange(e) {
        let value = 0.0;
        const integerFields = [ "goalYear" ]
        if ( e.target.value >= 0  ) {
            if ( integerFields.indexOf(e.target.name) >= 0 ) {
                value = parseFloat(e.target.value);
            } else {
                value = parseFloat(parseFloat(e.target.value).toFixed(2));
            }
            setFormData({
                ...formData,
                [e.target.name]: value,
            })
        } else {
            console.warn("Negative numbers cannot be entered.");
        }
    }
    return (
        <Box component="form" onSubmit={handleSubmit} autoComplete="off">
            <Grid container spacing={2}>
                <InputField
                    name="monthly"
                    message="Enter monthly contribution"
                    symbol="$"
                    onChange={handleChange}
                    formData={formData}
                    type="number"
                />
                <InputField
                    name="initial"
                    message="Enter starting amount"
                    symbol="$"
                    onChange={handleChange}
                    formData={formData}
                    type="number"
                />
                <InputField
                    name="goalYear"
                    message="Enter years until retirement"
                    symbol="years"
                    symbolPosition="end"
                    onChange={handleChange}
                    formData={formData}
                    type="number"
                />
                <Grid item xs={12}>
                    <Button type="submit">Submit</Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default RetCalcForm
