import React from "react";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from "../components/theme/ThemeProvider";
import { CssBaseline } from "@material-ui/core";
import { logCredits } from "../utils/logCredits";
import { Home } from "../pages/Home";
import { Projects } from "../pages/Projects";
import { Resume } from "../pages/Resume";
import { About } from "../pages/About";
import { Automata } from "../pages/Automata";
import { HelmetMeta } from "./HelmetMeta";

export const App = () => {
  logCredits();

  return (
    <ThemeProvider>
      <CssBaseline />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/resume" component={Resume} />
        <Route path="/projects" component={Projects} />
        <Route path="/about" component={About} />
        <Route path="/automata" component={Automata} />
      </Switch>
    </ThemeProvider>
  );
};
