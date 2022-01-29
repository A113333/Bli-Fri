import React from "react";
import TextField from "@material-ui/core/TextField";
import { Box, Container, Typography } from "@mui/material";
function MakeForm(props) {
  console.log(props);

  const questionArray = [
    { question: "Vilken tid gick du och la dig?", type: "time" },
    { question: "Vilken tid gick du och la dig?", type: "time" },
    { question: "Vilken tid gick du och la dig?", type: "time" },
  ];

  return (
    <div>
      <Typography variant="h3"> 1 </Typography>;
      {questionArray.map((item, index) => {
        return (
          <div>
            <Typography variant="h3"> {item.question} </Typography>
            <Typography variant="h3"> {item.type} </Typography>
            {item.type === "time" && (
              <TextField label="Välj tid" defaultValue="21:00" type="time" />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default MakeForm;
