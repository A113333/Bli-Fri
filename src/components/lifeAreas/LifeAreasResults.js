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

function LifeAreasResults() {
  const location = useLocation();
  const resultsArray = localStorage.getItem("resultsLifeArea");
  const results = location.state ? location.state : JSON.parse(resultsArray);

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

  const handelPickedCard = () => {
    console.log("card pickeds");
  };

  const nextPage = () => {
    console.log("tillbakahem");
  };
  return (
    <div>
      <Helmet>
        <title> Livsområden | Vad kan bli bättre?</title>
      </Helmet>
      <ExerciseAppbar header={"Dina Livsområden"} />
      <Container>
        <Box sx={{ maxWidth: "725px", mx: "auto", pb: 10 }}>
          <StepperExercise
            activeStep={3}
            steps={["Välj områden", "Prioritera", "Placeholder"]}
          />
          <Headline text="Bra jobbat, nedan ser du en samanfattning av dina livsområden" />

          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat.
          </Typography>
        </Box>

        {results.map(({ title, howImportent, today, diff }, index) => {
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
                  {index === 0 &&
                    "Det verkar som att det området där skillnaden mellan hur du har det och hur du önskade att det var är " +
                      title}
                  {title} hur viktigt: {howImportent} idag: {today} skillnad:{" "}
                  {diff}
                </Typography>
              </Box>
              <form>
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
                  />

                  <Button
                    variant="contained"
                    aria-label="Backa"
                    endIcon={<ArrowForwardIosIcon />}
                    onClick={() => handelPickedCard({ title: title })}
                    sx={{
                      padding: "10px",
                      borderRadius: "6px 0  6px 0",
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
