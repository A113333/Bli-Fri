import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Slide from "@mui/material/Slide";
import ExerciseAppbar from "./ExerciseAppbar";
import { Divider } from "@mui/material";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import BackToHomeButton from "./BackToHomeButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import StepperExercise from "./StepperExcercise";

const labels = {
  0: "Väldigt Dåligt",

  1: "Ganska Dåligt",

  2: "Rätt bra",

  3: "Bra",

  4: "Mycket Bra",

  5: "Väldigt Bra",
};

function ValueResults(obj) {
  const [slide, setSlide] = useState(false);
  const [value, setValue] = React.useState(3);
  const [hover, setHover] = React.useState(-1);
  const [ShowValueInfo, setShowValueInfo] = React.useState(0);

  useEffect(() => {
    postResult();
    setSlide(true);
  }, []);

  const location = useLocation();
  const valueArray = location.state;

  const results = valueArray.sort((a, b) => {
    return b.pts - a.pts;
  });

  const user = {
    values: results,
    state: 1.1,
  };

  const handleShowValueInfo = (index) => {
    console.log(index);
    setShowValueInfo(index);
  };

  const postResult = () => {
    fetch("http://localhost:3000/user", {
      // berättar för servern att det är en post med JSON data
      method: "POST",
      headers: { "Content-Type": "application/json" },
      //datan som ska skickas
      body: JSON.stringify(user),
    }).then(() => {
      // visa confomration att det sparats här?
    });
  };

  return (
    <Slide direction="left" in={slide} mountOnEnter unmountOnExit>
      <div>
        <ExerciseAppbar header={"Värderinskompassen"} step={"3 av 3"} />
        <StepperExercise
          activeStep={3}
          steps={["Välj tio", "Välj fem", "Prioritera"]}
        />
        <div className="textWrapper">
          <div>
            <Typography
              variant="h2"
              gutterBottom
              align="center"
              sx={{ mt: "30px" }}
            >
              Dina fem viktigaste värderingar
            </Typography>
            <Divider></Divider>
            <Typography
              variant="body1"
              gutterBottom
              sx={{ mb: "25px", mt: "25px", maxWidth: "725px", mx: "auto" }}
            >
              Bra jobbat, ta ett djupt andetag och tacka dig själv, du har
              precis gjort något viktigt och meningsfullt för din egna skull. Ta
              en noggrann titt på dina värderingar. Vi kommer utforska vad dom
              betyder för dig och hur du kan bli bättre på att låta dom vägleda
              dig genom livet i övning 3.
            </Typography>
            <div className="noStyleList">
              {results.map(({ title, desc, pts }, index) => {
                return (
                  <Slide
                    direction="up"
                    in={true}
                    timeout={index}
                    mountOnEnter
                    unmountOnExit
                  >
                    <Box
                      onClick={() => handleShowValueInfo(index)}
                      key={index}
                      className={
                        ShowValueInfo === index ? "transform90" : "not active"
                      }
                      sx={{
                        display: "table",
                        mx: "auto",
                        transform: "scale(1)",
                        margin: "auto",
                        mt: "15px",
                        boxShadow: 7,
                        borderColor: "grey.500",
                        width: "95%",
                        height: "200px",
                        maxWidth: "450px",
                        bgColor: "primary.main",
                        color: "primary.main",
                        borderRadius: "6px",
                        mb: "25px",
                        "&:hover": {
                          bgColor: "scale(1.1)",
                        },
                      }}
                    >
                      <Avatar
                        sx={{
                          position: "absolute",
                          bgcolor: "primary.extraLight",
                          color: "primary.main",
                          float: "left",
                          width: 30,
                          height: 30,
                          mt: "15px",
                          ml: "15px",
                          fontWeight: "bold",
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: "bold", userSelect: "none" }}
                        >
                          {" "}
                          {index + 1}
                        </Typography>{" "}
                      </Avatar>

                      <li key={index}>
                        <Typography
                          variant="h2"
                          sx={{
                            textAlign: "center",
                            paddingBottom: "5px",
                            pt: "25px",
                            ml: "30px",
                            mr: "30px",
                            pb: "5px",
                            mt: "5px",

                            userSelect: "none",
                          }}
                        >
                          {title}
                        </Typography>
                        <Divider
                          className="white"
                          sx={{ width: "65%", mx: "auto" }}
                        ></Divider>
                        <Typography
                          variant="body1"
                          sx={{
                            p: "15px",
                            fontSize: "1.1rem",
                            userSelect: "none",
                            ml: "25px",
                            mr: "25px",
                          }}
                        >
                          {" Jag vill " + desc.toLocaleLowerCase()}
                        </Typography>
                      </li>
                    </Box>
                  </Slide>
                );
              })}
            </div>
            <br></br>
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                mb: "25px",
                mt: "25px",
                maxWidth: "725px",
                textAlign: "center",
              }}
            >
              Hur bra tycker du att du lever efter dessa fem värderingar idag?
            </Typography>
            <Divider />
            <Box
              sx={{
                mx: "auto",
                width: 200,
                display: "flex",
                alignItems: "center",
                height: "40px",
                mt: "25px",
              }}
            >
              <Rating
                name="hover-feedback"
                value={value}
                precision={1}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              {value !== null && (
                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
              )}
            </Box>
            <Typography
              variant="h3"
              sx={{
                textAlign: "center",
                paddingBottom: "5px",
                pt: "25px",
                pb: "10px",
                mt: "5px",
                mr: "45px",
                userSelect: "none",
              }}
            >
              Första övningen klar!
            </Typography>
            <Divider></Divider>
            <Typography variant="body1" gutterBottom sx={{ pt: "10px" }}>
              I nästa övning, "Dina livsområden" kommer vi fortsätta fördjupa
              oss i värderingar. Där kommer vi utforska hur dina värderingar ser
              ut i olika livsområden och hur du värderar olika delarna av livet.
            </Typography>
          </div>
          <Box textAlign="center">
            {" "}
            <BackToHomeButton />{" "}
          </Box>
        </div>
      </div>
    </Slide>
  );
}

export default ValueResults;
