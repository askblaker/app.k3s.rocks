import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import yaml from "js-yaml";
import _ from "lodash";
import objectScan from "object-scan";
import { useState } from "react";

export default function Apps(props) {
  const [age, setAge] = useState("");
  const [vars, setVars] = useState<Var[]>();
  const [varMapping, setVarMapping] = useState({});

  interface Var {
    name: string;
    replaceWith: string;
    input: string;
  }

  // App selection
  const handleChange = (event) => {
    setAge(event.target.value);
    updateVars(event.target.value);
  };

  // Variable input
  // Runs everytime user inputs something to the variable fields
  const handleInput = (event) => {
    let counter = 0;
    for (let varObj of vars) {
      if (varObj.name == event.target.id) {
        // @ts-expect-error: Not yet available in ts (https://github.com/DefinitelyTyped/DefinitelyTyped/pull/59434)
        let newVars = structuredClone(vars);
        let regex = /(\$\{.*\})/g;
        let replace = varObj.name.match(regex)[0];
        let newVal = varObj.name.replace(replace, event.target.value);
        newVars[counter].replaceWith = newVal;
        newVars[counter].input = event.target.value;
        setVars(newVars);
      }
      counter = counter + 1;
    }
  };

  // Find and and present available variables
  // Runs everytime a new app is selected
  function updateVars(data) {
    // Finds any values in the nested json manifest that includes ${anything}
    // And returns as an array of string keys
    const detectedVarKeys = objectScan(["**"], {
      joined: true,
      useArraySelector: true,
      filterFn: ({ value }) => {
        if (typeof value === "string") {
          let regex = /(\$\{.*\})/g;
          if (value.includes("$") && value.match(regex)) {
            return true;
          } else return false;
        } else return false;
      },
    })(data);

    // Varmapping
    // Create an object with only the retrieved string keys and their values
    // And an array containing only the values
    let newVarMapping = {};
    let values = [];
    // For every key
    for (let key of detectedVarKeys) {
      let value = _.get(data, key);
      newVarMapping[key] = value;
      values.push(value);
    }
    setVarMapping(newVarMapping);

    // Vars
    // Remove duplicates from the values array
    // And create a final Vars object with the final replacements
    values = Array.from(new Set(values));
    let final = [];
    for (let value of values) {
      let replaceWith = "";
      if (value.includes("${DOMAIN}") && props.profile?.domain) {
        replaceWith = props.profile.domain;
      }
      if (value.includes("${EMAIL}") && props.profile?.email) {
        replaceWith = props.profile.email;
      }
      final.push({ name: value, replaceWith: replaceWith, input: replaceWith });
    }
    setVars(final);
  }

  // Gets the original manifest and replaces the ${VARIABLES}
  // with the user input
  function getManifest() {
    // Read manifest
    let newMan = JSON.parse(JSON.stringify(age));
    for (let path of Object.keys(varMapping)) {
      for (let c of vars) {
        // Replace variable
        if (c.name == varMapping[path]) {
          _.set(newMan, path, c.replaceWith);
        }
      }
    }

    // Split into pieces
    let finalManifest = "";
    if (Array.isArray(newMan)) {
      let counter = 0;
      for (let p of newMan) {
        if (counter > 0) {
          finalManifest += "---";
          finalManifest += "\n";
        }
        finalManifest += yaml.dump(p);
        counter += 1;
      }
    }
    return finalManifest;
  }

  return (
    <>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">App</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="App"
            onChange={handleChange}
          >
            {props.apps.map((a, i) => (
              <MenuItem value={a.json} key={i}>
                {a.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ pt: 2 }}>
          {vars &&
            vars.map((a, i) => (
              <TextField
                id={a.name}
                label={a.name}
                variant="outlined"
                value={a.input}
                key={i}
                onChange={handleInput}
              />
            ))}
        </Box>
      </Box>
      <Box sx={{ display: "flex", py: 2 }}>
        <Box sx={{ pr: 2 }}>
          <Button
            variant="contained"
            onClick={() => {
              props.applycallback(getManifest());
            }}
          >
            Install
          </Button>
        </Box>
        <Box sx={{ px: 2 }}>
          <Button
            variant="contained"
            onClick={() => {
              props.deletecallback(getManifest());
            }}
          >
            Delete
          </Button>
        </Box>
        <Box sx={{ px: 2 }}>
          <Button
            variant="contained"
            onClick={() => {
              console.log("age: ", age);
              console.log("vars: ", vars);
              console.log("varMapping: ", varMapping);
              alert(getManifest());
            }}
          >
            Manifest
          </Button>
        </Box>
      </Box>
    </>
  );
}
