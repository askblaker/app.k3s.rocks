import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";

export function Server(props) {
  const [hover, setHover] = useState(false);
  const [copyText, setCopyText] = useState("copy");

  function copyIpToClipboard() {
    navigator.clipboard.writeText(props.ip);
    setCopyText("Copied!");
    setTimeout(() => {
      setCopyText("copy");
    }, 3000);
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
        height: 40,
        my: 0.5,
        borderRadius: "5px",
        backgroundColor: "primary.dark",
        "&:hover": {
          backgroundColor: "primary.main",
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <Box>{props.name || "lol"}</Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "left",
          width: "150px",
        }}
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Box>{props.ip || "lol"}</Box>
        {hover && (
          <Box>
            <Tooltip title={copyText} placement="top">
              <IconButton size="small" onClick={copyIpToClipboard}>
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Box>
      <Box>
        <Button
          variant="contained"
          color="error"
          onClick={() => props.deleteCallback(props.id)}
        >
          Delete
        </Button>
      </Box>
      <Box>
        <Button
          variant="contained"
          color="warning"
          onClick={() => props.editCallback(props.id)}
        >
          Edit
        </Button>
      </Box>
    </Box>
  );
}
