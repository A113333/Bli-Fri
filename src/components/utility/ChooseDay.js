import React, { useState } from "react";
import { Divider, Stack, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import svLocale from "date-fns/locale/sv";

function ChooseDay() {
  const [date, setDate] = React.useState(null);

  const todayText = new Date().toLocaleDateString("sv-SV", {
    month: "long",
    day: "numeric",
  });

  const pickedDate = date
    ? date.toLocaleDateString("sv-SV", {
        month: "long",
        day: "numeric",
      })
    : null;

  var today = new Date();
  var differenceInTime = date ? today.getTime() - date.getTime() : null;
  var differenceInDays = date
    ? Math.floor(differenceInTime / (1000 * 3600 * 24))
    : null;

  var whatDay = () => {
    if (date && differenceInDays === 0) return "Idag";
    if (date && differenceInDays === 1) return "Igår";
    if (date && differenceInDays === 2) return "Förrgår";
    if (date && differenceInDays === -1) return "Imorgon";
    if (date && differenceInDays <= -1)
      return "Om " + differenceInDays * -1 + " dagar";
    if (date && differenceInDays >= -1)
      return "För " + differenceInDays + " dagar sedan";
  };

  return (
    <div>
      <Box sx={{ mb: 5 }}>
        <Stack
          direction="row"
          spacing={3}
          justifyContent="center"
          alignItems="center"
        >
          {" "}
          <Typography variant={"h3"}>Fyll i för idag eller</Typography>{" "}
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={svLocale}>
            <DatePicker
              label="Välj en dag"
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  sx={{
                    ".MuiInputLabel-outlined": {
                      transform: "translate(18px, 18px) scale(1)",
                    },
                    ".MuiInputBase-input": { padding: 2 },
                  }}
                  className="datePicker"
                  {...params}
                />
              )}
            />
          </LocalizationProvider>
        </Stack>
      </Box>

      <Box sx={{ width: "50", textAlign: "center" }}>
        <Stack
          direction="row"
          spacing={3}
          justifyContent="center"
          alignItems="center"
        >
          <Box>
            <Typography variant={"subtitle1"} textAlign={"center"}>
              {date ? pickedDate : todayText}
            </Typography>
            <Typography variant={"h3"}>
              {" "}
              {date && differenceInDays !== 0 ? whatDay() : " Idag"}{" "}
            </Typography>{" "}
          </Box>
        </Stack>
        <Divider />
      </Box>
    </div>
  );
}

export default ChooseDay;
