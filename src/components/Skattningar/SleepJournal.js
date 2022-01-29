import { Box, Container, Slider, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import ExerciseAppbar from "../ExerciseAppbar";
import Headline from "../Headline";
import ChooseDay from "../utility/ChooseDay";
import TextField from "@material-ui/core/TextField";
import MakeForm from "./MakeForm";

function SleepJournal() {
  const [wentToBed, setWentToBed] = useState();
  const [tryedToSlepp, settryedToSlepp] = useState();
  const [timeTosleep, setTimeToSleep] = useState();
  const [timesAwake, setTimesAwake] = useState();
  const [timeSpentAwake, setTimeSpentAwake] = useState();
  const [wokeUpLaste, setWokeUpLaste] = useState();

  console.log(wentToBed);
  const questionArray = [
    { question: "Vilken tid gick du och la dig?", type: "time" },
    { question: "Vilken tid gick du och la dig?", type: "time" },
  ];

  return (
    <div>
      <ExerciseAppbar header={"Din sömndagbok"} />
      <Container>
        <Box>
          <Headline text={"Sömndagbok"} />
          <ChooseDay />
        </Box>
        <div>
          <form>
            <Box className="formBox">
              <Typography fontWeight={"bold"}>
                1. När gick du och lade dig?
              </Typography>
              <Box sx={{ m: 2 }}>
                {" "}
                <TextField
                  label="Välj tid"
                  defaultValue="22:00"
                  type="time"
                  size="Normal"
                  onChange={(e) => setWentToBed(e.target.value)}
                />
              </Box>
            </Box>

            <Box className="formBox">
              {" "}
              <Typography fontWeight={"bold"}>
                2. När försökte du somna?{" "}
              </Typography>{" "}
              <Box sx={{ m: 2 }}>
                {" "}
                <TextField
                  label="Välj tid"
                  defaultValue="22:00"
                  type="time"
                  size="Normal"
                  onChange={(e) => settryedToSlepp(e.target.value)}
                />
              </Box>
            </Box>

            <Box className="formBox">
              <Typography fontWeight={"bold"}>
                3. Hur lång tid tog det att somna? (i minuter)
              </Typography>{" "}
              <Box sx={{ m: 2 }}>
                {" "}
                <TextField
                  label="Min"
                  type="number"
                  size="Normal"
                  onChange={(e) => setTimeToSleep(e.target.value)}
                />
              </Box>
            </Box>

            <Box className="formBox">
              {" "}
              <Typography fontWeight={"bold"}>
                4. Hur många gånger vaknade du, bortsett från sista gången på
                morgonen?
              </Typography>{" "}
              <Box sx={{ m: 2 }}>
                <Stack direction="row" spacing={3}>
                  <Typography> 0 </Typography>{" "}
                  <Slider
                    sx={{ maxWidth: "250px" }}
                    defaultValue={5}
                    valueLabelDisplay="auto"
                    step={1}
                    min={0}
                    max={20}
                    onChange={(e) => setTimesAwake(e.target.value)}
                  />
                  <Typography> 20+ </Typography>{" "}
                </Stack>
              </Box>
            </Box>

            <Box className="formBox">
              <Typography fontWeight={"bold"}>
                5. Hur länge varade vakenstunderna (i minuter) totalt?
              </Typography>{" "}
              <Box sx={{ m: 2 }}>
                {" "}
                <TextField
                  label="Min"
                  type="number"
                  size="Normal"
                  onChange={(e) => setTimeSpentAwake(e.target.value)}
                />
              </Box>
            </Box>

            <Box className="formBox">
              <Typography fontWeight={"bold"}>
                6a. När vaknade du sista gången?
              </Typography>
              <Box sx={{ m: 2 }}>
                {" "}
                <TextField
                  label="Välj tid"
                  defaultValue="07:00"
                  type="time"
                  size="Normal"
                  onChange={(e) => setWokeUpLaste(e.target.value)}
                />
              </Box>
            </Box>

            <Box className="formBox">
              <Typography fontWeight={"bold"}>
                6b. Efter det att du vaknat sista gången, hur länge (i minuter)
                låg du då kvar i sängen och försökte somna om?
              </Typography>{" "}
              <Box sx={{ m: 2 }}>
                {" "}
                <TextField
                  label="Min"
                  type="number"
                  size="Normal"
                  onChange={(e) => setTimeSpentAwake(e.target.value)}
                />
              </Box>
            </Box>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default SleepJournal;
