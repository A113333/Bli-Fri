import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useMediaQuery } from "@mui/material";

export default function HorizontalLinearStepper(props) {
  const [activeStep] = React.useState(props.activeStep);
  const smallScreen = useMediaQuery("(max-width:322px)");
  // console.log(props);
  const steps = props.steps ? props.steps : ["1", "2", "3"];

  return (
    <Box
      sx={{
        width: "75%",
        pt: "25px",
        mx: "auto",
      }}
    >
      {/*alternativeLabel sätter texten under iconen */}
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
