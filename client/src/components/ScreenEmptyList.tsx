import React, { useEffect } from 'react'
import jobsNotFound from "../assets/jobs-not-found.json";
import lottie from 'lottie-web';
import { Typography, Grid } from '@material-ui/core';
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from 'react-router-dom';

export const EmptyList = () => {
  const { user } = useAuth0();
  let location = useLocation();

  useEffect(() => {
    let empty = lottie.loadAnimation({
      container: document.querySelector("#puzzle-animation")!,
      animationData: jobsNotFound,
      renderer: "svg",
      loop: false,
      autoplay: true,
    });
    return () => {
      empty.destroy();
    }
  }, []);

  function emptyMessage() {
    if(location.pathname === '/job-search'){
      return <div>No Results. <br/>Search for Jobs!</div>
    } else if(location.pathname === '/saved-jobs') {
      return user? <div>No Jobs Saved!</div> :
      <div>Please log in <br/>to save jobs across devices</div>
    }
  }

  return (
    <Grid container justify="center" alignItems='center' style={{ height: '70vh' }}>
      <Grid item>
        <div id="puzzle-animation" style={{ width: 200, height: 200 }} />
        <Typography align="center" variant="h6">
          {emptyMessage()}
        </Typography>
      </Grid>
    </Grid>
  )
}