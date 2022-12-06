import AlertDialog from "../components/AlertDialog";
import { profileAtom } from "../lib/store";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useAtom } from "jotai";
import Head from "next/head";
import Router from "next/router";
import { useEffect, useState } from "react";

export default function Profile() {
  const [open, setOpen] = useState(false);
  const [editable, setEditable] = useState(false);
  const [profile, setProfile] = useAtom(profileAtom);

  useEffect(() => {
    const item = localStorage.getItem("profile");
    if (item != null) {
      setProfile(JSON.parse(item));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // This should only run once

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleDeleteAll() {
    localStorage.clear();
    handleClose();
    Router.reload();
  }

  function handleEdit() {
    setEditable(!editable);
  }

  function handleInput(event) {
    if (event.target.id == "email") {
      setProfile({ email: event.target.value, domain: profile.domain });
    } else if (event.target.id == "domain") {
      setProfile({ email: profile.email, domain: event.target.value });
    }
  }

  return (
    <>
      <Head>
        <title>Profile | app.k3s.rocks</title>
      </Head>
      <h1>Profile</h1>
      <Box sx={{ mt: 2 }}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { mt: 1, mb: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <Box>
            <Button
              variant="outlined"
              color={editable ? "warning" : "info"}
              onClick={handleEdit}
            >
              {editable ? "Save" : "Edit"}
            </Button>
          </Box>
          <Box sx={{ m: 1 }} />
          <div>
            <TextField
              disabled={!editable}
              id="email"
              label="email"
              value={profile?.email ? profile.email : ""}
              onChange={handleInput}
            />
          </div>
          <div>
            <TextField
              disabled={!editable}
              id="domain"
              label="domain"
              value={profile?.domain ? profile.domain : ""}
              onChange={handleInput}
            />
          </div>
        </Box>
        <Box sx={{ m: 1 }} />
        <Box>
          <Button variant="outlined" color="error" onClick={handleClickOpen}>
            Delete All Data
          </Button>
        </Box>
        <AlertDialog
          open={open}
          title="Delete all data?"
          text="This removes all data and there is no way to get it back longer text will it break"
          onOk={handleDeleteAll}
          onCancel={handleClose}
        />
      </Box>
    </>
  );
}
