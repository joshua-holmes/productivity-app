import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input"
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from "react";

function InputField({ name, message, onChange, formData, symbol, symbolPosition, type }) {
    const [ formInputSelected, setFormInputSelected ] = useState()

    function getAdornment(position) {
        if ( (formInputSelected && symbol) || formData[name] ) {
            return <InputAdornment position={position}>{symbol}</InputAdornment>;
        } else {
            return null;
        }
    }
    const formControlStyles = {
        maxWidth: "600px", // Switch to using sm with responsive design
        display: "block",
        margin: "auto", // Make 20px for sm when we get responsive design working
    }
    const inputStyles = {
        width: "100%",
    }
    return (
        <FormControl style={formControlStyles} sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor={name}>
                {message}
            </InputLabel>
            <Input
                id={name}
                label={message}
                name={name}
                variant="outlined"
                startAdornment={symbolPosition === "end" ? null : getAdornment("start")}
                endAdornment={symbolPosition === "end" ? getAdornment("end") : null}
                onFocus={() => setFormInputSelected(true)}
                onBlur={() => setFormInputSelected(false)}
                style={inputStyles}
                onChange={onChange}
                value={formData[name] || ""}
                type={type}
            />
        </FormControl>
    )
}

export default InputField;
