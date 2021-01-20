import React, { useEffect } from 'react'
import loadingSpinner from "../assets/loading-spinner.json";
import lottie from 'lottie-web';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

export const Loading = () => {
  let location = useLocation();

  useEffect(() => {
    let loading = lottie.loadAnimation({
      container: document.querySelector("#loading-spinner")!,
      animationData: loadingSpinner,
      renderer: "svg",
      loop: true,
      autoplay: true,
    });
    return () => {
      loading.destroy();
    }
  }, []);

  function loadingMessage() {
    if(location.pathname === '/job-search' || location.pathname === '/job-search'){
      return <div>Getting Jobs...</div>
    } else {
      return <div>Loading...</div>
    }
  }

  return (
    <Grid container justify="center" alignItems='center' style={{height:'70vh'}}>
      <Grid item>
        <div id="loading-spinner" style={{ paddingLeft: '15px', width: '100%', height: 'auto', maxWidth: 500 }} />
        <Typography align="center" variant="h6">
          {loadingMessage()}
        </Typography>
      </Grid>
    </Grid>
  )
}
