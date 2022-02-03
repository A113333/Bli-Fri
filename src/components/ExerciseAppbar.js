import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Tooltip from "@mui/material/Tooltip";
import CloseConfirmation from "./CloseConfirmation";
import ExploreIcon from "@mui/icons-material/Explore";
import StepperExercise from "./StepperExcercise";

export default function ExerciseAppbar({ header, step, icon }) {
  const [showCloseDialog, setshowCloseDialog] = useState(false);

  const pressClose = () => {
    setshowCloseDialog(true);
  };

  const donotQuite = () => {
    setshowCloseDialog(false);
  };

  return (
    <div className="appBarPadder">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          sx={{
            height: "55px",
            width: "100%",
            bgcolor: "white",
            boxShadow: 1,
            zIndex: 900,
            color: "primary.main",
          }}
        >
          <Toolbar
            variant="dense"
            sx={{
              bgcolor: "white",
            }}
          >
            <Box sx={{ mr: "15px", fontSize: 35 }}>
              {icon ? icon : <ExploreIcon />}
            </Box>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, userSelect: "none" }}
            >
              {header}
            </Typography>

            <Tooltip title="Avsluta övningen">
              <IconButton
                onClick={() => pressClose()}
                edge="end"
                color="inherit"
                aria-label="close"
              >
                <HomeOutlinedIcon sx={{ fontSize: 35 }} />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </Box>
      {showCloseDialog && (
        <CloseConfirmation
          title="Är du säker att du vill avsluta övningen?"
          text="Avslutar du övningen kommer ditt resultat inte sparas och du får börja om från början nästa gång"
          option1="Nej"
          option2="Ja"
          donotQuite={donotQuite}
        />
      )}
    </div>
  );
}
