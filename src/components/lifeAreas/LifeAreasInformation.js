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
          <Headline text="Vad är ett livsområde?" />
          <Box sx={{ maxWidth: "725px", mx: "auto" }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", lineHeight: 1.7, mt: "25px" }}
              gutterBottom
            >
              Värderingar kan beskrivas som vår inre kompass, är vi i kontakt
              med våra värderingar hjälper dom oss att hitta rätt. De står för
              hur vi vill vara och hur vi vill agera i världen. Värderingar
              handlar inte om vad du vill uppnå, ha eller prestera, utan
              representerar kvaliteter som du – medvetet eller omedvetet – har
              önskar att du har och agerar ifrån. Vad vill du att ditt liv ska
              handla om? Hur vill du vara mot dig själv och andra människor?
              Vilken typ av människa vill du vara?
              <br></br>{" "}
            </Typography>

            <Paper
              elevation={0}
              sx={{
                display: "flex",
                flexWrap: "wrap",
                m: "25px",
                mt: "40px",
                mx: "auto",
                padding: "35px",
                pt: "15px",
                pb: "15px",
                width: smallScreen ? "90%" : "45%",
                float: smallScreen ? null : "right",
                bgcolor: "primary.main",
                color: "white",
              }}
            >
              <Typography textAlign="center" sx={{ fontWeight: "bold" }}>
                Livsområden
              </Typography>
              <Divider
                sx={{
                  bgcolor: "white",
                  width: "100%",
                  mx: "auto",
                  mt: "5px",
                }}
              >
                {" "}
              </Divider>
              <Typography variant="body1">
                <ul>
                  <li>Minska nedstämdhet </li>
                  <li> Skapa mening och motivation</li>
                  <li> Ta dig igenom svåra situationer </li>
                  <li>Underlättar svåra val </li>
                </ul>
              </Typography>
            </Paper>

            <Typography
              variant="body1"
              sx={{ lineHeight: 1.7, width: smallScreen ? "100%" : "50%" }}
              gutterBottom
            >
              Om vi går tillbaka till jämförelsen med en kompass så kan du
              aldrig komma fram till “norr”, men du kan ständigt vandra norrut.
              Värderingar ger dig alltså en riktning att sträva mot.
              <br></br>
            </Typography>
            <Typography
              variant="body1"
              sx={{ lineHeight: 1.7, width: smallScreen ? "100%" : "50%" }}
              gutterBottom
            >
              Till skillnad från ett mål går det aldrig att uppnå eller bli klar
              med en värdering. Du kan till exempel ha som mål att ta en examen
              eller bilda familj - det är saker som går att uppnå. Men de
              värderingar som tar dig dit, till exempel att vara uthållig,
              bildad, kärleksfull och omtänksam finns kvar även när målen är
              uppnådda..
            </Typography>

            <Typography variant="h3" sx={{ mt: "15px" }} gutterBottom>
              Tips när du jobbar med värderingar
            </Typography>
            <Divider></Divider>

            <Typography
              variant="body1"
              sx={{ lineHeight: 1.7, mt: "10px" }}
              gutterBottom
            >
              Tänka på att dina värderingar ska vara dina egna. Värderingar
              tappar sitt värde om dom är baserad på hur du tror att andra vill
              att du ska vara. Det finns inte rätt och fel, bra eller dåliga
              värderingar. Dina värderingar ska vara dina egna, för att dom ska
              kunna fungera vägvisande i livet och för att dem ska bli
              meningsfulla för dig är det viktigt att dom kommer från dig. Du
              behöver aldrig kunna förklara varför en värdering är viktig för
              dig; precis som att du aldrig behöver ha ett argument för varför
              blått är din favoritfärg, det är ditt tycke och din smak.
            </Typography>

            <List
              sx={{
                display: "flex",
                flexWrap: "wrap",
                mt: smallScreen ? "50px" : "110px",
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
                  primary="Välj värderingar"
                  secondary="Välj ut de 10 värderingsord som känns viktigast 
      för dig ur vår värderingslista."
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
                  primary="Välj de fem viktigaste"
                  secondary=" Prioritera din list för att komma närmare din viktigast värderingar"
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
                  primary="Ta ställning"
                  secondary="Ställ ord mot ord för att rangordna din lista."
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
              <Typography variant="h3" sx={{}} gutterBottom>
                Hur fungerar Värdekompassen?
              </Typography>
              <Divider></Divider>
              <Typography
                variant="body1"
                sx={{ lineHeight: 1.7, mt: "10px" }}
                gutterBottom
              >
                Värdekompassen är uppbyggd i tre steg. I det första steget
                kommer du välja ut tio värderingsord ur vår värderingslista. I
                det andra steget ska du välja fem värdingar av dom tio valda för
                att hitta dom som är absolut viktigast för dig. I det tredje
                steget kommer du jämnföra dina fem värderingsord mot varandra
                och ta ställning till vilket som är viktigast för dig. När du
                har gjort detta kommer du få se ditt resultat och få möjlighet
                att läsa mer om dina valda värderingar. När du läser
                värderingslistan kommer du kanske att märka att olika
                värderingar kan ha olika vikt i olika delar av livet; vissa
                värderingar är viktiga på arbetet, andra i relationer och
                återigen andra på fritiden. Detta är något vi jobbar vidare med
                i nästa etapp.
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            color="primary"
            aria-label="Tillbaka"
            startIcon={<ArrowBackIosIcon />}
            onClick={prevPage}
            sx={{ ml: "15px", mb: "15px" }}
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
        </Container>
      </div>
    </Slide>
  );
}

export default LifeAreasInformation;
