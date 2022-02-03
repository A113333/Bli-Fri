import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

function ProgressTracker({ nrsToPick, nrsPicked, isItDone }) {
  console.log(nrsToPick + " och " + nrsPicked);
  return (
    <div>
      <LinearProgress
        variant="determinate"
        value={(100 / nrsToPick) * nrsPicked}
        color="secondary"
        sx={{
          position: "fixed",
          top: "55px",
          left: "0px",
          width: "100%",
          padding: "0px",
          zIndex: 100,
          height: 15,
          // borderRadius: 5,
        }}
      />
      <Box
        className={isItDone ? "doneProgress" : "notDoneProgress"}
        sx={{
          position: "fixed",
          top: "36px",
          maxWidth: "854px",
          left: "50%",
          transform: "translate(-50%, 0)",
          zIndex: "1000",
          minWidth: "52px",
          textAlign: "center",
          color: "white",
          fontWeight: "bold",
          fontSize: "1rem",

          border: "2px solid white",
          borderRadius: "50%",
          "&:hover": {
            backgroundColor: "primary.light",
          },
        }}
      >
        {isItDone ? (
          <CheckCircleOutlineIcon fontSize="large" sx={{ mt: "7px" }} />
        ) : (
          nrsPicked + "/" + nrsToPick
        )}
      </Box>
    </div>
  );
}

export default ProgressTracker;
