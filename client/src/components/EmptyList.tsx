import React, { useEffect } from 'react'
import puzzleAnimation from "../33692-puzzle-animation.json";
import lottie from 'lottie-web';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

export const EmptyList = () => {

  useEffect(() => {
    let empty = lottie.loadAnimation({
      container: document.querySelector("#puzzle-animation")!,
      animationData: puzzleAnimation,
      renderer: "svg", // "canvas", "html"
      loop: false, // boolean
      autoplay: true,
    });
    return () => {
      empty.destroy();
    }
  }, []);

  return (
    <Grid container justify="center">
      <Grid item>
        <div id="puzzle-animation" style={{ width: 200, height: 200 }} />
        <Typography align="center" variant="h6">
          <div>The list is empty</div>
        </Typography>
      </Grid>
    </Grid>
  )
}