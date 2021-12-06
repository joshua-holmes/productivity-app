import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import InputField from "./InputField";
import { useState } from "react";
import Grid from '@mui/material/Grid';
import MyLineChart from "./MyLineChart";

let dollarUSLocale = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

function Retirement() {
    const [ formData, setFormData ] = useState({ rate: 0.08 });
    const graphData = [];
    let result = formData.initial || 0;
    for ( let i = 0; i < (formData.goalYear * 12); i++ ) {
        result *= 1 + formData.rate/12
        result += formData.monthly || 0
        console.log("I", i);
        if ( (i + 1) % 12 === 0 ) {
            graphData.push({
                years: (i + 1) / 12,
                dollars: parseFloat(result.toFixed(2)),
            })
        }
    }
    function handleSubmit(e) {
        e.preventDefault();
    }
    function handleChange(e) {
        let value = 0.0;
        const integerFields = [ "goalYear" ]
        if ( integerFields.indexOf(e.target.name) >= 0 ) {
            value = parseFloat(e.target.value);
        } else {
            value = parseFloat(parseFloat(e.target.value).toFixed(2));
        }
        setFormData({
            ...formData,
            [e.target.name]: value,
        })
    }



    return (
        <>
            <Typography variant="h2">Retirement Calculator</Typography>
            <main>
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
                <Box>

                    <MyLineChart data={graphData}/>

                </Box>
                <Typography variant="p">{dollarUSLocale.format(result)}</Typography>
            </main>
        </>
    )
}

export default Retirement;
