import React from "react";
import Navbar from "./Navbar";
import Cards from "./Cards";
import Grid from "@mui/material/Grid";
import sleepImg from "./img/sleep.svg";
import { Container, Stack, Typography } from "@mui/material";

function SeSkattningar() {
  return (
    <div>
      <Navbar />
      <Container>
        {" "}
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
            Skattningar
          </Typography>
        </Stack>
        <Grid item xs={12} sm={4} md={4}>
          <Cards
            img={sleepImg}
            rubrik={"Sömndagbok"}
            text={"Fyll i din sömndagbok"}
            linkTo={"/somndagbok"}
            isActive={true}
            backgroundcolor={"white"}
            stateColor={"primary"}
          />
        </Grid>
      </Container>
    </div>
  );
}

export default SeSkattningar;
