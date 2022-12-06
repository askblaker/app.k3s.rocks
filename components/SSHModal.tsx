import { SSHKey, sshkeys } from "../lib/store";
import { makeId } from "../lib/utils";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useAtom } from "jotai";
import * as React from "react";
import { useState } from "react";

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

export function SSHModal(props) {
  const [mysshkeys, setSSHKeys] = useAtom(sshkeys);
  const [name, setName] = useState<string>("");
  const [key, setKey] = useState<string>();

  function addKey() {
    const newKey: SSHKey = {
      id: makeId(50),
      name: name || "random",
      key: key || "123.456.789.123",
    };
    if (!mysshkeys) {
      setSSHKeys([newKey]);
    } else {
      const newlist = [...mysshkeys, newKey];
      setSSHKeys(newlist);
    }
  }

  return (
    <div>
      <Modal
        id="sshmodal"
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
              Add SSH Key
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
            <Box sx={{ my: 2 }}>
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
                style={{ height: "100%" }}
                id="key"
                label="key"
                multiline
                value={key}
                onChange={(e) => setKey(e.target.value)}
                inputProps={{
                  style: {
                    height: "200px",
                    overflow: "vertical",
                    overflowY: "scroll",
                    resize: "vertical",
                  },
                }}
              />
            </Box>
            <Box>
              <Button
                type="submit"
                variant="contained"
                onClick={() => addKey()}
                sx={{ my: 2 }}
              >
                Add
              </Button>
            </Box>
          </Box>
        </form>
      </Modal>
    </div>
  );
}
