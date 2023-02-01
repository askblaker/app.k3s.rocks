import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function New() {
  return (
    <Typography>
      <Box
        sx={{
          backgroundColor: "blue",
          color: "red",
          width: "200px",
          borderRadius: "10px",
          "&:hover": {
            backgroundColor: "yellow",
          },
        }}
      >
        <Box
          sx={[
            {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
            },
          ]}
        >
          <h2>ADD</h2>
        </Box>
      </Box>
    </Typography>
  );
}
