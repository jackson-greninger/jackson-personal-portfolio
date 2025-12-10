import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { HelmetMeta } from "./HelmetMeta";
import { ThemeProvider } from "../components/theme/ThemeProvider";
import { CssBaseline } from "@material-ui/core";
import { logCredits } from "../utils/logCredits";
import { Home } from "../pages/Home";
import { Projects } from "../pages/Projects";
import { Resume } from "../pages/Resume";
import { About } from "../pages/About";
import { Automata } from "../pages/Automata";

export const App = () => {
    logCredits();

    return (
        <ThemeProvider>
            <CssBaseline />
            <Router>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/resume" component={Resume} />
                    <Route path="/projects" component={Projects} />
                    <Route path="/about" component={About} />
                    <Route path="/automata" component={Automata} />
                </Switch>
            </Router>
        </ThemeProvider>
    );
};
