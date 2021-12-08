import { useState } from "react";

import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import ListItemContainer from "./ListItem";
import List from "@mui/material/List";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormHelperText from "@mui/material/FormHelperText";

function ProsCons() {
  const [pros, setPros] = useState([]); // stores pros values
  const [cons, setCons] = useState([]); // stores cons values

  const [prosConsValue, setProsConsValue] = useState(""); // controlled form entry
  const [textFieldValue, setTextFieldValue] = useState(""); // controlled form entry

  const [error, setError] = useState(false); // error handling

  const renderProsArray = pros.map((item) => {
    // render an array of pros listitemcontainers
    return (
      <ListItemContainer
        key={pros.indexOf(item)}
        data={item}
        handleRemove={handleRemove}
      />
    );
  });

  const renderConsArray = cons.map((item) => {
    // render an array of cons listitemcontainers
    return (
      <ListItemContainer
        key={cons.indexOf(item)}
        data={item}
        handleRemove={handleRemove}
      />
    );
  });

  function handleChangeSelect(e) {
    // update state when changed
    setProsConsValue(e.target.value);
    setError(false);
  }

  function handleChangeText(e) {
    // update state when changed
    setTextFieldValue(e.target.value);
    setError(false);
  }

  function formReset() {
    // resets states of form
    setProsConsValue("");
    setTextFieldValue("");
  }

  function handleSubmit(e) {
    // handle the submit
    e.preventDefault();
    const checkDupPro = pros.find((thing) => thing === textFieldValue); // check for duplicates
    const checkDupCon = cons.find((thing) => thing === textFieldValue);

    if (
      // only continue if these are true. checks for duplicates and that our form is filled out
      textFieldValue !== "" &&
      prosConsValue !== "" &&
      checkDupPro === undefined &&
      checkDupCon === undefined
    ) {
      if (prosConsValue === "Pro") {
        setPros([...pros, textFieldValue]);
        formReset();
      } else if (prosConsValue === "Con") {
        setCons([...cons, textFieldValue]);
        formReset();
      }
    } else {
      setError(true);
    }
  }

  function handleRemove(item) {
    const foundInPros = pros.find((arrayItem) => item === arrayItem); // searches for our name
    if (foundInPros === undefined) {
      // if it isnt in the pros array, remove it from cons array
      const filteredCons = cons.filter((arrayItem) => item !== arrayItem);
      setCons(filteredCons);
    } else {
      const filteredPros = pros.filter((arrayItem) => item !== arrayItem);
      setPros(filteredPros);
    }
  }

  return (
    <Grid sx={{ mx: 4 }}>
      <Typography variant="h2">Pros and Cons List</Typography>
      <TextField
        id="standard-basic"
        label="List name"
        variant="standard"
        sx={{ mb: 4 }}
        inputProps={{
          style: { fontSize: 30 },
        }}
      />

      <Grid container sx={{ minHeight: 400, mb: 5 }}>
        <Grid item xs>
          <Typography variant="h4" gutterBottom component="div">
            Pros
          </Typography>
          <List>{renderProsArray}</List>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs>
          <Typography variant="h4" gutterBottom component="div">
            Cons
          </Typography>
          <List>{renderConsArray}</List>
        </Grid>
      </Grid>

      <FormControl error={error}>
        <FormHelperText sx={{ m: 1 }} color="warning">
          Be sure to enter a unique name and a type
        </FormHelperText>
        <FormGroup row>
          <TextField
            sx={{ m: 1, minWidth: 120 }}
            id="outlined-basic"
            label="New list item name"
            variant="outlined"
            onChange={handleChangeText}
            value={textFieldValue}
          />
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Pro or Con
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={prosConsValue}
              label="ProsCons"
              onChange={handleChangeSelect}
            >
              <MenuItem value="Pro">Pro</MenuItem>
              <MenuItem value="Con">Con</MenuItem>
            </Select>
          </FormControl>
          <Button onClick={handleSubmit} sx={{ m: 1 }} variant="contained">
            Submit
          </Button>
        </FormGroup>
      </FormControl>
    </Grid>
  );
}

export default ProsCons;
