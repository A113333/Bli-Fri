import ExerciseAppbar from "../ExerciseAppbar.js";
import Headline from "../Headline";
import BackButton from "../BackButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import Container from "@mui/material/Container";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import StepperExercise from "../StepperExcercise";
import { useLocation } from "react-router-dom";
import ProgressTracker from "../utility/ProgressTracker";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import lifeAreas from "./lifeAreas.js";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Helmet } from "react-helmet";
import {
  Dialog,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { ReactComponent as CongratsSvg } from "../img/highFive.svg";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import stepsArrays from "../utility/stepperArrays";

function LifeAreasResults() {
  const [open, setOpen] = React.useState(false);
  const [openHowOften, setOpenHowOften] = useState(false);
  const [howOften, setHowOften] = useState("");
  const [goalAdded, setgoalAdded] = useState(false);
  const location = useLocation();
  const resultsArray = localStorage.getItem("resultsLifeArea");

  const results = location.state ? location.state : JSON.parse(resultsArray);
  const smallScreen = useMediaQuery("max-width:445px");

  const steps = stepsArrays.lifeAreas;

  const history = useHistory();

  const text = [
    "Det verkar som att du är så nöjd man kan bli med dina viktigaste livsområden, fantastiskt fint att höra!",
    "Det verkar som att du överlag är rätt nöjd med dina viktigaste livsområden, fint att höra!",
    "Det vekar som att du överlag är rätt nöjd med dina viktigaste livsområden, skönt att höra!",
    "Det verkar som att du är rätt missnöjd med din nuvarande situation i dina livsområden, tråkigt att höra, men jag hoppas det ska bli bättre!",
    "Du verkar inte alls vara nöjd med din nuvarande situation i dina livsområden, tråkigt att höra, jag hoppas det snart ska bli bättre!",
  ];

  const wantToWorkText = [
    "Skillnaden mellan hur du vill att det ska vara och hur det faktiskt är, är stor i det här livsområdet... ",
  ];

  const howHappyLable = [
    "Helt och hållet missnöjd",
    "Mycket missnöjd",
    "Missnöjd",
    "Ganska missnöjd",
    "Lite missnöjd",
    "Varken nöjd eller missnöjd",
    "Lite nöjd",
    "Ganska nöjd",
    "Nöjd",
    "Mycket nöjd",
    "Helt och hållet nöjd",
  ];

  const howImportentLable = [
    "Helt och hållet oviktigt",
    "Mycket oviktigt",
    "Oviktigt",
    "Ganska oviktigt",
    "Lite oviktigt",
    "Varken viktigt eller oviktigt",
    "Lite viktigt",
    "Ganska viktigt",
    "Viktigt",
    "Mycket viktigt",
    "Så viktigt det kan bli",
  ];

  const diffText = [
    "störst skillnad",
    "näst störst skillnad",
    "tredje störst skillnad",
    "näst minst skillna",
    "minst skillnad",
  ];

  const handelPickedCard = () => {
    console.log("card pickeds");
  };

  const nextPage = () => {
    history.push({
      pathname: "/",
    });
  };

  const addGoal = (goalText) => {
    console.log("normal goal");
    const goal = {
      howOften: howOften ? howOften : false,
      goalText: goalText,
    };
    setgoalAdded(true);
    localStorage.setItem("goalTodo", JSON.stringify(resultsArray));
    console.log("goal");
    console.log(goal);
  };

  const showHowOften = () => {
    console.log("repatingGoal");

    setOpenHowOften(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setOpenHowOften(false);
    setgoalAdded(false);
    setHowOften("");
  };

  const handleChange = (event) => {
    setHowOften(event.target.value);
  };

  const addRepetingGoal = () => {
    setgoalAdded(true);
  };

  console.log(results);
  return (
    <div>
      <Helmet>
        <title> Livsområden | Hur ser det ut just nu?</title>
      </Helmet>
      <ExerciseAppbar header={"Dina Livsområden"} />
      <Container>
        <Box sx={{ maxWidth: "725px", mx: "auto", pb: 10 }}>
          <StepperExercise activeStep={4} steps={steps} />
          <Headline text="Bra jobbat, nu är du klar med övningen Livsområden!" />

          <CongratsSvg
            title="High five!"
            width={"90%"}
            height={smallScreen ? null : "77vh"}
            fill="#7A7978"
          />

          <Typography>
            Läs igenom resultatet, för att påminna dig själv om vad du svarat.
            Ta gärna en stund efter det att du läst igenom resultatet och
            fundera över dina livsområden, känner du att du lägger din tid på
            rätt ställen idag? Vad kan bli bättre? Var är redan bra? I
            samanfattningen har du även möjlighet att välja att lägga till ditt
            mål på din "att göra lista", väljer du att gör det kommer målet
            sparas i din "att göra list" och du har möjlighet att bocka av det
            när det är genomfört.
          </Typography>
        </Box>

        {results.map(
          ({ title, howImportent, whyNotTen, today, values, diff }, index) => {
            // console.log(title);
            return (
              <Box
                key={index}
                boxShadow={10}
                sx={{
                  display: "table",
                  border: "1px solid lightgrey",
                  margin: "15px",
                  borderRadius: "6px",
                  mx: "auto",
                  mb: "50px",
                  maxWidth: "900px",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                <Box
                  boxShadow={1}
                  sx={{
                    color: "white",
                    padding: "15px",
                    pb: "20px",
                    borderRadius: "6px 6px 0px 0px",
                    position: "relative",
                  }}
                >
                  <Box className="inverted-border-radius-left"> </Box>
                  <Box className="inverted-border-radius-right"> </Box>

                  <Typography variant="h2" textAlign={"center"} sx={{}}>
                    {title}
                  </Typography>
                </Box>
                <form>
                  {/*------------ Presentera skillnaden mellan vikt och nödjhet ----------*/}
                  <Box
                    sx={{
                      bgcolor: "primary.extraLight",
                      padding: "25px",
                      pt: "30px",
                    }}
                  >
                    <Typography
                      variant="h4"
                      textAlign={"center"}
                      sx={{ mb: "15px" }}
                    >
                      {`Enligt dig så är ${title.toLowerCase()} det livsområdet med ${
                        diffText[index]
                      } mellan hur du är nu och hur viktigt det är för dig.`}
                    </Typography>
                    <Typography
                      variant="body1"
                      textAlign={"center"}
                      sx={{ mb: "15px" }}
                    >
                      {`Du skattade livsområdet  som: ${
                        howImportentLable[howImportent - 1]
                      } (${howImportent})
                       och uppgav att du idag var ${
                         howHappyLable[today - 1]
                       } (${today})`}
                    </Typography>

                    <Box
                      sx={{
                        width: "90%",
                        mx: "auto",
                      }}
                    ></Box>
                  </Box>
                  {/*-------------------------- Varför inte en 0? ---------------------------- */}
                  <Box
                    sx={{
                      bgcolor: "white",
                      padding: 3,
                    }}
                  >
                    <Typography
                      variant="h4"
                      textAlign={"center"}
                      sx={{ mb: "15px" }}
                    >
                      Du tror att du skulle vara helt och hållet nöjd med{" "}
                      {title.toLowerCase()} om:
                    </Typography>
                    <Typography
                      variant="body1"
                      textAlign={"center"}
                      sx={{ mb: "15px" }}
                    >
                      {whyNotTen}
                    </Typography>
                  </Box>

                  {/*--------------------------Värderingar ---------------------------- */}
                  <Box
                    sx={{
                      bgcolor: "white",
                      padding: 3,
                      bgcolor: "primary.extraLight",
                    }}
                  >
                    <Typography
                      variant="h4"
                      textAlign={"center"}
                      sx={{ mb: "15px" }}
                    >
                      Dina viktigaste värderingar inom {title.toLowerCase()} är:
                    </Typography>

                    {values.map((item) => {
                      return (
                        <Typography
                          variant="body1"
                          textAlign={"center"}
                          sx={{ mb: "15px" }}
                        >
                          {item.title}
                        </Typography>
                      );
                    })}
                  </Box>

                  {/*-------------------------- Mål---------------------------- */}

                  <Box
                    sx={{
                      padding: 3,
                    }}
                  >
                    <Stack direction="row" justifyContent="center">
                      <Typography
                        variant="h4"
                        textAlign={"center"}
                        sx={{ mt: 1 }}
                      >
                        Vill du lägga till ditt mål ({howImportent}) i din att
                        göra lista?
                      </Typography>
                      <Button
                        sx={{ ml: 2 }}
                        variant="contained"
                        onClick={() => handleClickOpen()}
                      >
                        {" "}
                        Ja{" "}
                      </Button>
                      <Dialog onClose={handleClose} open={open}>
                        <Box sx={{ p: 2 }}>
                          {goalAdded ? (
                            <>
                              <DialogTitle sx={{ fontWeight: "bold" }}>
                                <Stack direction="row" justifyContent="center">
                                  {" "}
                                  <CheckCircleOutlineIcon
                                    fontSize="large"
                                    sx={{ color: "green", mr: 2, pb: 0.5 }}
                                  />{" "}
                                  Ditt mål finns nu i din att göra list!
                                </Stack>
                              </DialogTitle>
                              <Button
                                fullWidth={true}
                                variant="contained"
                                onClick={() => handleClose()}
                              >
                                okej
                              </Button>
                            </>
                          ) : (
                            <>
                              {" "}
                              <DialogTitle>
                                {!openHowOften
                                  ? "Är ditt mål återkommande?"
                                  : "Hur ofta vill du goals"}
                              </DialogTitle>
                              <Divider />{" "}
                              {!openHowOften ? (
                                <Button
                                  fullWidth={true}
                                  onClick={() => showHowOften()}
                                >
                                  Ja{" "}
                                </Button>
                              ) : null}
                              {!openHowOften ? (
                                <Button
                                  onClick={() => addGoal("springa varje dag")}
                                  fullWidth={true}
                                >
                                  {" "}
                                  Nej{" "}
                                </Button>
                              ) : (
                                <>
                                  <FormControl fullWidth>
                                    <InputLabel>Hur ofta</InputLabel>
                                    <Select
                                      id="Hur ofta vill du genomföra ditt mål"
                                      value={howOften}
                                      label="Hur ofta"
                                      onChange={handleChange}
                                    >
                                      <MenuItem value="Varje dag">
                                        {" "}
                                        Varje dag
                                      </MenuItem>
                                      <MenuItem value="En gång i veckan">
                                        {" "}
                                        En gång i veckan
                                      </MenuItem>
                                      <MenuItem value="En gång varannan vecka">
                                        En gång varannan vecka
                                      </MenuItem>
                                      <MenuItem value="En gång i månaden">
                                        En gång i månaden
                                      </MenuItem>
                                    </Select>
                                  </FormControl>
                                  <Button
                                    variant="outlined"
                                    onClick={() => addGoal("springa varje dag")}
                                    fullWidth={true}
                                    sx={{ mt: 1 }}
                                  >
                                    Lägg till mål{" "}
                                  </Button>
                                </>
                              )}
                            </>
                          )}
                        </Box>
                      </Dialog>
                    </Stack>
                  </Box>
                </form>
              </Box>
            );
          }
        )}

        <BackButton goTo={"/valj-livsomraden"}>Tillbaka</BackButton>
        <Button
          variant="contained"
          color="success"
          aria-label="Nästa"
          endIcon={<ArrowForwardIosIcon />}
          onClick={nextPage}
          sx={{ float: "right", mb: "15px", mt: "45px", mr: "15px" }}
        >
          Nästa
        </Button>
        <Box sx={{ width: "100%", height: "15px", clear: "both" }}> </Box>
      </Container>
    </div>
  );
}

export default LifeAreasResults;
