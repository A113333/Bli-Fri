import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Divider from "@mui/material/Divider";

function Footer() {
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        height: "65px",
        color: "white",
        borderRadius: "6px 6px 0px 0px ",
        display: "table",
        verticalAlign: "middle",

        width: "100%",
      }}
    >
      <Typography
        sx={{
          pl: "20px",
          width: "50%",
          display: "table-cell",
          verticalAlign: "middle",
        }}
      >
        Bli Fri vill hjälpa dig hitta rätt genom livet.
      </Typography>

      <Button
        variant="contained"
        sx={{
          float: "right",
          mr: "25px",
          mt: "10px",
          color: "white",
          display: "table-cell",
          verticalAlign: "middle",
        }}
      >
        Kontakta oss
      </Button>
    </Box>
  );
}

export default Footer;
