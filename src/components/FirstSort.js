import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import List from "@mui/material/List";
import ItsDoneComponent from "./ItsDoneComponent";
import LinearProgress from "@mui/material/LinearProgress";
import BackButton from "./BackButton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import Checkbox from "@mui/material/Checkbox";

export default function FirstSort() {
    const [checkedState, setCheckedState] = useState(
        new Array(values.length).fill(false)
      );
      const [nrsPicked, setnrsPicked] = useState(0);
      const [itsDone, setitsDone] = useState(false);
      const [showItsDone, setshowItsDone] = useState(false);
      const smallScreen = useMediaQuery("(max-width:322px)");

      useEffect(() => {
        let nr = 0;
        const updateNrsPicked = () => {
          checkedState.forEach((item, index) => {
            if (item) {
              nr = nr + 1;
            }
          });
          setnrsPicked(nr);
        };
        updateNrsPicked();
        if (nr >= 10) {
          setitsDone(true);
        } else {
          setitsDone(false);
        }
      }, [checkedState]);

      const handleOnChange = ({ id, title }) => {
        // sätter true / false för checkbox items
        const updatedCheckedState = checkedState.map((item, index) =>
          index === id ? !item : item
        );
    
        if (itsDone && checkedState[id]) {
          setCheckedState(updatedCheckedState);
          setshowItsDone(false);
        } else if (itsDone) {
          setshowItsDone(true);
        } else {
          setCheckedState(updatedCheckedState);
          setshowItsDone(false);
        }
        // setUserValues(updatedValues);
      };
      const history = useHistory();

        //handler för nästa knappen
  const nextPage = () => {
    const userValueArray = [];

    checkedState.forEach((item, index) => {
      if (item) {
        userValueArray.push(values[index]);
      }
    });

    history.push({
      pathname: "/valuesorter",
      state: userValueArray,
    });
  };

    return (
        <Box sx={{ overflow: "hidden" }}>
        <div>

          <List
            sx={{
              width: "100%",
              bgcolor: "background.paper",
              position: "relative",
              overflow: "auto",
              maxHeight: "100%",
              "& ul": { padding: 0 },
            }}
            subheader={<li />}
          >
            {values.map(({ title, desc }, id) => {
              return (
                <li key={id}>
                  <div
                    className={checkedState[id] ? "picked" : "value-list-item"}
                  >
                    <Checkbox
                      color="default"
                      sx={{
                        "& .MuiSvgIcon-root": { fontSize: 30 },
                        position: "absolute",
                        right: "36px",
                        verticalAlign: "middle",
                      }}
                      id={`custom-checkbox-${id}`}
                      title={title}
                      checked={checkedState[id]}
                      onChange={() => handleOnChange({ id: id, title: title })}
                    />
                    <Box
                      sx={{
                        mt: "15px",
                        "&:hover": {
                          transform: "scale(1.01)",
                        },
                      }}
                    >
                      <label htmlFor={`custom-checkbox-${id}`}>
                        <Typography variant="h3">
                          {id + 1 + ". " + title + " "}
                        </Typography>
                        <Typography variant="body1">{desc}</Typography>
                      </label>
                    </Box>
                  </div>
                </li>
              );
            })}
          </List>
          <br></br>
          <br></br>
          <Box
            sx={{ transform: smallScreen ? "scale(0.9)" : null, width: "100%" }}
          >
            <BackButton />
  
            {itsDone && (
              <Button
                variant="contained"
                color="primary"
                aria-label="Backa"
                endIcon={<ArrowForwardIosIcon />}
                onClick={nextPage}
                sx={{ float: "right", mb: "15px", mt: "45px", mr: "15px" }}
              >
                Nästa
              </Button>
            )}
  
            {nrsPicked < 10 && (
              <Button
                variant="contained"
                disabled="true"
                color="success"
                aria-label="Backa"
                endIcon={<ArrowForwardIosIcon />}
                onClick={nextPage}
                sx={{ float: "right", mb: "15px", mt: "45px", mr: "15px" }}
              >
                Välj {10 - nrsPicked} till
              </Button>
            )}
          </Box>
        </div>
  
        {showItsDone && (
          <ItsDoneComponent
            title="Du har valt tio värderingar"
            text="Välj bort en värdering om du vill välja en ny"
            option2="Okej"
          />
        )}
      </Box>
  
    )
}
