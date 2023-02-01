import Button from "@mui/material/Button";

export default function AddButton(props) {
  return (
    <Button
      variant="outlined"
      color="info"
      onClick={() => props.onClick()}
      sx={{ my: 2 }}
    >
      Add
    </Button>
  );
}
