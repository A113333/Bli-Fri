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

function LifeAreasValues() {
  const [isItDone, setIsItDone] = React.useState(false);
  const [showLifeArea, setShowLifeArea] = React.useState(0);
  const [whyNotZero, setWhyNotZero] = React.useState("");
  const [whyNotTen, setWhyNotTen] = React.useState("");
  const [resultsArray, setResultsArray] = React.useState("");

  const resetCard = () => {
    setWhyNotZero("");
    setWhyNotTen("");
    setCheckedState(new Array(top10ValuesLocal.length).fill(false));
  };

  const location = useLocation();
  const localPrioLifeAreas = localStorage.getItem("prioLifeAreas");
  const prioLifeAreas = location.state
    ? location.state
    : JSON.parse(localPrioLifeAreas);
  // location.state;

  const results = prioLifeAreas.sort((a, b) => {
    return b.diff - a.diff;
  });

  useEffect(() => {
    if (showLifeArea === results.length) {
      setIsItDone(true);
    }
  }, [showLifeArea, results]);

  const smallScreen = useMediaQuery("(max-width:700px)");

  let saveAs = "resultsLifeArea";

  const handleSubmit = ({ title }) => {
    /* Sparar dom valda värderingarna till prioLifeAreas objectet */
    let userValueArray = [];
    checkedState.forEach((item, index) => {
      if (item) {
        userValueArray.push(top10ValuesLocal[index]);
      }
    });
    let today;
    let howImportent;
    let diff;
    let obstacle;
    results.forEach((item, index) => {
      if (item.title === title) {
        console.log(item);
        today = item.today;
        howImportent = item.howImportent;
        diff = item.diff;
        obstacle = item.obstacle;
      }
    });

    let prioLifeAreas = {
      title: title,
      values: userValueArray,
      whyNotZero: whyNotZero,
      whyNotTen: whyNotTen,
      today: today,
      howImportent: howImportent,
      diff: diff,
      obstacle: obstacle,
    };

    setResultsArray((prevValues) => [...prevValues, prioLifeAreas]);
    resetCard();
    setShowLifeArea(showLifeArea + 1);
    if (showLifeArea !== lifeAreas.length) {
      window.scrollTo({ top: 250, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 50, behavior: "smooth" });
    }
    console.log(prioLifeAreas);
  };

  const history = useHistory();
  const nextPage = () => {
    localStorage.setItem(saveAs, JSON.stringify(resultsArray));

    history.push({
      pathname: "/livsomraden-resultat",
      state: resultsArray,
    });
  };

  const top10ValuesLocal = JSON.parse(localStorage.getItem("userValues10"));
  const [checkedState, setCheckedState] = useState(
    new Array(top10ValuesLocal.length).fill(false)
  );

  const handleChange = ({ id, title }) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === id ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  const goBackOneCard = () => {
    console.log("backar");
  };

  const titleRef = useRef();
  const topRef = useRef();

  return (
    <div>
      <Helmet>
        <title> Livsområden | Värderingar </title>
      </Helmet>
      <ExerciseAppbar header={"Dina Livsområden"} />
      <ProgressTracker
        nrsToPick={prioLifeAreas.length}
        nrsPicked={showLifeArea}
        isItDone={isItDone}
      />
      <Container>
        <StepperExercise
          ref={topRef}
          activeStep={2}
          steps={["Välj områden", "Prioritera", "Placeholder"]}
        />

        {isItDone && <Headline text="Bra jobbat" />}
        {!isItDone && (
          <Headline text="Hitta dina värderingar i dina olika livsområden" />
        )}

        <Box sx={{ maxWidth: "725px", mx: "auto", pb: 10 }}>
          {isItDone && <Typography>Du är färdig! Duktig du är!</Typography>}
          {showLifeArea === 0 && (
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
          {results.map(({ title, howImportent, today, diff }, index) => {
            // console.log(title);
            return (
              <Box
                key={index}
                className={index === showLifeArea ? "show" : "hidden"}
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
                    {title} hur viktigt: {howImportent} idag: {today} skillnad:{" "}
                    {diff}
                  </Typography>
                </Box>
                <form onSubmit={handleSubmit}>
                  {/*------------ Kolla om några värderingar är extra viktigta ----------*/}
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
                      Är det någon/några av dina viktigaste värderingar som är
                      särskilt betydelsefullt för detta livsområde?
                    </Typography>
                    <Box
                      ref={titleRef}
                      sx={{
                        width: "90%",
                        mx: "auto",
                        ml: smallScreen ? 0 : 16,
                      }}
                    >
                      {top10ValuesLocal.map(({ title, desc }, index) => {
                        return (
                          <FormControlLabel
                            sx={{ width: "30%" }}
                            key={index}
                            control={
                              <Checkbox
                                id={`custom-checkbox-${index}`}
                                title={title}
                                checked={checkedState[index]}
                                onChange={() =>
                                  handleChange({ id: index, title: title })
                                }
                              />
                            }
                            label={title}
                          />
                        );
                      })}
                    </Box>
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
                      {today === 0
                        ? " Varför är du är helt och hållet MISSNÖJD med " +
                          title +
                          "?"
                        : "Vad skulle göra dig helt och hållet MISSNÖJD med " +
                          title +
                          "?"}
                    </Typography>
                    <TextField
                      fullWidth
                      id="obstacle"
                      label="Skriv in ditt svar här"
                      variant="outlined"
                      sx={{ backgroundColor: "white" }}
                      onChange={(e) => setWhyNotZero(e.target.value)}
                    />
                  </Box>
                  {/*-------------------------- Varför inte en 10? ---------------------------- */}
                  <Box
                    sx={{
                      bgcolor: "primary.extraLight",
                      padding: 3,
                      pb: 8,
                    }}
                  >
                    <Typography
                      variant="h4"
                      textAlign={"center"}
                      sx={{ mb: "15px" }}
                    >
                      {today === 10
                        ? "Vad gör att du är helt och hållet NÖJD med " +
                          title +
                          "?"
                        : "Vad skulle behövas för att du skulle känna dig helt och hållet NÖJD med " +
                          title +
                          "?"}
                    </Typography>
                    <TextField
                      fullWidth
                      id="obstacle"
                      label="Skriv in ditt svar här"
                      variant="outlined"
                      sx={{ backgroundColor: "white" }}
                      onChange={(e) => setWhyNotTen(e.target.value)}
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

export default LifeAreasValues;
