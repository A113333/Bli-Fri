import React, { useState, useEffect } from "react";
import { useHistory, createBrowserHistory } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import Slide from "@mui/material/Slide";
import Container from "@mui/material/Container";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import LinearProgress from "@mui/material/LinearProgress";
import ItsDoneComponent from "./ItsDoneComponent";
import BackButton from "./BackButton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import useMediaQuery from "@mui/material/useMediaQuery";
import Fade from "@mui/material/Fade";
import Headline from "./Headline";
import ProgressTracker from "./utility/ProgressTracker";

function CardSorter({ valueArray: arryOfValues, next, back, saveAs }) {
  const history = useHistory();

  const [valueArray] = useState(arryOfValues);
  const [showTop, setShowTop] = useState(0);
  const [showBottom, setShowBottom] = useState(1);
  const [startValue, setstartValue] = useState(2);
  const [slide, setSlide] = useState(false);
  const [cardsSorted, setcardsSorted] = useState(0);
  const [totalClicks, settotalClicks] = useState(0);
  const [ShowItsDone, setShowItsDone] = useState(false);
  const [pickedCards, setPickedCards] = useState([]);
  const [isItDone, setisItDone] = useState(false);
  const smallScreen = useMediaQuery("(max-width:322px)");

  const goToResult = () => {
    localStorage.setItem(saveAs, JSON.stringify(valueArray));
    history.push({
      pathname: next,
      state: valueArray,
    });
  };

  useEffect(() => {
    setSlide(true);

    countTotalClicks();
  }, []);

  // Används för att updater totalClicks
  const countTotalClicks = () => {
    let clicks = 0;
    arryOfValues.forEach((item, index) => {
      clicks = clicks + index;
    });
    console.log("clicks :" + clicks);
    settotalClicks(clicks);
  };

  const addPts = (id) => {
    valueArray.forEach((item, index) => {
      if (id === item.id) {
        item.pts = item.pts + 1;
      }
    });
  };

  // körs vid sista kortet för att ta bort första kortet ur displayn
  const restartArr = () => {
    console.log("arr slut");
    // en counter som ökar med 1 för varje iteration genom kortleken
    setstartValue(startValue + 1);
    // updaterar så att nästa item visas
    setShowBottom(startValue);

    setShowTop(showTop + 1);
    console.log("showtop / startvalue" + startValue);
  };

  // id kommer vara samma tills den startar om
  const clickTop = ({ index, id }) => {
    console.log("cardsSorted");
    console.log(cardsSorted);

    setPickedCards((prevArray) => [...prevArray, id]);

    if (cardsSorted !== totalClicks) {
      console.log("setcardsSorted(cardsSorted + 1);");
      setcardsSorted(cardsSorted + 1);
    }

    if (isItDone) {
      setShowItsDone(true);
      return;
    }
    //lägger till pts
    addPts(id);
    // !isItDone för att den inte ska ändra sig på click vid färdigt

    if (startValue === valueArray.length) {
      // om övningen är klar
      console.log("done");
      console.log(valueArray);
      setisItDone(true);
      /*  history.push({
        pathname: "/valueResults",
        state: valueArray,
      }); */

      return;
    }

    // om vi är på sista kortet
    if (showBottom + 1 === valueArray.length) {
      setstartValue(startValue + 1);
      setShowTop(showTop + 1);
      setShowBottom(startValue);
    } else {
      setShowBottom(showBottom + 1);
    }
  };

  const clickBottom = ({ index, id }) => {
    setPickedCards((prevArray) => [...prevArray, id]);

    console.log("cardsSorted");
    console.log(cardsSorted);
    console.log("totalClicks");
    console.log(totalClicks);
    console.log(cardsSorted);
    if (cardsSorted !== totalClicks) {
      setcardsSorted(cardsSorted + 1);
    }

    //om övningen är klart
    if (isItDone) {
      setShowItsDone(true);
      return;
    }

    //lägger till pts
    addPts(id);

    if (startValue === valueArray.length) {
      setisItDone(true);
      return;
    }
    index + 1 === valueArray.length ? restartArr() : setShowBottom(index + 1);
  };

  const goBack = () => {
    console.log("cardsSorted");
    console.log(cardsSorted);
    // för att rätt antal klick ska vara kvar
    setcardsSorted(cardsSorted - 1);

    // tar bort pts från kort när man backar
    const id = pickedCards[pickedCards.length - 1];
    pickedCards.pop();

    if (isItDone) {
      addPts(id);
      setisItDone(false);
      return;
    }

    valueArray.forEach((item, index) => {
      if (id === item.id) {
        item.pts = item.pts - 1;
      }
    });

    // om vi är på första kortet i bottenhögen, dvs om vi måste ändra showTop
    if (startValue === showBottom + 1) {
      console.log("är på första kortet i top, dvs om vi måste ändra showTop");
      setstartValue(startValue - 1);
      setShowTop(showTop - 1);

      setShowBottom(valueArray.length - 1);

      console.log("-------------");
      console.log(startValue);
      console.log(valueArray.length);
    } else if (showBottom >= 0) {
      setShowBottom(showBottom - 1);
    }

    //ta bort points
  };

  return (
    <div>
      <ProgressTracker
        nrsToPick={totalClicks}
        nrsPicked={cardsSorted}
        isItDone={isItDone}
      />

      <Slide direction="left" in={slide}>
        <Container>
          <Box textAlign="center" sx={{ mt: "15px", mb: "15px" }}>
            <Button
              disabled={cardsSorted === 0 ? true : false}
              variant="outlined"
              startIcon={<UndoRoundedIcon />}
              sx={{
                justifyContent: "center",
                margin: "auto",
              }}
              onClick={() => goBack()}
            >
              Ångra val
            </Button>
          </Box>

          <div className="relative">
            <Box>
              {valueArray.map(({ title, desc, id }, index) => {
                return (
                  <Fade
                    timeout={{ enter: 1200, exit: 1200 }}
                    in={showTop === index}
                  >
                    <Box
                      key={"topCard" + id.toString()}
                      className={index === showTop ? "show" : "hidden"}
                      onClick={() => clickTop({ index: index, id: id })}
                      sx={{
                        display: "table",
                        mx: "auto",
                        margin: "auto",
                        boxShadow: 6,
                        width: "100%",
                        height: "200px",
                        maxWidth: "450px",
                        backgroundColor: "white",
                        borderRadius: "6px",
                        userSelect: "none",

                        color: "primary",
                        "&:hover": {
                          transform: "scale(1.02)",
                        },
                      }}
                    >
                      {isItDone && (
                        <Typography
                          variant="h3"
                          sx={{
                            textAlign: "center",
                            paddingBottom: "5px",
                            p: "25px",
                            pb: "10px",

                            padding: "10px",
                            mt: "45px",
                          }}
                        >
                          {" "}
                          Du är nu färdig med övningen! Tryck på "Se resultat"
                          knappen för att se ditt resultat.
                        </Typography>
                      )}

                      <Box className={isItDone && "hiddenCard"}>
                        <Typography
                          variant="h2"
                          sx={{
                            textAlign: "center",
                            paddingBottom: "5px",
                            pt: "25px",
                            pb: "10px",
                            mt: "5px",
                          }}
                        >
                          {title}
                        </Typography>

                        <>
                          <Divider
                            className="white"
                            sx={{ width: "85%", mx: "auto" }}
                          ></Divider>
                        </>

                        <Typography
                          variant="body1"
                          align="center"
                          sx={{
                            p: "30px",
                            pt: "15px",
                            fontSize: "1.1rem",
                          }}
                        >
                          {desc}
                        </Typography>
                      </Box>
                    </Box>
                  </Fade>
                );
              })}
            </Box>
          </div>
          <Box className={isItDone && "hiddenCard"}>
            <Divider sx={{ width: "100%", mt: "30px", mb: "30px", mx: "auto" }}>
              {" "}
              <Typography variant="h3" margin={"auto"} gutterBottom>
                Eller..
              </Typography>
            </Divider>

            <div className="relative">
              {" "}
              {valueArray.map(({ title, desc, id }, index) => {
                return (
                  <Fade
                    timeout={{ enter: 1200, exit: 1200 }}
                    in={showBottom === index}
                  >
                    <Box
                      key={"bottomCard" + id.toString()}
                      className={showBottom === index ? "show" : "hidden"}
                      onClick={() => clickBottom({ index: index, id: id })}
                      sx={{
                        display: "table",
                        mx: "auto",
                        transform: "scale(1)",
                        margin: "auto",
                        boxShadow: 10,
                        borderColor: "grey.500",
                        width: "95%",
                        height: "200px",
                        maxWidth: "450px",
                        backgroundColor: "white",
                        borderRadius: "6px",
                        userSelect: "none",

                        color: "primary",
                        "&:hover": {
                          transform: "scale(1.02)",
                        },
                      }}
                    >
                      <Typography
                        variant="h2"
                        sx={{
                          textAlign: "center",
                          paddingBottom: "5px",
                          pt: "25px",
                          pb: "10px",
                          mt: "5px",
                        }}
                      >
                        {title}
                      </Typography>

                      <>
                        <Divider
                          className="white"
                          sx={{ width: "85%", mx: "auto" }}
                        ></Divider>
                      </>

                      <Typography
                        variant="body1"
                        align="center"
                        sx={{
                          p: "30px",
                          pt: "15px",
                          fontSize: "1.1rem",
                        }}
                      >
                        {desc}
                      </Typography>
                    </Box>
                  </Fade>
                );
              })}
            </div>
          </Box>
          <Box
            sx={{
              transform: smallScreen ? "scale(0.9)" : null,
              width: "100%",
            }}
          >
            <BackButton data={valueArray} goTo={back} />

            {isItDone && (
              <Button
                variant="contained"
                color="primary"
                aria-label="Gå till resultat"
                endIcon={<ArrowForwardIosIcon />}
                onClick={goToResult}
                sx={{ float: "right", mb: "15px", mt: "45px", mr: "15px" }}
              >
                Se Resultat
              </Button>
            )}

            {!isItDone && (
              <Button
                variant="contained"
                disabled="true"
                color="success"
                aria-label="Gör färdigt övningen för att kunna gå vidare till resultat"
                endIcon={<ArrowForwardIosIcon />}
                sx={{ float: "right", mb: "15px", mt: "45px", mr: "15px" }}
              >
                {totalClicks - cardsSorted} kort kvar
              </Button>
            )}
          </Box>
        </Container>
      </Slide>
      {ShowItsDone && (
        <ItsDoneComponent
          title="Bra jobbat!"
          text="Du är nu klar med värderingskompassen, tryck på knappen SE RESULTAT för att se ditt resultat"
          option2="Okej!"
        />
      )}
    </div>
  );
}

export default CardSorter;
