import React from "react";
import { Typography, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TextDecrypt } from "./TextDecrypt";
import Resume from "../../settings/resume.json";
import { FirstName } from "../../utils/getName";

const useStyles = makeStyles((theme) => ({
    main: {
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft: 100,
        marginRight: "auto",
        color: '#ffffffff',
        textAlign: "left",
        alignSelf: "flex-start",
        "@media (max-width: 768px)": {
            marginLeft: theme.spacing(4),
        },
    },
}));

export const Content = () => {
  const classes = useStyles();

  return (
    <Container component="main" className={classes.main} maxWidth="sm">
      <Typography variant="h2" component="h1" align="left" gutterBottom>
        {/* Multiple TextDecrypts for per-color control */}
        <span style={{ color: "#ffffffff" }}>
          <TextDecrypt text="hi! " />
        </span>
        <span style={{ color: "#80f2ffff" }}>
          <TextDecrypt text={`i'm ${FirstName}`} />
        </span>
      </Typography>

      <Typography variant="h5" component="h2" align="left" gutterBottom>
        <span style={{ color: "#FFB300"}}>
          <TextDecrypt text="a comp sci engineering and engineering management" />
        </span>
        <span style={{ color: "#ffffffff" }}>
          <TextDecrypt text="student at bucknell university." />
        </span>
      </Typography>
    </Container>
  );
};