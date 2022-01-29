import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Box } from "@mui/material";
import { useHistory } from "react-router-dom";
import { Divider } from "@mui/material";
import MyModal from "./MyModal.js";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckIcon from "@mui/icons-material/Check";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

export default function MultiActionAreaCard({
  text,
  rubrik,
  linkTo,
  stateColor,
  backgroundcolor,
  isActive,
  img,
  isDone,

  modalTitle,
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log("stänger modal");
    setOpen(false);
  };

  const openModal = () => {
    console.log("öppnar modal");
    handleOpen();
  };
  const history = useHistory();
  const goTo = () => {
    isActive
      ? history.push({
          pathname: linkTo,
        })
      : openModal();
  };

  const opacityIs = isActive ? "100%" : "25%";
  console.log(opacityIs);

  return (
    <div>
      <MyModal
        title={modalTitle}
        text="Övningarna bygger på varandra så du måste göra dom i rätt ordning"
        open={open}
        onClose={handleClose}
      />

      <Card
        sx={{
          backgroundColor: "white",
          boxShadow: 15,
          mx: "auto",
          transform: "scale(1)",
          opacity: opacityIs,
        }}
      >
        {isDone && (
          <Box
            sx={{
              backgroundColor: "success.dark",
              position: "absolute",
              top: "0px",
              right: 0,
              padding: 1,
              pt: 0,
              pb: 0.5,
              pt: 1,
              color: "white",
              zIndex: 1000,
              borderRadius: " 0 0  0 3px",
            }}
          >
            {" "}
            <CheckCircleOutlineIcon />
          </Box>
        )}
        <CardActionArea onClick={goTo}>
          <CardMedia
            className="svg"
            component="img"
            height="200"
            image={img}
            alt="Värderingsbild"
            sx={{ p: 2 }}
          />

          <CardContent
            sx={{
              padding: "0px",
              minHeight: "160px",
            }}
          >
            <Typography
              variant="body1"
              component="div"
              sx={{
                fontWeight: "bold",
                fontSize: "1,4rem",
                padding: 1,
                textAlign: "center",
                color: "primary.main",
              }}
            >
              {rubrik}
            </Typography>

            <Divider />

            <Typography
              variant="body1"
              sx={{
                padding: 2,

                margin: "0",
              }}
            >
              {text}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ padding: "0px" }}>
          <Button
            fullWidth={true}
            onClick={goTo}
            variant="text"
            color={isDone ? "success" : "primary"}
            disabled={!isActive}
            sx={{
              pl: "0px",
              pr: "0px",
              borderRadius: 0,
            }}
          >
            {isDone ? "Gör om övningen" : "STARTA ÖVNINGEN"}
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
