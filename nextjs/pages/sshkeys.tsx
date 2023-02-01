import AddButton from "../components/AddButton";
import { SSHModal } from "../components/SSHModal";
import { sshkeys } from "../lib/store";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useAtom } from "jotai";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Page() {
  const [mysshkeys, setSSHKeys] = useAtom(sshkeys);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const item = localStorage.getItem("sshkeys");
    if (item !== null) {
      setSSHKeys(JSON.parse(item));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // This should only run once

  function deleteKey(id) {
    const nodes = mysshkeys.filter((obj) => {
      return obj.id !== id;
    });

    setSSHKeys(nodes);
  }

  function addButton() {
    setOpen(true);
  }

  function Key(props) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "100%",
          height: 40,
          my: 0.5,
          backgroundColor: "primary.dark",
          "&:hover": {
            backgroundColor: "primary.main",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <Box>{props.name || "lol"}</Box>
        <Box>
          <Button
            variant="contained"
            color="error"
            onClick={() => deleteKey(props.id)}
          >
            Delete
          </Button>
        </Box>
        <Box></Box>
      </Box>
    );
  }

  return (
    <>
      <Head>
        <title>SSH Keys | app.k3s.rocks</title>
      </Head>
      <h1>Keys</h1>
      <SSHModal setModalOpen={setOpen} modalState={open} />
      <AddButton onClick={() => addButton()} />

      {mysshkeys &&
        mysshkeys.map((item) => (
          <Key key={item.id} name={item.name} id={item.id} />
        ))}
    </>
  );
}
