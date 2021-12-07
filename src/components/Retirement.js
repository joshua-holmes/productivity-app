import { useState } from "react";
import RetResults from "./RetResults";
import RetCalcForm from "./RetCalcForm";

import Typography from "@mui/material/Typography";


function Retirement() {
    const [ formData, setFormData ] = useState({ rate: 0.06, monthly: 0, initial: 0, goalYear: 0 });

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
