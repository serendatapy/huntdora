import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@material-ui/icons/Star';
import PageviewIcon from '@material-ui/icons/Pageview';
import Grid from '@material-ui/core/Grid';


export const NavBottom: React.FC = () => {

  let history = useHistory();
  let location = useLocation();

  const handleSavedPosts = (): void => {
    history.push('/saved-jobs')
  }

  const handleBackToSearch = (): void => {
    history.push('/job-search')
  }

  return (
    <Grid container justify="space-evenly" spacing={1}>
      {/* <div>Now showing post {location.pathname}</div> */}
      <IconButton color="primary" aria-label="Back to Search" component="button" onClick={handleBackToSearch}>
        <PageviewIcon />
      </IconButton>
      <IconButton color="primary" aria-label="Saved Posts" component="button" onClick={handleSavedPosts}>
        <StarIcon />
      </IconButton>
    </Grid>
  )
}
