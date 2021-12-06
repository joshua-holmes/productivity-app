import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import InputField from "./InputField";
import { useState } from "react";

function Retirement() {
    const [ formData, setFormData ] = useState({});
    function handleSubmit(e) {
        e.preventDefault()
    }
    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <>
            <Typography variant="h2">Retirement Calculator</Typography>
            <main>
                <Box component="form" onSubmit={handleSubmit} autoComplete="off">
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
                    <Button type="submit">Continue</Button>
                </Box>
            </main>
        </>
    )
}

export default Retirement;
