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

export const App = () => {
    logCredits();

    return (
        <ThemeProvider>
            <CssBaseline />
            <Router basename={process.env.PUBLIC_URL}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/resume" component={Resume} />
                    <Route path="/projects" component={Projects} />
                    <Route path="/about" component={About} />
                </Switch>
            </Router>
        </ThemeProvider>
    );
};
