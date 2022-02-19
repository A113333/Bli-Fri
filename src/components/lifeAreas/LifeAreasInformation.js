import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Slide from "@mui/material/Slide";
import ExerciseAppbar from "../ExerciseAppbar";
import Container from "@mui/material/Container";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Paper from "@mui/material/Paper";
import { Divider } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Headline from "../Headline";

function LifeAreasInformation() {
  const [slide, setSlide] = useState(true);

  useEffect(() => {
    setSlide(true);
  }, []);

  const history = useHistory();

  const nextPage = () => {
    history.push({
      pathname: "/valj-livsomraden",
    });
  };

  const prevPage = () => {
    history.goBack();
  };
  const location = useLocation();
  const valueArray = location.state; // tar valueArray från "history.push"
  console.log(valueArray);

  const smallScreen = useMediaQuery("(max-width:445px)");
  console.log(smallScreen);

  return (
    <Slide direction="left" in={slide} mountOnEnter unmountOnExit>
      <div>
        <ExerciseAppbar header={"Dina livsområden"} step={" "} />
        <Container maxWidth="md">
          <Box sx={{ maxWidth: "725px", mx: "auto", mb: 5 }}>
            <Typography variant="h2" sx={{ mt: "15px" }} gutterBottom>
              Vad är ett livsområde?
            </Typography>
            <Divider />
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", lineHeight: 1.7, mt: "25px" }}
              gutterBottom
            >
              Livsområden är olika delar av livet som kan vara mer eller mindre
              viktiga. Livet innehåller massor av olika delar men vi är
              generellt rätt dåliga på att reflektera över vilka av dessa som är
              viktigast för oss. Detta kan stå oss dyrt, då det lätt medför att
              vi prioriterar fel saker. Tid kan vara den mest dyrbara resurs vi
              har, den är begränsad och omöjlig att få mer av eller att få
              tillbaka. Trots detta går vi ofta genom livet utan att fundera
              över om vi använder denna dyrbara och begränsade resurs på rätt
              sätt.
              <br></br>{" "}
            </Typography>

            <Typography variant="body1" sx={{ lineHeight: 1.7 }} gutterBottom>
              I förra övningen påbörjade vi arbetet att ta ut en kompasskurs. Vi
              försökte hitta en riktning för dig att sträva mot när du vandrar
              genom livet. Vi ska nu fortsätta detta arbetet genom att ta en
              ordentlig titt på dina livsområden. Målet är att hjälpa dig att
              bringa klarhet i vilka områden som är viktiga för dig, varför dom
              är viktiga och om det finns något du kan göra för att förbättra
              din nuvarande situation.Detta är ett stort jobb och inget man
              löser enbart genom att göra en övning som denna, men vi tänker att
              det är ett steg åt rätt håll.
              <br></br>
            </Typography>

            <Typography variant="h3" sx={{ mt: 3 }} gutterBottom>
              Vad vill vi uppnå?
            </Typography>
            <Divider></Divider>

            <Typography
              variant="body1"
              sx={{ lineHeight: 1.7, mt: "10px" }}
              gutterBottom
            >
              Förhoppningsvis kommer övningen hjälpa dig att få lite mer koll på
              vilka områden i livet du behöver prioritera, men kanske även vilka
              du just nu lägger lite för mycket tid på. Vi hoppas också att den
              ska motivera dig till att göra en förändring, att tänka efter lite
              extra nästa gång du står inför ett viktigt vägval, och att du då
              välja att gå åt det håll din kompass pekar.
            </Typography>

            <Typography variant="h3" sx={{ mt: 3 }} gutterBottom>
              Övnings upplägg
            </Typography>
            <Divider></Divider>

            <List
              sx={{
                display: "flex",
                flexWrap: "wrap",
                mt: smallScreen ? "25px" : "45px",
                mb: smallScreen ? "50px" : "110px",
                width: smallScreen ? "90%" : "45%",
                float: smallScreen ? null : "left",
              }}
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: "primary.main",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    1
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Välj Livsområden"
                  secondary="Välj ut de 5 livsområden som känns mest relevanta för dig att fördjupa dig i"
                />
              </ListItem>

              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: "primary.main",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    2
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Utvärdera hur det är idag"
                  secondary="Svara på några frågor kring varje områden för att få en bild av din nuvarande situation"
                />
              </ListItem>

              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: "primary.main",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    3
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Vad behövs för att det ska bli bättre?"
                  secondary="Utforska vad du hade behövt för att känna dig nöjd med de olika livsområdena"
                />
              </ListItem>
            </List>
            <Box
              sx={{
                width: smallScreen ? "90%" : "55%",
                float: smallScreen ? null : "left",
                padding: "15px",
                mt: "25px",
                mb: "25px",
              }}
            >
              <Typography
                variant="body1"
                sx={{ lineHeight: 1.7, mt: "10px" }}
                gutterBottom
              >
                Övningen är precis som förra övningen uppbyggd i tre steg. Först
                kommer du att få välja 5 livsområden, välj då områden som är
                viktiga för dig eller som du önskar förändra. Det andra steget
                handlar om att fördjupa din förståelse inför din nuvarande
                situation och försöka prioritera de fem områden du valt. I det
                tredje steget kommer vi att undersöka om dina värderingar ligger
                i linje med dina valda livsområden och granska vad du kan göra
                för att förbättra din nuvarande situation samt påbörja en
                målsättning.
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "inline-block", width: "100%" }}>
            <Button
              variant="contained"
              color="primary"
              aria-label="Tillbaka"
              startIcon={<ArrowBackIosIcon />}
              onClick={prevPage}
              sx={{ ml: "15px", mb: 3, float: "left" }}
            >
              Tillbaka
            </Button>

            <Button
              variant="contained"
              color="primary"
              aria-label="Nästa"
              endIcon={<ArrowForwardIosIcon />}
              onClick={nextPage}
              sx={{ float: "right", mr: "15px", mb: "15px" }}
            >
              Nästa
            </Button>
          </Box>
        </Container>
      </div>
    </Slide>
  );
}

export default LifeAreasInformation;
