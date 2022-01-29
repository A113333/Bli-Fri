import ExerciseAppbar from "../ExerciseAppbar.js";
import Headline from "../Headline";
import BackButton from "../BackButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Container from "@mui/material/Container";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import StepperExercise from "../StepperExcercise";
import ProgressTracker from "../utility/ProgressTracker";

function LifeAreasPriority() {
  const [lifeAreasState, setLifeAreas] = React.useState([]);
  const [today, setToday] = React.useState();
  const [todayError, setTodayError] = React.useState(false);
  const [howImportent, setHowImportent] = React.useState();
  const [howImportentError, setHowImportentError] = React.useState(false);
  const [obstacle, setObstacle] = React.useState("");
  const [lifeAreasDone, setLifeAreasDone] = React.useState(0);
  const [isItDone, setIsItDone] = React.useState(false);
  const [showLifeArea, setShowLifeArea] = React.useState(0);

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

  let saveAs = "prioLifeAreas";

  useEffect(() => {
    if (showLifeArea === lifeAreas.length) {
      setIsItDone(true);
    }
  }, [showLifeArea]);

  function valuetext(value) {
    return "${value}";
  }
  const history = useHistory();

  const nextPage = () => {
    localStorage.setItem(saveAs, JSON.stringify(lifeAreasState));

    history.push({
      pathname: "/livsomraden-varderingar",
      state: lifeAreasState,
    });
  };

  const location = useLocation();
  const localLifeAreas = localStorage.getItem("lifeAreas");
  const lifeAreas = location.state
    ? location.state
    : JSON.parse(localLifeAreas);
  // location.state;
  console.log(lifeAreas);

  const nextLifeArea = () => {
    console.log("hehe");
  };
  const resetVaules = () => {
    setToday();

    setHowImportent();
  };

  const handleSubmit = ({ title }) => {
    if (today === undefined && howImportent === undefined) {
      console.log("noToday");
      console.log(today);
      console.log("howImportent");
      console.log(howImportent);
      setTodayError(true);
      setHowImportentError(true);
      return;
    }
    if (today === undefined) {
      console.log("noToday");
      setTodayError(true);
      return;
    }
    if (howImportent === undefined) {
      console.log("noImportente");
      setHowImportentError(true);
      return;
    }
    // det okjekt som ska sparas
    let lifeArea = {
      title: title,
      today: today,
      howImportent: howImportent,
      obstacle: obstacle,
      diff: howImportent - today,
    };
    console.log("---------------------");
    console.log(lifeAreasState);
    // ((prevValues) => [...prevValues, lifeArea]) sätter in den nya "lifeArea" sist i lifeAres arrayn
    setLifeAreas((prevValues) => [...prevValues, lifeArea]);
    setShowLifeArea(showLifeArea + 1);
    resetVaules();
  };

  useEffect(() => {
    if (showLifeArea === lifeAreas.length) {
      setIsItDone(true);
    }
  }, [showLifeArea]);

  useEffect(() => {
    setHowImportentError(false);
  }, [howImportent]);

  useEffect(() => {
    setTodayError(false);
  }, [today]);

  const goBackOneCard = () => {
    console.log("backar");
  };

  return (
    <div>
      <ExerciseAppbar header={"Dina Livsområden"} step={" "} />
      <ProgressTracker
        nrsToPick={lifeAreas.length}
        nrsPicked={showLifeArea}
        isItDone={isItDone}
      />
      <Container>
        <StepperExercise
          activeStep={1}
          steps={["Välj områden", "Prioritera", "Placeholder"]}
        />

        {isItDone && <Headline text="Bra jobbat" />}
        {!isItDone && <Headline text="Prioritera dina livsområden" />}

        <Box sx={{ maxWidth: "725px", mx: "auto" }}>
          {isItDone && <Typography>Du är färdig! Duktig du är!</Typography>}
          {!isItDone && (
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat. (0 = helt
              onöjd; 10 = helt och hållet nöjd). 0 = helt oviktigt ; 10 =
              väldigt viktigt)
            </Typography>
          )}
        </Box>
        <Box>
          {lifeAreas.map(({ title }, index) => {
            // console.log(title);
            return (
              <Box
                className={index === showLifeArea ? "show" : "hidden"}
                boxShadow={10}
                key={index}
                sx={{
                  display: "table",
                  border: "1px solid lightgrey",
                  margin: "15px",
                  borderRadius: "6px",
                  mx: "auto",
                  mb: "50px",
                  maxWidth: "100%",
                  mt: "50px",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                <Box
                  boxShadow={0}
                  sx={{
                    color: "white",
                    padding: "15px",
                    pt: "20px",
                    pb: "20px",
                    borderRadius: "6px 6px 0px 0px",
                    position: "relative",
                  }}
                >
                  <Box className="inverted-border-radius-left"> </Box>
                  <Box className="inverted-border-radius-right"> </Box>

                  <Typography variant="h2" textAlign={"center"} sx={{}}>
                    {" "}
                    {title}
                  </Typography>
                </Box>
                <form onSubmit={handleSubmit}>
                  <Box
                    className={todayError && "errorBorder"}
                    sx={{
                      bgcolor: "primary.extraLight",
                      padding: "15px",
                      pt: "30px",
                      pb: "30px",
                      borderRadius: "0px 0px 0px 0px",
                    }}
                  >
                    <Typography
                      variant="h4"
                      textAlign={"center"}
                      sx={{ mb: "10px" }}
                    >
                      Hur nöjd är du med livsområdet "{title}" idag?
                    </Typography>
                    {!todayError ? (
                      <Typography
                        variant="body1"
                        textAlign={"center"}
                        sx={{ mb: "10px" }}
                      >
                        - {howHappyLable[today]}{" "}
                      </Typography>
                    ) : (
                      <Typography
                        variant="body1"
                        textAlign={"center"}
                        sx={{ mb: "10px", color: "error.main" }}
                      >
                        Du måste svara på hur nöjd du är med detta område idag
                        för att gå vidare
                      </Typography>
                    )}

                    <Stack
                      spacing={2}
                      direction="row"
                      sx={{}}
                      justifyContent="center"
                    >
                      <Typography sx={{ fontWeight: "bold", pt: "3px" }}>
                        0
                      </Typography>
                      <Slider
                        aria-label={title}
                        defaultValue={5}
                        getAriaValueText={valuetext}
                        valueLabelDisplay="auto"
                        step={1}
                        min={0}
                        max={10}
                        sx={{ width: "75%" }}
                        onChange={(e) => setToday(e.target.value)}
                      />
                      <Typography sx={{ fontWeight: "bold", pt: "3px" }}>
                        10
                      </Typography>
                    </Stack>
                  </Box>

                  <Box
                    className={howImportentError && "errorBorder"}
                    sx={{ padding: "15px", pt: "30px", pb: "30px" }}
                  >
                    <Typography
                      variant="h4"
                      textAlign={"center"}
                      sx={{ mb: "10px" }}
                    >
                      Hur viktigt är livsområdet "{title}" för dig?
                    </Typography>

                    {!howImportentError ? (
                      <Typography
                        variant="body1"
                        textAlign={"center"}
                        sx={{ mb: "10px" }}
                      >
                        - {howImportentLable[howImportent]}
                      </Typography>
                    ) : (
                      <Typography
                        variant="body1"
                        textAlign={"center"}
                        sx={{ mb: "10px", color: "error.main" }}
                      >
                        Du måste välja hur viktigt detta område är för att gå
                        vidare
                      </Typography>
                    )}

                    <Stack
                      spacing={2}
                      direction="row"
                      sx={{ mb: 1 }}
                      justifyContent="center"
                    >
                      <Typography sx={{ fontWeight: "bold", pt: "3px" }}>
                        {" "}
                        0{" "}
                      </Typography>{" "}
                      <Slider
                        aria-label={title}
                        defaultValue={5}
                        getAriaValueText={valuetext}
                        valueLabelDisplay="auto"
                        step={1}
                        min={0}
                        max={10}
                        sx={{ width: "75%" }}
                        onChange={(e) => setHowImportent(e.target.value)}
                      />
                      <Typography sx={{ fontWeight: "bold", pt: "3px" }}>
                        {" "}
                        10{" "}
                      </Typography>
                    </Stack>
                  </Box>

                  <Box
                    sx={{
                      bgcolor: "primary.extraLight",
                      padding: "25px",
                      pt: "30px",
                      pb: "60px",
                    }}
                  >
                    <Typography
                      variant="h4"
                      textAlign={"center"}
                      sx={{ mb: "15px" }}
                    >
                      {" "}
                      Finns det något som hindrar dig från att ha {title} såsom
                      du vill ha det?{" "}
                    </Typography>
                    <TextField
                      fullWidth
                      id="obstacle"
                      label="Om Ja, skriva in vad som hindrar dig här"
                      variant="outlined"
                      sx={{ backgroundColor: "white" }}
                      onChange={(e) => setObstacle(e.target.value)}
                    />

                    <Button
                      variant="contained"
                      aria-label="Backa"
                      startIcon={<ArrowBackIosIcon />}
                      onClick={() => goBackOneCard()}
                      sx={{
                        position: "absolute",
                        padding: "10px",
                        borderRadius: " 0  6px 0 6px",
                        left: "0px",
                        bottom: "0px",
                      }}
                    >
                      {" "}
                      Förra livsområdet{" "}
                    </Button>

                    <Button
                      variant="contained"
                      aria-label="Backa"
                      endIcon={<ArrowForwardIosIcon />}
                      onClick={() => handleSubmit({ title: title })}
                      sx={{
                        position: "absolute",
                        padding: "10px",
                        borderRadius: "6px 0  6px 0",
                        right: "0px",
                        bottom: "0px",
                      }}
                    >
                      {" "}
                      Nästa livsområde{" "}
                    </Button>
                  </Box>
                </form>
              </Box>
            );
          })}
        </Box>
        <BackButton goTo={"/valj-livsomraden"}>Tillbaka</BackButton>
        <Button
          variant="contained"
          disabled={!isItDone}
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

export default LifeAreasPriority;
