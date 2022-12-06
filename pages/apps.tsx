import Apps from "../components/Apps";
import { publicApps } from "../lib/apps/publicApps";
import { servers, sshkeys, Server, profileAtom } from "../lib/store";
import { ApiCallBody } from "../lib/types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useAtom } from "jotai";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";

export default function Tools() {
  const [activeServer, setActiveServer] = useState<Server>(null);
  const [myservers, setServers] = useAtom(servers);
  const [terminal, setTerminal] = useState("Terminal ready...");
  const [mykeys, setKeys] = useAtom(sshkeys);
  const [profile, setProfile] = useAtom(profileAtom);

  function getKey() {
    const key = mykeys.filter((obj) => {
      console.log(
        `obj.id: ${obj.id}, activeserver.usedsshkey: ${activeServer.sshkeyId}`
      );
      return obj.id === activeServer.sshkeyId;
    })[0];
    return key.key;
  }

  useEffect(() => {
    const _servers = localStorage.getItem("servers");
    if (_servers !== null) {
      setServers(JSON.parse(_servers));
      setActiveServer(JSON.parse(_servers)[0]);
    }

    const _keys = localStorage.getItem("sshkeys");
    if (_keys !== null) {
      setKeys(JSON.parse(_keys));
    }

    const _profile = localStorage.getItem("profile");
    if (_profile !== null) {
      setProfile(JSON.parse(_profile));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // This should only run once

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [terminal]);

  async function apiCall(command) {
    let body: ApiCallBody = {
      server: {
        id: activeServer.id,
        name: activeServer.name,
        ip: activeServer.ip,
        port: activeServer.port,
        username: activeServer.username,
        useSSHKey: activeServer.useSSHKey,
        password: activeServer.password,
      },
      command: command,
    };

    if (activeServer.useSSHKey) {
      body.sshKey = getKey();
    }

    const res = await fetch("api/streamingssh", {
      method: "POST",
      body: JSON.stringify(body),
    });

    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let done = false;
    let value = null;
    while (!done) {
      ({ value, done } = await reader.read());
      const decodedValue = decoder.decode(value);
      setTerminal((prev) => {
        return prev + decodedValue;
      });
    }
  }

  function handleServerUpdate(event) {
    const newname = event.target.value;
    const newServer = myservers.filter((item) => {
      return item.name === newname;
    })[0];
    setActiveServer(newServer);
  }

  function apply(yaml) {
    apiCall(`
        echo '${yaml}' | kubectl apply -f -
      `);
  }

  function kubectldelete(yaml) {
    apiCall(`
        echo '${yaml}' | kubectl delete -f -
      `);
  }

  return (
    <>
      <Head>
        <title>Apps | app.k3s.rocks</title>
      </Head>
      <h1>Apps</h1>

      <FormControl fullWidth sx={{ py: 2 }}>
        <InputLabel id="server-select-label">Server</InputLabel>
        <Select
          labelId="server-select-label"
          id="server-select"
          value={activeServer ? activeServer.name : ""}
          label="name"
          onChange={handleServerUpdate}
        >
          {myservers.map((item) => (
            <MenuItem value={item.name} key={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Apps
        apps={publicApps}
        profile={profile}
        applycallback={(yup) => apply(yup)}
        deletecallback={(yup) => kubectldelete(yup)}
      />

      <Box
        id="terminal"
        sx={{
          borderRadius: "5px",
          border: 2,
          borderColor: "gray",
          p: 2,
          my: 2,
          backgroundColor: "black",
          height: 200,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {terminal &&
          terminal.split(/\n/).map((line, index) => (
            <Box key={index} sx={{ wordBreak: "break-word" }}>
              {line}
            </Box>
          ))}
        <div ref={messagesEndRef} />
      </Box>

      <Button
        variant="contained"
        sx={{ mr: 2, mt: 2 }}
        onClick={() => {
          apiCall(`
            ls -lah
          `);
        }}
      >
        ls
      </Button>
    </>
  );
}
