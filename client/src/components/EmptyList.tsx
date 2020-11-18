import React, { useEffect } from 'react'
import puzzleAnimation from "../33692-puzzle-animation.json";
import lottie from 'lottie-web';
import { Typography,Grid } from '@material-ui/core';

export const EmptyList = () => {

  useEffect(() => {
    let empty = lottie.loadAnimation({
      container: document.querySelector("#puzzle-animation")!,
      animationData: puzzleAnimation,
      renderer: "svg",
      loop: false,
      autoplay: true,
    });
    return () => {
      empty.destroy();
    }
  }, []);

  return (
    <Grid container justify="center" alignItems='center' style={{height:'70vh'}}>
      <Grid item>
        <div id="puzzle-animation" style={{ width: 200, height: 200 }} />
        <Typography align="center" variant="h6">
          <div>No Jobs Here!</div>
        </Typography>
      </Grid>
    </Grid>
  )
}