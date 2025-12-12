import React from "react";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from "../components/theme/ThemeProvider";
import { CssBaseline } from "@material-ui/core";
import { logCredits } from "../utils/logCredits";
import { Home } from "../pages/Home.js";
import { Projects } from "../pages/Projects";
import { Resume } from "../pages/Resume";
import { About } from "../pages/About";
import { Automata } from "../pages/Automata";
import { HelmetMeta } from "./HelmetMeta";

export const App = () => {

  return (
    <ThemeProvider>
      <CssBaseline />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/projects" exact component={Projects} />
        <Route path="/about" exact component={About} />
        <Route path="/resume" exact component={Resume} />
        <Route path="/Automata" exact component={Automata} />
      </Switch>
    </ThemeProvider>
  );
};