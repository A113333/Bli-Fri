import {
  Box,
  Button,
  Container,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import SleepIcon from "@mui/icons-material/LocalHotel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import React, { useState } from "react";
import ExerciseAppbar from "../ExerciseAppbar";
import Headline from "../Headline";
import ChooseDay from "../utility/ChooseDay";
import TextField from "@material-ui/core/TextField";
import MakeForm from "./MakeForm";
import { ReactComponent as SleepImg } from "../img/sleep.svg";
import useMediaQuery from "@mui/material/useMediaQuery";

function SleepJournal() {
  const [wentToBed, setWentToBed] = useState();
  const [tryedToSlepp, settryedToSlepp] = useState();
  const [timeTosleep, setTimeToSleep] = useState();
  const [timesAwake, setTimesAwake] = useState();
  const [timeSpentAwake, setTimeSpentAwake] = useState();
  const [wokeUpLast, setWokeUpLaste] = useState();
  const [didWakeUpEarly, setdidWakeUpEarly] = useState(false);
  const [howMuchEarly, sethowMuchEarly] = useState();
  const [whenWentUp, setwhenWentUp] = useState();
  const [sleepQuality, setsleepQuality] = useState();
  const [howRested, sethowRested] = useState();
  const [howManyNaps, sethowManyNaps] = useState(1);
  const [napTotalTime, setnapTotalTime] = useState();
  const [coffeOrOther, setcoffeOrOther] = useState(false);
  const [coffeTime, setcoffeTime] = useState(false);

  console.log(whenWentUp);
  const questionArray = [
    { question: "Vilken tid gick du och la dig?", type: "time" },
    { question: "Vilken tid gick du och la dig?", type: "time" },
  ];
  const smallScreen = useMediaQuery("(max-width:445px)");
  const saveData = () => {
    console.log("runs");

    const data = {
      wentToBed: wentToBed,
      tryedToSlepp: tryedToSlepp,
      timeTosleep: timeTosleep,
      timesAwake: timesAwake,
      timeSpentAwake: timeSpentAwake,
      wokeUpLaste: wokeUpLast,
      didWakeUpEarly: didWakeUpEarly,
      howMuchEarly: howMuchEarly,
      whenWentUp: whenWentUp,
      sleepQuality: sleepQuality,
      howRested: howRested,
      howManyNaps: howManyNaps,
      napTotalTime: napTotalTime,
      coffeOrOther: coffeOrOther,
      coffeTime: coffeTime,
    };
    console.log(data);
  };

  console.log(timesAwake);
  return (
    <div>
      <ExerciseAppbar header={"Din sömndagbok"} icon={<SleepIcon />} />
      <Container>
        <Box sx={{ position: "relative" }}>
          <Headline text={"Din Sömndagbok"} />
          <ChooseDay />
        </Box>
        <div>
          <form>
            <Box sx={{ pb: 5 }}>
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
                      defaultValue={10}
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
                  6b. Efter det att du vaknat sista gången, hur länge (i
                  minuter) låg du då kvar i sängen och försökte somna om?
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
                  6c. Vaknade du tidigare än planerat?
                </Typography>{" "}
                <Box sx={{ m: 2 }}>
                  <FormControl>
                    {" "}
                    <RadioGroup row>
                      <FormControlLabel
                        value={true}
                        control={<Radio />}
                        label="Ja"
                        onChange={(e) => setdidWakeUpEarly(true)}
                      />

                      <FormControlLabel
                        value={false}
                        control={<Radio />}
                        label="Nej"
                        onChange={(e) => setdidWakeUpEarly(false)}
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
              </Box>
              {didWakeUpEarly && (
                <Box className="formBox">
                  <Typography fontWeight={"bold"}>
                    6d. Hur mycket tidigare än plannerat?
                  </Typography>{" "}
                  <Box sx={{ m: 2 }}>
                    {" "}
                    <TextField
                      label="Min"
                      type="number"
                      size="Normal"
                      onChange={(e) => sethowMuchEarly(e.target.value)}
                    />
                  </Box>
                </Box>
              )}

              <Box className="formBox">
                {" "}
                <Typography fontWeight={"bold"}>
                  7. När gick du upp för dagen?
                </Typography>{" "}
                <Box sx={{ m: 2 }}>
                  {" "}
                  <TextField
                    label="Välj tid"
                    defaultValue="08:00"
                    type="time"
                    size="Normal"
                    onChange={(e) => setwhenWentUp(e.target.value)}
                  />
                </Box>
              </Box>

              <Box className="formBox">
                {" "}
                <Typography fontWeight={"bold"}>
                  8. Hur skulle du bedöma kvaliteten på din sömn? <br></br> 1 =
                  Mycket dålig 5 = Mycket bra
                </Typography>{" "}
                <Box sx={{ m: 2 }}>
                  <Stack direction="row" spacing={3}>
                    <Typography> 1 </Typography>{" "}
                    <Slider
                      sx={{ maxWidth: "250px" }}
                      defaultValue={3}
                      valueLabelDisplay="auto"
                      step={1}
                      min={1}
                      max={5}
                      onChange={(e) => setsleepQuality(e.target.value)}
                    />
                    <Typography> 5 </Typography>{" "}
                  </Stack>
                </Box>
              </Box>

              <Box className="formBox">
                {" "}
                <Typography fontWeight={"bold"}>
                  9. Hur utvilad eller utsövd kände du dig när du vaknade för
                  dagen? <br></br> 1 = Inte alls utvilad. 5= Mycket utvilad
                </Typography>{" "}
                <Box sx={{ m: 2 }}>
                  <Stack direction="row" spacing={3}>
                    <Typography> 1 </Typography>{" "}
                    <Slider
                      sx={{ maxWidth: "250px" }}
                      defaultValue={3}
                      valueLabelDisplay="auto"
                      step={1}
                      min={1}
                      max={5}
                      onChange={(e) => sethowRested(e.target.value)}
                    />
                    <Typography> 5 </Typography>{" "}
                  </Stack>
                </Box>
              </Box>

              <Box className="formBox">
                {" "}
                <Typography fontWeight={"bold"}>
                  10a. Hur många gånger tog du en tupplur eller slumrade till
                  under dagen?
                </Typography>{" "}
                <Box sx={{ m: 2 }}>
                  <Stack direction="row" spacing={3}>
                    <Typography> 0 </Typography>{" "}
                    <Slider
                      sx={{ maxWidth: "250px" }}
                      defaultValue={9}
                      valueLabelDisplay="auto"
                      step={1}
                      min={0}
                      max={20}
                      onChange={(e) => sethowManyNaps(e.target.value)}
                    />
                    <Typography> 20+ </Typography>{" "}
                  </Stack>
                </Box>
              </Box>

              {howManyNaps >= 1 && (
                <Box className="formBox">
                  <Typography fontWeight={"bold"}>
                    10b. Hur länge sov eller slumrade du sammanlagt?
                  </Typography>{" "}
                  <Box sx={{ m: 2 }}>
                    {" "}
                    <TextField
                      label="Min"
                      type="number"
                      size="Normal"
                      onChange={(e) => setnapTotalTime(e.target.value)}
                    />
                  </Box>
                </Box>
              )}

              <Box className="formBox">
                <Typography fontWeight={"bold"}>
                  11a. Drack du någon alkohol eller koffein?
                </Typography>{" "}
                <Box sx={{ m: 2 }}>
                  <FormControl>
                    {" "}
                    <RadioGroup row>
                      <FormControlLabel
                        value={true}
                        control={<Radio />}
                        label="Ja"
                        onChange={(e) => setcoffeOrOther(true)}
                      />

                      <FormControlLabel
                        value={false}
                        control={<Radio />}
                        label="Nej"
                        onChange={(e) => setcoffeOrOther(false)}
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
              </Box>
              {coffeOrOther && (
                <Box className="formBox">
                  <Typography fontWeight={"bold"}>
                    Vid vilken tid konsumerade du senast alkohol ellerkoffein?
                  </Typography>
                  <Box sx={{ m: 2 }}>
                    {" "}
                    <TextField
                      label="Välj tid"
                      defaultValue="22:00"
                      type="time"
                      size="Normal"
                      onChange={(e) => setcoffeTime(e.target.value)}
                    />
                  </Box>
                </Box>
              )}
            </Box>
          </form>
        </div>

        <Button variant="outlined" onClick={saveData}>
          {" "}
          Test{" "}
        </Button>
      </Container>
    </div>
  );
}

export default SleepJournal;
