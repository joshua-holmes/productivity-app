import Slider from '@mui/material/Slider';
import Grid from '@mui/material/Grid';

function InputSlider({ name, handleChange, formData, max, min, step, scale, mark }) {

    // function calculateValues(max, scale) {
    //     const values = [];
    //     if ( scale === "incremental" ) {
    //         values.push((max - min) + ((max - min) / 5))
    //         values.push(value => {
    //             if ( value < 100 ) {
    //                 return value;
    //             } else {
    //                 return value * 5;
    //             }
    //         })
    //     }
    //     return values;
    // }

    // const [ adjustedMax, calculateScale ] = calculateValues(max, scale)

    return (
        <Grid item xs={12} sm={6} md={3}>
            <Slider
                valueLabelDisplay="auto"
                onChange={handleChange}
                name={name}
                value={formData[name]}
                max={max}
                min={min}
                step={step}
            />
            <label>{name}</label>

        </Grid>
    )
}

export default InputSlider;
