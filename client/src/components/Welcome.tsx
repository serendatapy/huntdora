import React, { useEffect } from 'react'
import { Fade, Typography, Grid } from '@material-ui/core';
import welcomeAnimation from "../animations/welcome-spinner.json";
import lottie from 'lottie-web';
import { NavBottom } from './NavBottom';

export const Welcome = () => {

  useEffect(() => {
    let welcome = lottie.loadAnimation({
      container: document.querySelector("#load-welcome")!,
      animationData: welcomeAnimation,
      renderer: "svg",
      loop: true,
      autoplay: true,
    });
    return () => {
      welcome.destroy();
    }
  }, []);

  return (
    <>
      <Grid container justify="center" alignItems="center" direction="column" style={{ height: '70vh' }}>
        <Grid item>
          <div id="load-welcome" style={{ paddingLeft: '15px', width: '100%', height: 'auto', maxWidth: 500 }} />
        </Grid>
        <Grid item>
          <Fade in={true} timeout={2000}>
            <Typography align="center" variant="h1" component="div">
              <div>Huntdora</div>
            </Typography>
          </Fade>
        </Grid>
      </Grid>
      <NavBottom />
    </>
  )
}