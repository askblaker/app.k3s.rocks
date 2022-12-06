import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import * as yaml from "js-yaml";
import { useState } from "react";

export default function ManifestBox(props) {
  const [YAML, setYAML] = useState(props?.yaml || "lol");

  async function test() {
    const text = await fetchMyAPI();
    setYAML(text);
  }

  async function fetchMyAPI() {
    const res = await fetch(
      `https://raw.githubusercontent.com/askblaker/k3s.rocks/main/manifests/plausible-localstorage.yaml`
    );
    const data = await res.text();
    const loaded = yaml.loadAll(data);
    const text = yaml.dump(loaded);
    return text;
  }

  return (
    <>
      <Box>
        <FormControl fullWidth>
          <TextField
            style={{ height: "100%" }}
            id="outlined-multiline-static"
            label="YAML"
            multiline
            value={YAML}
            onChange={(e) => setYAML(e.target.value)}
            inputProps={{
              style: {
                height: "200px",
                overflow: "vertical",
                overflowY: "scroll",
                resize: "vertical",
              },
            }}
          />
        </FormControl>
      </Box>
      <Box sx={{ my: 2 }}>
        <Button variant="contained" onClick={test}>
          Contained
        </Button>
        <Button variant="contained" onClick={() => props.callback(YAML)}>
          Contained
        </Button>
      </Box>
    </>
  );
}
