import React from 'react';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@material-ui/icons/Star';
import PageviewIcon from '@material-ui/icons/Pageview';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Button from '@material-ui/core/Button/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    background: '#f1cd8e',
  },
});

interface Props {
  handleApply?: () => void
}

export const NavBottom = ({handleApply}: Props) => {

  let history = useHistory();
  const classes = useStyles();

  const handleSavedPosts = (): void => {
    history.push('/saved-jobs')
  }

  const handleBackToSearch = (): void => {
    history.push('/job-search')
  }

  return (
    <AppBar color="primary" position="fixed" style={{ top: 'auto', bottom: 0 }}>
      <Toolbar>
        <Grid container justify="space-around" spacing={1} >
          <IconButton style={{ color: '#F69483' }} aria-label="Back to Search" component="button" onClick={handleBackToSearch}>
            <PageviewIcon fontSize='large' />
          </IconButton>
          {handleApply && <Button
              color="secondary"
              aria-label="apply"
              component="button"
              size='large'
              onClick={() => handleApply()}
              variant="contained"
              style={{ width: '50%', maxWidth:350 }}
              classes={{root: classes.root}}
            >Apply
          </Button>}
          <IconButton style={{ color: '#F5CE89' }} aria-label="Saved Posts" component="button" onClick={handleSavedPosts}>
            <StarIcon fontSize='large' />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
