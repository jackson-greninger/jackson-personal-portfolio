import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PageButton from './pagebutton';

const useStyles = makeStyles((theme) => ({
  panel: {
    position: 'absolute',
    top: '50%',              // start halfway down screen
    right: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column', // vertical stack
    alignItems: 'center',
    transform: 'translateY(-50%)', // center first button
  },
  buttonSpacing: {
    marginBottom: theme.spacing(2), // spacing between buttons
  },
}));

const PageButtonsPanel = () => {
  const classes = useStyles();

  return (
    <div className={classes.panel}>
      <div className={classes.buttonSpacing}>
        <PageButton
          onClick={() => window.location.href = '/resume'}
          tooltip="View Resume"
          icon="fas fa-file-alt"
        />
      </div>
      <div className={classes.buttonSpacing}>
        <PageButton
          onClick={() => window.location.href = '/projects'}
          tooltip="View Projects"
          icon="fas fa-folder"
        />
      </div>
      <div className={classes.buttonSpacing}>
        <PageButton
          onClick={() => window.location.href = '/about'}
          tooltip="About Me"
          icon="fas fa-user"
        />
      </div>
      <div className={classes.buttonSpacing}>
        <PageButton
          onClick={() => window.location.href = '/'}
          tooltip="Home Page"
          icon="fas fa-home"
        />
      </div>
    </div>
  );
};

export default PageButtonsPanel;
