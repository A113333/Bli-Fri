import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import Slide from "@mui/material/Slide";
import Container from "@mui/material/Container";

function CardSorter({ valueArray: arryOfValues }) {
  //  console.log("arryOfValues ");
  //  console.log(arryOfValues);
  const history = useHistory();
  const [valueArray, setvalueArray] = useState(arryOfValues);

  const [showTop, setShowTop] = useState(0);
  const [showBottom, setShowBottom] = useState(1);
  const [startValue, setstartValue] = useState(2);

  const [slide, setSlide] = useState(false);
  const [cardsSorted, setcardsSorted] = useState(0);
  const [totalClicks, settotalClicks] = useState(0);
  const [whatIf, setwhatIf] = useState("");

  useEffect(() => {
    setSlide(true);
    countTotalClicks();
  }, []); // Only re-run the effect if count changes
  // useEffect körs på varje render, här hämtas data från JSON server

  const handleChange = () => {
    setSlide((prev) => !prev);
  };

  const countTotalClicks = () => {
    let clicks = 0;
    arryOfValues.map((item, index) => {
      console.log(index);

      clicks = clicks + index;
    });
    console.log("clicks :" + clicks);
    settotalClicks(clicks);
  };

  const scroll = () => {
    window.scrollTo({ top: 0 });
    console.log("scroll körs");
  };
  // scroll();

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
    console.log("startValue" + startValue);
    console.log("valueArr lenght" + valueArray.length);

    setcardsSorted(cardsSorted + 1);
    settotalClicks(totalClicks - 1);
    if (startValue === valueArray.length) {
      // om övningen är klar
      console.log("done");
      console.log(valueArray);
      history.push({
        pathname: "/valueResults",
        state: valueArray,
      });
    }
    //lägger till pts
    valueArray.map((item, index) => {
      id === item.id ? (item.pts = item.pts + 1) : console.log("item");
    });
    // om vi är på sista kortet

    if (showBottom + 1 === valueArray.length) {
      console.log("-----------xxxxxxxxxx--------");
      console.log(arryOfValues);
      setstartValue(startValue + 1);
      setShowTop(showTop + 1);
      setShowBottom(startValue);
    } else {
      setShowBottom(showBottom + 1);
    }
    console.log("--------------------------");
    console.log(showBottom);
    console.log(valueArray.length);
  };

  const clickBottom = ({ index, id }) => {
    settotalClicks(totalClicks - 1);
    setcardsSorted(cardsSorted + 1);

    //om övningen är klart
    if (startValue === valueArray.length) {
      console.log("done");

      history.push({
        pathname: "/valueResults",
        state: valueArray,
      });
    }

    console.log("index");
    console.log(index);

    index + 1 === valueArray.length ? restartArr() : setShowBottom(index + 1);
    valueArray.map((item, index) => {
      id === item.id ? (item.pts = item.pts + 1) : console.log("hehe");
    });
    console.log(valueArray);
  };

  const goBack = () => {
    // för att rätt antal klick ska vara kvar
    settotalClicks(totalClicks + 1);
    setcardsSorted(cardsSorted - 1);

    console.log("arryOfValues ");
    console.log(arryOfValues);

    // om i början av övningen q
    if (showTop === 0) {
      return;
    }
    // om vi är på sista kortet
    if (startValue === valueArray.length) {
      console.log("sista kortet");
      // return;
    }

    // om vi är på första kortet i top, dvs om vi måste ändra showTop
    if (startValue === showTop) {
      setstartValue(startValue - 1);
      setShowTop(showTop - 1);

      setShowBottom(valueArray.length - 1);

      setstartValue(startValue + 1);
      setShowTop(showTop + 1);

      setShowBottom(startValue);
      console.log("-------------");
      console.log(startValue);
      console.log(valueArray.length);
    } else {
      setShowBottom(showBottom - 1);
    }

    //ta bort points
  };

  return (
    <Slide direction="left" in={slide}>
      <div>
        <Container>
          <Typography variant="h2"> Sortera din lista </Typography>
          <Typography variant="body1">
            {" "}
            Om du enbart kunde leva efter en av de två värderingarna, vilken
            hade du valt?
          </Typography>

          {valueArray.map(({ title, desc, id }, index) => {
            return (
              <Box
                className={index === showTop ? "show" : "hidden"}
                onClick={() => clickTop({ index: index, id: id })}
                component="span"
                sx={{
                  display: "table",
                  mx: "auto",
                  transform: "scale(1)",
                  margin: "auto",
                  mt: "25px",
                  boxShadow: 2,
                  borderColor: "grey.500",
                  height: "120px",
                  width: "75%",
                  maxWidth: "500px",
                  mb: "15px",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{ textAlign: "center", paddingBottom: "5px" }}
                >
                  {title}
                </Typography>
                <Divider></Divider>
                <Typography variant="body1" sx={{ padding: "5px" }}>
                  {desc}
                </Typography>
              </Box>
            );
          })}

          <Divider>
            {" "}
            <Typography variant="h3" margin={"auto"} gutterBottom>
              Eller..
            </Typography>
          </Divider>

          {valueArray.map(({ title, desc, id }, index) => {
            return (
              <div className={whatIf}>
                <Box
                  className={showBottom === index ? "show" : "hidden"}
                  onClick={() => clickBottom({ index: index, id: id })}
                  component="span"
                  sx={{
                    display: "table",
                    mx: "auto",
                    transform: "scale(1)",
                    margin: "auto",
                    mt: "15px",
                    boxShadow: 2,
                    borderColor: "grey.500",
                    height: "120px",
                    width: "75%",
                    maxWidth: "500px",
                    backgroundColor: "white",
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{ textAlign: "center", paddingBottom: "5px" }}
                  >
                    {title}
                  </Typography>
                  <Divider></Divider>
                  <Typography variant="body1" sx={{ paddingTop: "5px" }}>
                    {desc}
                  </Typography>
                </Box>
              </div>
            );
          })}

          <Paper
            className="zindex"
            sx={{
              mx: "auto",
              margin: "auto",
              marginTop: "20px",
              mb: "25px",
              boxShadow: 3,
              border: "1px solid",
              borderColor: "grey.500",
              height: "120px",
              width: "75%",
              maxWidth: "500px",
              position: "relative",
              top: "-134px",
              left: "5px",
              borderRadius: "6px",
            }}
          ></Paper>

          <Paper
            className="zindex"
            sx={{
              mx: "auto",
              margin: "auto",
              marginTop: "20px",
              mb: "25px",
              boxShadow: 3,
              border: "1px solid",
              borderColor: "grey.500",
              height: "120px",
              width: "75%",
              maxWidth: "500px",
              position: "relative",
              top: "-282px",
              left: "3px",
              borderRadius: "6px",
            }}
          ></Paper>
        </Container>
        <Button variant="outlined" onClick={() => goBack()}>
          Backa
        </Button>

        <Button
          fullWidth={true}
          variant="contained"
          sx={{
            position: "fixed",
            bottom: "0",
            paddingLeft: "0",
            paddingRight: "0",
            maxWidth: "852px",
          }}
        >
          <Typography variant="body1" sx={{ color: "white" }}>
            {totalClicks} Kvar att sortera
          </Typography>
        </Button>
      </div>
    </Slide>
  );
}

export default CardSorter;
