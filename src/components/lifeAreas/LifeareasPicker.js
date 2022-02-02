import React, { useState, useEffect } from "react";
import ValuePicker from "../ValuePicker";
import lifeAreas from "./lifeAreas";
import { Typography } from "@mui/material";
import ExerciseAppbar from "../ExerciseAppbar";
import Container from "@mui/material/Container";
import Headline from "../Headline";
import { useLocation } from "react-router-dom";
import StepperExercise from "../StepperExcercise";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";

function LifeareasPicker() {
  const location = useLocation();
  const valueArray = location.state;
  console.log(valueArray);

  const [slide, setSlide] = useState(false);

  useEffect(() => {
    setSlide(true);
  }, []); // Only re-run the effect if count changes
  // useEffect körs på varje render, här hämtas data från JSON server

  return (
    <div>
      <div>
        <ExerciseAppbar header={"Livsområden"} step={""} />
        <StepperExercise activeStep={0} />
        <Fade in={slide} mountOnEnter unmountOnExit>
          <Container sx={{ backgroundColor: "white" }}>
            <Headline text="Välj dina livsområden" />
            <Box sx={{ maxWidth: "725px", mx: "auto" }}>
              <Typography variant="body1">
                {/* finns x antal ord läs igenom alla innan du går vidare 
                när du är klar: säker att du vill gå vidare (har du läst alla?) */}
                Nedan ser du en lista på några viktiga livsområden. Läs igenom
                listan och fundera över vilka fem av dessa områden som är
                viktigast för dig. Du väljer själv hur du avgör vilka som är
                viktiga; du kan utgå från vilka områden du upplever ett stort
                behov av förändring inom eller områden som helt enkelt är av
                störst betydelse för dig.
              </Typography>

              <br></br>
              {/* om values finns så körs ValuesComponet  */}

              {lifeAreas && (
                <ValuePicker
                  values={lifeAreas}
                  nrsToPick={3}
                  next="/livsomraden-prioriteringar"
                  back="/livsomraden-information"
                  saveAs="lifeAreas"
                />
              )}
            </Box>
          </Container>
        </Fade>
      </div>
    </div>
  );
}

export default LifeareasPicker;
