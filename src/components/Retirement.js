import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import InputField from "./InputField";
import { useState } from "react";
import Grid from '@mui/material/Grid';
import RetResults from "./RetResults";

import RetCalcForm from "./RetCalcForm";



function Retirement() {
    const [ formData, setFormData ] = useState({ rate: 0.06 });
    console.log(formData);


    function handleSubmit(e) {
        e.preventDefault();
        if ( formData.goalYear && (formData.monthly || formData.initial) ) {

        } else {
            // ERROR
            alert("Years must be entered, and one of the amount fields must be entered.")
        }
    }


    return (
        <>
            <Typography variant="h2">Retirement Calculator</Typography>
            <main>
                <RetCalcForm
                    handleSubmit={handleSubmit}
                    setFormData={setFormData}
                    formData={formData}
                />
                <RetResults formData={formData} setFormData={setFormData} />

            </main>
        </>
    )
}

export default Retirement;
