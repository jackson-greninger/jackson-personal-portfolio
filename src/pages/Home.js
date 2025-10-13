import React from 'react';
import { Content } from '../components/content/Content';
import { Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DisplacementSphere from '../components/background/DisplacementSphere';
import { FooterText } from '../components/footer/FooterText';
import { SocialIcons } from '../components/content/SocialIcons';
import { SpeedDials } from '../components/speedDial/SpeedDial';
import PageButtonsPanel from '../components/pagebutton/pagebuttonpanel.js';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',      // center horizontally
    justifyContent: 'center',  // center vertically
    textAlign: 'center',       // center text inside children
  },
}));

export const Home = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <DisplacementSphere
          primaryColor="255 200 255"
          backgroundColor="100 100 100"
          rotationSpeed={0.005}
          sphereAmplitude={0.0001}
        />

        <Content />
  
        {/* page buttons */}
        <PageButtonsPanel />
        <Hidden smDown>
          <SocialIcons />
        </Hidden>
        <Hidden mdUp>
          <SpeedDials />
        </Hidden>
        <FooterText />
      </div>
    </>
  );
};
