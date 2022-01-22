import React, { useState, useEffect } from "react";
import ValuePicker from "../ValuePicker";
import lifeAreas from "./lifeAreas";
import { Typography } from "@mui/material";
import ExerciseAppbar from "../ExerciseAppbar";
import Slide from "@mui/material/Slide";
import Container from "@mui/material/Container";
import Headline from "../Headline";
import values from "../values";
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat
              </Typography>
            </Box>

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
          </Container>
        </Fade>
      </div>
    </div>
  );
}

export default LifeareasPicker;
