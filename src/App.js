import React from "react";
import Pick10Values from "./components/Pick10Values";
import Pick5Values from "./components/Pick5Values";
import "./app.css";
import Home from "./components/Home";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import ValueDetalis from "./components/ValueDetails";
import CreateValue from "./components/CreateValue";
import NotFound from "./components/NotFound";
import ValueSorter from "./components/ValueSorter";
import ValueResults from "./components/ValueResults";
import ValueInformation from "./components/ValueInformation";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "material-icons/iconfont/material-icons.css";
import CssBaseline from "@mui/material/CssBaseline";
import { blue, green, blueGrey } from "@mui/material/colors";
import ScrollToTop from "./components/ScrollToTop";
import PHQ9 from "./components/Skattningar/PHQ9";
import LifeAreasInformation from "./components/LifeAreasInformation";
import LifeAreasPriority from "./components/LifeAreasPriority";
import LifeareasPicker from "./components/LifeareasPicker";

/* hur många ord i listan?
mer mellanrum mellan korten
presentera ångra först när man kan ångra
container resultat
*/

// json-server --watch db.json --port8000

const theme = createTheme({
  palette: {
    primary: {
      main: "#455a64",
      extraLight: "#ebeeefad",
    },
    secondary: {
      main: "#7A7978",
    },
    valueCompass: {
      main: "#EEEFEC",
      contrastText: "#fff",
    },
    lifeAreas: {
      main: "#EEEFEC",
      contrastText: "#fff",
    },
    liveByValues: {
      main: "#EEEFEC",
      contrastText: "#fff",
    },
  },

  typography: {
    fontFamily: "Montserrat",
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 800,
    h1: {
      fontSize: "2rem",
      fontWeight: "bolder",
    },
    h2: {
      fontSize: "1.6rem",
      fontWeight: "bold",
    },
    h3: {
      fontSize: "1,3rem",
      fontWeight: "bold",
    },
    h4: {
      fontSize: "1rem",
      fontWeight: "bold",
    },

    button: {
      fontWeight: "800",
    },
  },
});

function App() {
  document.title = "Bli Fri";
  return (
    <React.Fragment>
      <CssBaseline />
      <Router basename={process.env.PUBLIC_URL}>
        <ScrollToTop />
        <div className="appWrapper">
          <div className="app">
            <ThemeProvider theme={theme}>
              {/* Switch = endast en kommer visas, route ger en path; i den path
           visa det i som finns i route elementet, om inte exact path så matchar /creat /*/}
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>

                <Route exact path="/varderingar-information">
                  <ValueInformation />
                </Route>

                <Route exact path="/valj10varder">
                  <Pick10Values />
                </Route>

                <Route exact path="/valj5">
                  <Pick5Values />
                </Route>

                <Route exact path="/varderingsPrioritering">
                  <ValueSorter />
                </Route>

                <Route exact path="/varderingarResultat">
                  <ValueResults />
                </Route>

                <Route exact path="/livsomraden-information">
                  <LifeAreasInformation />
                </Route>

                <Route exact path="/valj-livsomraden">
                  <LifeareasPicker />
                </Route>

                <Route exact path="/livsomraden-prioriteringar">
                  <LifeAreasPriority />
                </Route>

                <Route path="/createValue">
                  <CreateValue />
                </Route>
                {/*  /:id för att dynamiskt kunna visa resultat uifrån route parmeter /*/}
                <Route path="/values/:id">
                  <ValueDetalis />
                </Route>

                <Route path="/phq9">
                  <PHQ9 />
                </Route>

                {/*  * fångar alla routes, måste vara i botten 404*/}
                <Route path="*">
                  <NotFound />
                </Route>
              </Switch>
            </ThemeProvider>
          </div>
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
