import React, { useEffect } from 'react'
import welcomeAnimation from "../loading-spinner.json";
import lottie from 'lottie-web';
import Grid from '@material-ui/core/Grid';
import { Fade, Typography } from '@material-ui/core';

export const Welcome = () => {

  useEffect(() => {
    let welcome = lottie.loadAnimation({
      container: document.querySelector("#load-welcome")!,
      animationData: welcomeAnimation,
      renderer: "svg", // "canvas", "html"
      loop: true, // boolean
      autoplay: true,
    });
    return () => {
      welcome.destroy();
    }

  }, []);

  return (
    <Grid container justify="center" alignItems="center" direction="column" style={{ height: '70vh' }}>
      <Grid item>
        <div id="load-welcome" style={{ width: '100%', height: 'auto', maxWidth: 600 }} />
      </Grid>
      <Grid item>
        <Fade in={true} timeout={2000}>
          <Typography align="center" variant="h1" component="div">
            <div style={{ fontFamily: 'Curly, serif' }}>Huntdora</div>
          </Typography>
        </Fade>
      </Grid>
    </Grid>
  )
}