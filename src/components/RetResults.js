import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import InputSlider from "./InputSlider";
import Container from '@mui/material/Container';

import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

let formatAsDollar = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
}).format;

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
        <Box sx={{ mx: 'auto' }}>
            
                <Container sx={{ mb: 4 }}>
                    <ResponsiveContainer  width="90%" height={300}>
                        <AreaChart data={graphData}>
                            <Area type="monotone" dataKey="dollars" stroke="#6a1b9a"  fill="#6a1b9a" />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis dataKey="years" />
                            <YAxis />
                            <Tooltip />
                        </AreaChart>
                    </ResponsiveContainer>
                </Container>

            <Grid container spacing={8} sx={{ mb: 4 }}>
                <InputSlider
                label="Monthly contribution"
                    name="monthly"
                    formData={formData}
                    handleChange={handleChange}
                    max={1000}
                    step={10}
                />
                <InputSlider
                label="Initial amount"
                    name="initial"
                    formData={formData}
                    handleChange={handleChange}
                    max={100000}
                    step={1000}
                />
                <InputSlider
                label="Years until retirement"
                    name="goalYear"
                    formData={formData}
                    handleChange={handleChange}
                />
                <InputSlider
                label="Rate"
                    name="rate"
                    formData={formData}
                    handleChange={handleChange}
                    max={0.08}
                    min={0.05}
                    step={0.005}
                />
            </Grid>



            <Typography variant="h5" sx={{ mb: 3 }}>{formatAsDollar(result)}</Typography>

        </Box>
    )
}

export default RetResults;
