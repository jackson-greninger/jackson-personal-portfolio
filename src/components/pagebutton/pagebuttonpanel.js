import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PageButton from './pagebutton';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  panel: {
    position: 'fixed',
    top: '50%',
    right: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transform: 'translateY(-50%)',
  },
  buttonSpacing: {
    marginBottom: theme.spacing(2),
  },
}));

const PageButtonsPanel = () => {
  const classes = useStyles();
  const history = useHistory(); // hook to navigate programmatically

  return (
    <div className={classes.panel}>
      <div className={classes.buttonSpacing}>
        <PageButton
          onClick={() => history.push('/')}
          tooltip="Home Page"
          icon="fas fa-home"
        />
      </div>
      <div className={classes.buttonSpacing}>
        <PageButton
          onClick={() => history.push('/resume')}
          tooltip="View Resume"
          icon="fas fa-file-alt"
        />
      </div>
      <div className={classes.buttonSpacing}>
        <PageButton
          onClick={() => history.push('/projects')}
          tooltip="View Projects"
          icon="fas fa-folder"
        />
      </div>
      <div className={classes.buttonSpacing}>
        <PageButton
          onClick={() => history.push('/about')}
          tooltip="About Me"
          icon="fas fa-user"
        />
      </div>
    </div>
  );
};

export default PageButtonsPanel;
