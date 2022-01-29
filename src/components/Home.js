import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Navbar from "./Navbar";
import useFetch from "../useFetch";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ExploreIcon from "@mui/icons-material/Explore";
import MapIcon from "@mui/icons-material/Map";
import BookIcon from "@mui/icons-material/Book";
import { Button, Divider, Stack } from "@mui/material";
import Footer from "./Footer";
import { ReactComponent as ValueImg } from "./img/undraw_job_hunt_re_q203.svg";
import valueImg from "./img/undraw_job_hunt_re_q203.svg";
import lifeAreaImg from "./img/undraw_process_re_gws7.svg";
import liveByValues from "./img/undraw_happy_news_re_tsbd.svg";
import commingSoonImg from "./img/undraw_under_construction_-46-pa.svg";
import bliFriLogo from "./img/bliFriIcon.png";

import { ReactComponent as RoadSignSvg } from "./img/undraw_road_sign_re_3kc3.svg";
import { ReactComponent as RoadSignSvgHalfway } from "./img/undraw_road_sign_halfWay.svg";
import { ReactComponent as RoadSignSvgDone } from "./img/undraw_road_sign_Done.svg";

// Grid är 12 columer
/*
xs, extra-small: 0px
sm, small: 600px
md, medium: 900px
lg, large: 1200px
xl, extra-large: 1536px
*/

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const clearStorage = () => {
  console.log("körs");
  localStorage.clear();
};

export default function Home() {
  const { data: user } = useFetch("http://localhost:8000/user");

  let localStorage;
  try {
    localStorage = window.localStorage;
  } catch (e) {
    // Access denied :-(
  }

  //  { ...user.values && user.values  }

  const top5ValuesLocal = JSON.parse(localStorage.getItem("top5Values"));
  const lifeAreasDone = JSON.parse(localStorage.getItem("lifeAreasDone"));
  const lastDone = JSON.parse(localStorage.getItem("lastDone"));

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let headerImg = RoadSignSvg;

  console.log(localStorage);
  let top5ValuesText;
  if (top5ValuesLocal) {
    top5ValuesText = top5ValuesLocal.map(({ title }, index) => {
      return <Box key={index}>{title}</Box>;
    });
  } else {
    top5ValuesText = (
      <Typography variant="h2"> Vi hjälper dig hitta vägen </Typography>
    );
  }

  return (
    <div>
      {/*  ---------   Header med bild och text   ---------  */}
      <Box sx={{ textAlign: "center", mt: "90px" }}>
        {!top5ValuesLocal && (
          <RoadSignSvg
            title="Livets korsning"
            width={"100%"}
            height={"77vh"}
            fill="#7A7978"
          />
        )}
        {top5ValuesLocal && (
          <RoadSignSvgHalfway
            title="Livets korsning"
            width={"100%"}
            height={"77vh"}
            fill="#7A7978"
          />
        )}
        <Box
          sx={{
            position: "absolute",
            top: "150px",
            right: 0,

            margin: "45px",
            textAlign: "left",
          }}
        >
          {top5ValuesLocal && (
            <Typography
              variant="body1"
              fontSize={{
                md: "1.5rem",
                xs: "1rem",
              }}
              textAlign={"left"}
              sx={{ fontWeight: "bold" }}
            >
              Du är
            </Typography>
          )}

          <Typography
            variant="body1"
            fontSize={{
              md: "1.4rem",
              xs: "0.9rem",
            }}
          >
            {top5ValuesText}
          </Typography>
        </Box>
      </Box>
      <Divider />
      {/*  ---------   Nav/tab - bar  med iconer och loga   ---------  */}

      <Box
        sx={{
          backgroundColor: "white",
          boxShadow: 3,
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1000,
          width: "100%",
        }}
      >
        <img src={bliFriLogo} alt="Logo" className="navBarLogo" />

        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Navigerings tabbar"
          centered
          textColor="primary"
          sx={{ textAlign: "center" }}
        >
          <Tab
            sx={{
              fontSize: {
                md: "1rem",
                xs: "0.7rem",
              },
              padding: 0,
              margin: 0,
            }}
            icon={<ExploreIcon />}
            label="Värderingar"
            {...a11yProps(0)}
          />
          <Tab
            sx={{
              fontSize: {
                md: "1rem",
                xs: "0.7rem",
              },
              padding: 0,
              margin: 0,
            }}
            icon={<MapIcon />}
            label="Mål"
            {...a11yProps(1)}
          />
          <Tab
            sx={{
              fontSize: {
                md: "1rem",
                xs: "0.7rem",
              },
              padding: 0,
              mr: "80px",
            }}
            icon={<BookIcon />}
            label="Loggbok"
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>

      {/*  ------------------   Innehållet i de olika Tabsen   ------------------  */}
      <Container>
        <TabPanel value={value} index={0} sx={{ bgColor: "primary.light" }}>
          <Grid item xs={12} spacing={0} sx={{ pb: "15px", mt: "50px" }}>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Typography
                variant="h1"
                align="center"
                sx={{}}
                fontSize={{
                  md: "2rem",
                  xs: "1.2rem",
                }}
              >
                VÄRDERINGAR
              </Typography>
            </Stack>
            <Typography
              variant="subtitle1"
              align="center"
              sx={{ color: "primary.main", opacity: "50%" }}
              fontSize={{
                md: "1rem",
                xs: "0.75rem",
              }}
            >
              Första etappen - Hitta din kurs.
            </Typography>
          </Grid>

          <Grid
            container
            justifyContent="center"
            spacing={{ xs: 3, md: 5 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={12} sm={4} md={4}>
              <Cards
                img={valueImg}
                rubrik={
                  top5ValuesLocal
                    ? "Dina viktigaste värderingar"
                    : "Hur vill du vara?"
                }
                text={
                  top5ValuesLocal
                    ? top5ValuesText
                    : "En djupdykning i dina värderingar. Utforska hur du vill vara som människa och vad som är viktigt för dig."
                }
                linkTo={"/varderingar-information"}
                isActive={true}
                backgroundcolor={"white"}
                nr={1}
                stateColor={top5ValuesLocal ? "success.dark" : "primary"}
                isDone={top5ValuesLocal ? true : false}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <Cards
                img={lifeAreaImg}
                rubrik={"Vad är viktigt för dig?"}
                text={
                  "Fortsätt fördjupa dig i dina värderingar, nu utifrån livsområden. Lägger du din tid och energi på rätt saker?"
                }
                isActive={top5ValuesLocal ? true : false}
                backgroundcolor={"white"}
                stateColor={lifeAreasDone ? "success.dark" : "primary.main"}
                nr={2}
                linkTo={"/livsomraden-information"}
                modalTitle={
                  "Gör övningen: Hur vill du vara innan starta denna övning"
                }
              />
            </Grid>{" "}
            <Grid item xs={12} sm={4} md={4}>
              <Cards
                text={
                  "Här presenteras några verktyg för att hjälpa dig att bli bättre på att leva och agera efter med dina värderingar."
                }
                rubrik={"Lev som du önskar"}
                img={liveByValues}
                backgroundcolor={"white"}
                nr={3}
                stateColor={lastDone ? "success.dark" : "primary.main"}
                modalTitle={
                  "Gör övningen: Vad är viktigt för dig innan du starta denna övning "
                }
              />
            </Grid>
          </Grid>
          <Button variant="contained" sx={{ mt: 10 }} onClick={clearStorage}>
            Börja om etappen
          </Button>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid
            container
            justifyContent="center"
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={12}>
              <Typography
                variant="h1"
                align="center"
                fontSize={{
                  md: "2rem",
                  xs: "1.5rem",
                }}
              >
                Målkartan
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4} md={4}>
              <Cards
                text={"Vi jobbar hårt för att få detta färdigt"}
                rubrik={"Inte färdigt"}
                img={commingSoonImg}
              />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            justifyContent="center"
          >
            <Grid item xs={12}>
              <Typography
                variant="h1"
                align="center"
                fontSize={{
                  md: "2rem",
                  xs: "1.5rem",
                }}
              >
                Din Loggbok
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <Cards
                text={"Kommer snart"}
                rubrik={"Vi har inte kommit så här långt ännu!"}
                linkTo={"/values1"}
                img={commingSoonImg}
              />
            </Grid>
          </Grid>
        </TabPanel>
      </Container>
      <div className="shapedividers_com-2737"></div>

      <Footer />
    </div>
  );
}
