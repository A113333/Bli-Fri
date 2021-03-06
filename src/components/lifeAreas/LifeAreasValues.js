import ExerciseAppbar from "../ExerciseAppbar.js";
import Headline from "../Headline";
import BackButton from "../BackButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import Container from "@mui/material/Container";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import StepperExercise from "../StepperExcercise";
import { useLocation } from "react-router-dom";
import ProgressTracker from "../utility/ProgressTracker";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import lifeAreas from "./lifeAreas.js";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Helmet } from "react-helmet";
import { Fade, Modal } from "@mui/material";
import lifeAreasArray from "./lifeAreas.js";
import HelpIcon from "@mui/icons-material/Help";
import stepsArrays from "../utility/stepperArrays";

function LifeAreasValues() {
  const [isItDone, setIsItDone] = React.useState(false);
  const [showLifeArea, setShowLifeArea] = React.useState(0);
  const [whyNotZero, setWhyNotZero] = React.useState();
  const [whyNotTen, setWhyNotTen] = React.useState();
  const [goals, setGoals] = useState();
  const [resultsArray, setResultsArray] = React.useState([]);
  const [whynotZeroError, setwhyNotZeroError] = useState(false);
  const [whynotTenError, setwhyNotTenError] = useState(false);
  const [goalsError, setgoalsError] = useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const steps = stepsArrays.lifeAreas;

  const ModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",

    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    if (showLifeArea === prioLifeAreas.length) {
      setIsItDone(true);
    }
  }, [showLifeArea]);

  useEffect(() => {
    setwhyNotZeroError(false);
  }, [whyNotZero]);

  useEffect(() => {
    setwhyNotTenError(false);
  }, [whyNotTen]);

  useEffect(() => {
    setgoalsError(false);
  }, [goals]);

  const resetCard = () => {
    setWhyNotZero();
    setWhyNotTen();
    setGoals();
    setCheckedState(new Array(top10ValuesLocal.length).fill(false));
  };

  const location = useLocation();
  const localPrioLifeAreas = localStorage.getItem("prioLifeAreas");
  const prioLifeAreas = location.state
    ? location.state
    : JSON.parse(localPrioLifeAreas);
  // location.state;

  prioLifeAreas.forEach((item, index) => {
    lifeAreasArray.forEach((value) => {
      if (value.title === item.title) item.goals = value.goals;
    });
  });

  console.log(prioLifeAreas);

  const results = prioLifeAreas.sort((a, b) => {
    return b.diff - a.diff;
  });

  useEffect(() => {
    if (showLifeArea === results.length) {
      setIsItDone(true);
    }
  }, [showLifeArea, results]);

  const smallScreen = useMediaQuery("(max-width:700px)");

  let saveAs = "resultsLifeArea";

  const handleSubmit = ({ title }) => {
    window.scrollTo(200, 0);
    if (
      whyNotTen === undefined &&
      whyNotZero === undefined &&
      goals === undefined
    ) {
      setgoalsError(true);
      setwhyNotTenError(true);
      setwhyNotZeroError(true);
      return;
    }
    if (whyNotZero === undefined) {
      console.log("noToday");
      setwhyNotZeroError(true);
      return;
    }
    if (whyNotTen === undefined) {
      console.log("noImportente");
      setwhyNotTenError(true);
      return;
    }

    if (goals === undefined) {
      console.log("noImportente");
      setgoalsError(true);
      return;
    }

    /* Sparar dom valda v??rderingarna till prioLifeAreas objectet */
    let userValueArray = [];
    checkedState.forEach((item, index) => {
      if (item) {
        userValueArray.push(top10ValuesLocal[index]);
      }
    });
    let today;
    let howImportent;
    let diff;
    let obstacle;
    /* F??r att skapa ett objekt med reusltatet fr??n f??rra ??vningnen och denna */
    results.forEach((item, index) => {
      if (item.title === title) {
        console.log(item);
        today = item.today;
        howImportent = item.howImportent;
        diff = item.diff;
        obstacle = item.obstacle;
      }
    });

    let prioLifeAreas = {
      title: title,
      values: userValueArray,
      whyNotZero: whyNotZero,
      whyNotTen: whyNotTen,
      today: today,
      howImportent: howImportent,
      diff: diff,
      obstacle: obstacle,
      goal: goals,
    };

    setResultsArray((prevValues) => [...prevValues, prioLifeAreas]);
    resetCard();
    setShowLifeArea(showLifeArea + 1);
    if (showLifeArea !== lifeAreas.length) {
      window.scrollTo({ top: 250, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 50, behavior: "smooth" });
    }
    console.log(prioLifeAreas);
  };

  const history = useHistory();
  const nextPage = () => {
    localStorage.setItem(saveAs, JSON.stringify(resultsArray));

    history.push({
      pathname: "/livsomraden-resultat",
      state: resultsArray,
    });
  };

  const top10ValuesLocal = JSON.parse(localStorage.getItem("userValues10"));
  const [checkedState, setCheckedState] = useState(
    new Array(top10ValuesLocal.length).fill(false)
  );

  const handleChange = ({ id, title }) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === id ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  const goBackOneCard = () => {
    console.log("backar");
  };

  const titleRef = useRef();
  const topRef = useRef();

  const getGoals = (title) => {
    let lifearea = lifeAreasArray.filter((item) => {
      return item.title === title;
    });
    // console.log(lifearea[0].goals);
    return lifearea[0].goals.map((item, index) => {
      return (
        <Typography>
          {" "}
          <li> {item} </li>
        </Typography>
      );
    });
  };

  const showGoals = (title) => {
    let goals = getGoals(title);
    setOpenModal(true);
    console.log(goals);
  };

  return (
    <div>
      <Helmet>
        <title> Livsomr??den | V??rderingar </title>
      </Helmet>
      <ExerciseAppbar header={"Dina Livsomr??den"} />
      <ProgressTracker
        nrsToPick={prioLifeAreas.length}
        nrsPicked={showLifeArea}
        isItDone={isItDone}
      />
      <Container>
        <StepperExercise activeStep={2} steps={steps} />

        {isItDone && <Headline text="Bra jobbat" />}
        {!isItDone && (
          <Headline text="Vad kr??vs f??r att jag ska bli n??jd med i mina livsomr??den?" />
        )}

        <Box sx={{ maxWidth: "725px", mx: "auto", pb: 10 }}>
          {isItDone && <Typography>Du ??r f??rdig! Duktig du ??r!</Typography>}
          {showLifeArea === 0 && (
            <Typography>
              I detta sista steg kommer vi titta lite n??rmre p?? vad som kr??vs
              f??r att du ska uppleva mer n??djhet inom dina valda livsomr??den. Du
              har valet att l??gga till v??rderingar f??r att hj??lpa dig hitta hur
              du vill vara som m??nniska inom livsomr??det. Du kommer ??ven svara
              p?? tv?? fr??gor som hj??lper dig att fundera ??nnu mer kring vad som
              ??r viktigt inom de olika livsomr??derna och slutligen f??r du skriva
              upp ett m??l. Syftet med denna ??vning ??r dels att klarg??ra f??r dig
              hur du kan f??rb??ttra omr??det, men ??ven att motiver dig att p??b??rja
              en f??r??ndring.
            </Typography>
          )}
        </Box>
        <Box>
          {results.map(({ title, howImportent, today, diff }, index) => {
            // console.log(title);
            return (
              <Fade
                timeout={{ enter: 1200, exit: 1200 }}
                in={index === showLifeArea}
              >
                <Box
                  key={index}
                  className={index === showLifeArea ? "show" : "hidden"}
                  boxShadow={10}
                  sx={{
                    display: "table",
                    border: "1px solid lightgrey",
                    margin: "15px",
                    borderRadius: "6px",
                    mx: "auto",
                    mb: "50px",
                    maxWidth: "900px",

                    "&:hover": {
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  <Box
                    boxShadow={1}
                    sx={{
                      color: "white",
                      padding: "15px",
                      pt: "20px",
                      pb: "20px",
                      borderRadius: "6px 6px 0px 0px",
                      position: "relative",
                    }}
                  >
                    <Box className="inverted-border-radius-left"> </Box>
                    <Box className="inverted-border-radius-right"> </Box>

                    <Typography variant="h2" textAlign={"center"} sx={{}}>
                      {title}
                    </Typography>
                  </Box>
                  <form onSubmit={handleSubmit}>
                    {/*------------ Kolla om n??gra v??rderingar ??r extra viktigta ----------*/}
                    <Box
                      sx={{
                        bgcolor: "primary.extraLight",
                        padding: "25px",
                        pt: "30px",
                      }}
                    >
                      <Typography
                        variant="h4"
                        textAlign={"center"}
                        sx={{ mb: "15px" }}
                      >
                        ??r det n??gon/n??gra av dina viktigaste v??rderingar som
                        beskriver hur du vill vara inom detta omr??de?
                      </Typography>

                      <Box
                        ref={titleRef}
                        sx={{
                          width: "90%",
                          mx: "auto",
                          ml: smallScreen ? 0 : 16,
                        }}
                      >
                        {top10ValuesLocal.map(({ title, desc }, index) => {
                          return (
                            <FormControlLabel
                              sx={{ width: smallScreen ? "100%" : "30%" }}
                              key={index}
                              control={
                                <Checkbox
                                  id={`custom-checkbox-${index}`}
                                  title={title}
                                  checked={checkedState[index]}
                                  onChange={() =>
                                    handleChange({ id: index, title: title })
                                  }
                                />
                              }
                              label={title}
                            />
                          );
                        })}
                      </Box>
                    </Box>
                    {/*-------------------------- Varf??r inte en 0? ---------------------------- */}
                    <Box
                      sx={{
                        bgcolor: "white",
                        padding: 3,
                      }}
                    >
                      <Typography
                        variant="h4"
                        textAlign={"center"}
                        sx={{ mb: "15px" }}
                      >
                        {today === 0
                          ? " Varf??r ??r du ??r helt och h??llet MISSN??JD med " +
                            title.toLowerCase() +
                            "?"
                          : "Vad skulle g??ra dig helt och h??llet MISSN??JD med " +
                            title.toLowerCase() +
                            "?"}
                      </Typography>

                      {whynotZeroError && (
                        <Typography
                          variant="body1"
                          textAlign={"center"}
                          sx={{ mb: "10px", color: "error.main" }}
                        >
                          {today === 10
                            ? "Skriv kort varf??r du ??r helt och h??llet missn??jd innan du kan g?? vidare."
                            : "Skriv kort om vad som skulle g??ra dig helt och h??llet missn??jd innan du kan g?? vidare."}
                        </Typography>
                      )}
                      <TextField
                        fullWidth
                        id="obstacle"
                        label="Skriv in ditt svar h??r"
                        variant="outlined"
                        sx={{ backgroundColor: "white" }}
                        onChange={(e) => setWhyNotZero(e.target.value)}
                      />
                    </Box>
                    {/*-------------------------- Varf??r inte en 10? ---------------------------- */}
                    <Box
                      sx={{
                        bgcolor: "primary.extraLight",
                        padding: 3,
                      }}
                    >
                      <Typography
                        variant="h4"
                        textAlign={"center"}
                        sx={{ mb: "15px" }}
                      >
                        {today === 10
                          ? "Vad g??r att du ??r helt och h??llet N??JD med " +
                            title.toLowerCase() +
                            "?"
                          : "Vad skulle beh??vas f??r att du skulle k??nna dig helt och h??llet N??JD med " +
                            title.toLowerCase() +
                            "?"}
                      </Typography>
                      {whynotTenError && (
                        <Typography
                          variant="body1"
                          textAlign={"center"}
                          sx={{ mb: "10px", color: "error.main" }}
                        >
                          {today === 10
                            ? "Skriv kort varf??r du ??r helt och h??llet n??jd innan du kan g?? vidare."
                            : "Skriv kort om vad som skulle g??ra dig helt och h??llet n??jd innan du kan g?? vidare."}
                        </Typography>
                      )}
                      <TextField
                        fullWidth
                        id="obstacle"
                        label="Skriv in ditt svar h??r"
                        variant="outlined"
                        sx={{ backgroundColor: "white" }}
                        onChange={(e) => setWhyNotTen(e.target.value)}
                      />{" "}
                    </Box>

                    <Box
                      sx={{
                        bgcolor: "white",
                        padding: 3,
                        pb: 8,
                      }}
                    >
                      <HelpIcon
                        color="primary"
                        fontSize="medium"
                        onClick={() => showGoals(title)}
                        sx={{ float: "right", position: "relative" }}
                      />
                      <Typography
                        variant="h4"
                        textAlign={"center"}
                        sx={{ mb: "15px" }}
                      >
                        Skriv ner ett m??l f??r livsomr??det {title}
                      </Typography>
                      {goalsError && (
                        <Typography
                          variant="body1"
                          textAlign={"center"}
                          sx={{ mb: "10px", color: "error.main" }}
                        >
                          Skriv ner minst ett m??l f??r livsomr??det {title} innan
                          du kan g?? vidare
                        </Typography>
                      )}

                      <TextField
                        fullWidth
                        id="m??l"
                        label="Jag ska..."
                        variant="outlined"
                        sx={{ backgroundColor: "white" }}
                        onChange={(e) => setGoals(e.target.value)}
                      />

                      <Button
                        variant="contained"
                        aria-label="Backa"
                        startIcon={<ArrowBackIosIcon />}
                        onClick={() => goBackOneCard()}
                        sx={{
                          position: "absolute",
                          padding: "10px",
                          borderRadius: " 0  6px 0 6px",
                          left: "0px",
                          bottom: "0px",
                        }}
                      >
                        {smallScreen ? "Backa" : "F??rra livsomr??det"}
                      </Button>

                      <Button
                        variant="contained"
                        aria-label="Backa"
                        endIcon={<ArrowForwardIosIcon />}
                        onClick={() => handleSubmit({ title: title })}
                        sx={{
                          position: "absolute",
                          padding: "10px",
                          borderRadius: "6px 0  6px 0",
                          right: "0px",
                          bottom: "0px",
                        }}
                      >
                        {smallScreen ? "N??sta" : "N??sta livsomr??de"}
                      </Button>

                      <Modal
                        open={openModal}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={ModalStyle}>
                          <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                          >
                            Sv??rt att komma p?? m??l?
                          </Typography>
                          <Typography
                            id="modal-modal-description"
                            sx={{ mt: 2, fontWeight: "bold" }}
                          >
                            N??gra f??rslag p?? m??l inom livsomr??det {title} kan
                            vara:
                            {getGoals(title)}
                          </Typography>
                        </Box>
                      </Modal>
                    </Box>
                  </form>
                </Box>
              </Fade>
            );
          })}
        </Box>
        <BackButton goTo={"/livsomraden-prioriteringar"}>Tillbaka</BackButton>
        <Button
          variant="contained"
          disabled={!isItDone}
          color="success"
          aria-label="N??sta"
          endIcon={<ArrowForwardIosIcon />}
          onClick={nextPage}
          sx={{ float: "right", mb: "15px", mt: "45px", mr: "15px" }}
        >
          N??sta
        </Button>
        <Box sx={{ width: "100%", height: "15px", clear: "both" }}> </Box>
      </Container>
    </div>
  );
}

export default LifeAreasValues;
