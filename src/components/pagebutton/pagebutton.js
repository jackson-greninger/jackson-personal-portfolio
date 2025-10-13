import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '2.5rem',
    width: '2.5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    backgroundColor: 'transparent',
    color: '#fff', // normal text color
    transition: 'background-color 0.3s, transform 0.2s',
    '&:hover': {
      backgroundColor: 'rgba(0, 234, 255, 0.76)',
      transform: 'scale(1.1)',
    },
  },
  icon: {
    fontSize: '1.25rem',
  },
}));

const PageButton = ({ onClick, icon, tooltip }) => {
  const classes = useStyles();
  return (
    <Tooltip title={tooltip || ''} placement="left">
      <IconButton className={classes.root} onClick={onClick}>
        <i className={`${classes.icon} ${icon || 'fas fa-file-alt'}`}></i>
      </IconButton>
    </Tooltip>
  );
};

export default PageButton;
