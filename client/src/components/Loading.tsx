import React, { useEffect } from 'react'
import loadingSpinner from "../loading-spinner.json";
import lottie from 'lottie-web';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

export const Loading = () => {

  useEffect(() => {
    let loading = lottie.loadAnimation({
      container: document.querySelector("#loading-spinner")!,
      animationData: loadingSpinner,
      renderer: "svg", // "canvas", "html"
      loop: true, // boolean
      autoplay: true,
    });
    return () => {
      loading.destroy();
    }
  }, []);

  return (
    <Grid container justify="center" alignItems='center' style={{height:'70vh'}}>
      <Grid item>
        <div id="loading-spinner" style={{ width:'100%', height: 'auto', maxWidth:600  }} />
        <Typography align="center" variant="h6">
          <div>Getting Jobs...</div>
        </Typography>
      </Grid>
    </Grid>
  )
}
