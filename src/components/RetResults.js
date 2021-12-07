import RetAreaChart from "./RetAreaChart";
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import InputSlider from "./InputSlider";

let dollarUSLocale = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

function RetResults({ formData, setFormData }) {

    let result = formData.initial || 0;
    const graphData = [{
        years: 0,
        dollars: result,
    }];
    for ( let i = 0; i < (formData.goalYear * 12); i++ ) {
        result *= 1 + formData.rate/12
        result += formData.monthly || 0
        if ( (i + 1) % 12 === 0 ) {
            graphData.push({
                years: (i + 1) / 12,
                dollars: parseFloat(result.toFixed(2)),
            })
        }
    }
    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <Box>

            <RetAreaChart data={graphData}/>

            <Grid container spacing={8}>
                <InputSlider
                    name="monthly"
                    formData={formData}
                    handleChange={handleChange}
                    max={1000}
                    step={10}
                />
                <InputSlider
                    name="initial"
                    formData={formData}
                    handleChange={handleChange}
                    max={100000}
                    step={1000}
                />
                <InputSlider
                    name="goalYear"
                    formData={formData}
                    handleChange={handleChange}
                />
                <InputSlider
                    name="rate"
                    formData={formData}
                    handleChange={handleChange}
                    max={0.08}
                    min={0.05}
                    step={0.005}
                />
            </Grid>



            <Typography variant="p">{dollarUSLocale.format(result)}</Typography>

        </Box>
    )
}

export default RetResults;
