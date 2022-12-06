import { servers, sshkeys, Server } from "../lib/store";
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

  return (
    <>
      <Head>
        <title>Tools | app.k3s.rocks</title>
      </Head>
      <h1>Tools</h1>
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
            DEBIAN_FRONTEND=noninteractive sudo -S apt-get update && \
            DEBIAN_FRONTEND=noninteractive sudo -S apt-get upgrade -y && \
            DEBIAN_FRONTEND=noninteractive sudo -S apt-get install curl -y && \
            DEBIAN_FRONTEND=noninteractive sudo -S apt-get install open-iscsi -y && \
            DEBIAN_FRONTEND=noninteractive sudo -S apt-get install wireguard -y
          `);
        }}
      >
        Update Server
      </Button>

      <Button
        variant="contained"
        sx={{ mr: 2, mt: 2 }}
        onClick={() => {
          setTerminal("");
        }}
      >
        Clear terminal
      </Button>

      <Button
        variant="contained"
        sx={{ mr: 2, mt: 2 }}
        onClick={() => {
          apiCall(`
            DEBIAN_FRONTEND=noninteractive sudo -S curl -sfL https://get.k3s.io | DEBIAN_FRONTEND=noninteractive INSTALL_K3S_VERSION=v1.21.0+k3s1 sudo -S sh -s server \
            --cluster-init \
            --flannel-backend=wireguard && \
            export KUBECONFIG=/etc/rancher/k3s/k3s.yaml && \
            curl https://raw.githubusercontent.com/askblaker/k3s.rocks/main/manifests/traefik-config.yaml | envsubst | DEBIAN_FRONTEND=noninteractive sudo -S kubectl apply -f -
          `);
        }}
      >
        K3S Manager
      </Button>

      <Button
        variant="contained"
        sx={{ mr: 2, mt: 2 }}
        onClick={() => {
          apiCall(`
            reboot
          `);
        }}
      >
        Reboot
      </Button>

      <Button
        variant="contained"
        sx={{ mr: 2, mt: 2 }}
        onClick={() => {
          apiCall(`
            cat /etc/rancher/k3s/k3s.yaml
          `);
        }}
      >
        Get Token
      </Button>

      <Button
        variant="contained"
        sx={{ mr: 2, mt: 2 }}
        onClick={() => {
          apiCall(`
          kubectl apply -f https://github.com/jetstack/cert-manager/releases/download/v1.8.0/cert-manager.yaml
          `);
        }}
      >
        Cert Manager
      </Button>

      <Button
        variant="contained"
        sx={{ mr: 2, mt: 2 }}
        onClick={() => {
          apiCall(`
          kubectl delete -f https://github.com/jetstack/cert-manager/releases/download/v1.8.0/cert-manager.yaml
          `);
        }}
      >
        Delete Cert manager
      </Button>

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

      <Button
        variant="contained"
        sx={{ mr: 2, mt: 2 }}
        onClick={() => {
          apiCall(`
            kubectl get po -A
          `);
        }}
      >
        Get Pods
      </Button>
    </>
  );
}
