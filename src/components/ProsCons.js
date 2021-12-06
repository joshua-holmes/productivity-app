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

// FormControl?

function ProsCons() {
  const [pros, setPros] = useState([]);
  const [cons, setCons] = useState([]);

  const [prosConsValue, setProsConsValue] = useState("");
  const [textFieldValue, setTextFieldValue] = useState("");

  const renderProsArray = pros.map((item) => {
    return (
      <ListItemContainer
        key={pros.indexOf(item)}
        data={item}
        handleRemove={handleRemove}
      />
    );
  });

  const renderConsArray = cons.map((item) => {
    return (
      <ListItemContainer
        key={cons.indexOf(item)}
        data={item}
        handleRemove={handleRemove}
      />
    );
  });

  function handleChangeSelect(e) {
    setProsConsValue(e.target.value);
  }

  function handleChangeText(e) {
    setTextFieldValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (prosConsValue === "Pro") {
      setPros([...pros, textFieldValue]);
      setProsConsValue("");
      setTextFieldValue("");
    } else if (prosConsValue === "Con") {
      setCons([...cons, textFieldValue]);
      setProsConsValue("");
      setTextFieldValue("");
    }
  }

  function handleRemove(item) {
    const foundInPros = pros.find((arrayItem) => item === arrayItem);
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
    <div>
        <Typography variant="h2">Pros and Cons List</Typography>
      <TextField
        id="standard-basic"
        label="List name"
        variant="standard"
        sx={{ mb: 4 }}
      />

      <Grid container sx={{ minHeight: 200 }}>
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
    </div>
  );
}

export default ProsCons;
