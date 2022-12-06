import { servers, sshkeys, SSHKey, Server } from "../lib/store";
import { makeId } from "../lib/utils";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useAtom } from "jotai";
import _ from "lodash";
import * as React from "react";
import { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export function ServerModal(props) {
  const [myservers, setServers] = useAtom(servers);
  const [mysshkeys, setKeys] = useAtom(sshkeys);
  const [name, setName] = useState("");
  const [ip, setIp] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [port, setPort] = useState("");
  const [id, setId] = useState("");
  const [useSSHKEY, setUseSSHKEY] = useState(false);
  const [usedSSHKey, setUsedSSHKey] = useState<SSHKey | undefined>();
  const [selectedSSHKeyName, setSelectedSSHKeyName] = useState("");

  const handleToggle = (event) => {
    setUseSSHKEY(event.target.checked);
  };

  useEffect(() => {
    const item = localStorage.getItem("servers");
    if (item !== null) {
      setServers(JSON.parse(item));
    }

    const item2 = localStorage.getItem("sshkeys");
    if (item2 !== null) {
      setKeys(JSON.parse(item2));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // This should only run once

  useEffect(() => {
    if (props.id) {
      setId(props.id);
      const ser = myservers.filter((item) => {
        return item.id === props.id;
      })[0];
      setName(ser.name);
      setIp(ser.ip);
      setUsername(ser.username);
      setPassword(ser.password);
      setPort(ser.port);
      setUseSSHKEY(ser.useSSHKey);
      if (ser.useSSHKey == true) {
        const key = getKeyFromId(ser.sshkeyId);
        setUsedSSHKey(key);
        setSelectedSSHKeyName(key.name);
      }
    }
  }, [props.id]); // eslint-disable-line react-hooks/exhaustive-deps
  // Only run if props change

  function addUpdateServer() {
    if (id === "") {
      addServer();
      props.setModalOpen(false);
    } else {
      saveServer();
      props.setModalOpen(false);
    }
  }

  function addServer() {
    const newServer: Server = {
      id: makeId(50),
      name: name || "Default name",
      ip: ip || "127.0.0.1",
      username: username || "root",
      password: password || "password",
      port: port || "22",
      useSSHKey: useSSHKEY || false,
      sshkeyId: usedSSHKey ? usedSSHKey.id : undefined,
    };
    const newlist = [...myservers, newServer];
    setServers(newlist);
    setId("");
  }

  function saveServer() {
    const updatedServer: Server = {
      id: id,
      name: name,
      ip: ip,
      username: username,
      password: password,
      port: port,
      useSSHKey: useSSHKEY,
      sshkeyId: usedSSHKey ? usedSSHKey.id : undefined,
    };
    let index = _.findIndex(myservers, { id: id });
    let arrayCopy = JSON.parse(JSON.stringify(myservers));
    arrayCopy.splice(index, 1, updatedServer);
    setServers(arrayCopy);
  }

  function getKeyFromName(name: string) {
    const key = mysshkeys.filter((obj) => {
      return obj.name == name;
    })[0];
    return key;
  }

  function getKeyFromId(id: string) {
    const key = mysshkeys.filter((obj) => {
      return obj.id == id;
    })[0];
    return key;
  }

  function nokeys() {
    if (mysshkeys) {
      if (!mysshkeys) {
        return true;
      }
      if (!mysshkeys.length) {
        return true;
      }
    } else return false;
  }

  return (
    <div>
      <Modal
        id="servermodal"
        open={props.modalState}
        onClose={() => props.setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {props.title ? props.title : "Add Server"}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Type in your server details here
            </Typography>
            <Box sx={{ mt: 2 }}>
              <TextField
                id="name"
                label="name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box>
              <TextField
                id="ip"
                sx={{ mt: 2 }}
                label="ip"
                variant="outlined"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
              />
            </Box>
            <Box>
              <TextField
                id="port"
                sx={{ mt: 2 }}
                label="port"
                variant="outlined"
                value={port}
                onChange={(e) => setPort(e.target.value)}
              />
            </Box>
            <Box>
              <TextField
                id="username"
                sx={{ mt: 2 }}
                label="username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Box>
            <Box>
              <TextField
                id="password"
                sx={{ mt: 2 }}
                label="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      id="useSSHKeyToggle"
                      checked={useSSHKEY}
                      disabled={nokeys()}
                      onChange={handleToggle}
                    />
                  }
                  label="Use SSH Key"
                />
              </FormGroup>
            </Box>
            <Box sx={{ mt: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">SSHKey</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="ssh-select"
                  value={selectedSSHKeyName}
                  disabled={!useSSHKEY}
                  defaultValue="none"
                  onChange={(e) => {
                    const key = getKeyFromName(e.target.value);
                    setUsedSSHKey(key);
                    setSelectedSSHKeyName(e.target.value);
                  }}
                >
                  {mysshkeys &&
                    mysshkeys.map((item) => {
                      console.log(item);
                      return (
                        <MenuItem value={item.name} key={item.id}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Box>
            <Box>
              <Button
                type="submit"
                variant="contained"
                onClick={() => addUpdateServer()}
                sx={{ my: 2 }}
              >
                OK
              </Button>
            </Box>
          </Box>
        </form>
      </Modal>
    </div>
  );
}
