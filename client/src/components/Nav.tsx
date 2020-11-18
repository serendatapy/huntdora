import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import Textfield from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import welcomeAnimationNav from "../loading-spinner.json";
import lottie from 'lottie-web';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, Slider, InputAdornment } from '@material-ui/core';

type FormData = {
  query: string;
  locationName: string;
  distanceFrom: number | '';
  minimumSalary: number | '';
}

interface Props {
  addQuery: (data:
    {
      query: string;
      locationName: string;
      distanceFrom: number | "";
      minimumSalary: number | "";
    }) => void;
}

export const Nav: React.FC<Props> = (props) => {

  let history = useHistory();
  let location = useLocation();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    let nav = lottie.loadAnimation({
      container: document.querySelector("#load-welcome-nav")!,
      animationData: welcomeAnimationNav,
      renderer: "svg", // "canvas", "html"
      loop: false, // boolean
      autoplay: true,
    });
  }, []);

  const { register, handleSubmit, control } = useForm<FormData>();

  const onSubmit = (data: any) => {
    handleClose();
    console.log('Submited: ', data);
    if (data.query || data.locationName || data.distanceFrom || data.minimumSalary) {
      console.log('Submitting: ', data);
      props.addQuery(data);
      history.push('/job-search');
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function valuetext(value: number) {
    return `${value}miles`;
  }

  // const handleSavedPosts = (): void => {
  //   history.push('/saved-jobs')
  // }

  // const handleBackToSearch = (): void => {
  //   history.push('/job-search')
  // }

  return (
    <Grid container justify="space-evenly" spacing={1}>
      <Grid item xs={2}>
        <div id="load-welcome-nav" style={{ width: '100%', maxWidth: 100, height: 'auto' }} />
      </Grid>
      {/* <div>Now showing post {location.pathname}</div> */}
      <Grid item xs={10}>
        <Grid container justify="center" alignItems="center" direction="column">

          <Textfield
            onClick={handleClickOpen}
            inputRef={register}
            placeholder="Search for a job in the uk..."
            defaultValue=''
            style={{ width: '80%' }}
            color='secondary'
            InputProps={{
              startAdornment: (
                <IconButton style={{ color: '#666D82' }} aria-label="search" component="button" onClick={handleClickOpen}>
                  <SearchIcon fontSize='large' />
                </IconButton>
              ),
            }}
          />

          <Dialog
            open={open}
            onClose={handleClose}
            fullWidth={true}
            PaperProps={{
              style: {
                backgroundColor: '#F5CE89',
                boxShadow: 'none',
              },
            }}>
            <List>
              <DialogTitle>Fill the form</DialogTitle>
              {/* style={{ width: '100%', display: "flex", justifyItems: "center", alignItems: "center" }} */}
              <form onSubmit={handleSubmit(onSubmit)}  >
                <ListItem>
                  <Textfield
                    name="query"
                    inputRef={register}
                    placeholder="Search for a job in the uk..."
                    defaultValue=''
                    style={{ width: '80%'}}
                    color='secondary'
                    variant='outlined'
                  />
                </ListItem>
                <ListItem>
                  <Textfield
                    name="locationName"
                    inputRef={register}
                    placeholder="Where"
                    defaultValue=''
                    style={{ width: '80%'}}
                    color='secondary'
                    variant='outlined'
                  />
                </ListItem>
                <ListItem>
                  <Controller
                    name="distanceFrom"
                    control={control}
                    defaultValue={10}
                    marks
                    color='primary'
                    render={(props) => (
                      <Slider
                        {...props}
                        onChange={(_, value) => {
                          props.onChange(value);
                        }}
                        getAriaValueText={valuetext}
                        valueLabelDisplay="auto"
                        min={10}
                        max={100}
                        step={10}
                      />
                    )}
                  />
                  <Textfield
                    name="distanceFrom"
                    inputRef={register}
                    placeholder="how far?"
                    defaultValue=''
                    color='secondary'
                    InputProps={{
                      startAdornment: <InputAdornment position="start">mi</InputAdornment>,
                    }}
                  />
                </ListItem>
                <ListItem>

                  <Controller
                    name="minimumSalary"
                    control={control}
                    defaultValue={5000}
                    marks
                    color='primary'
                    render={(props) => (
                      <Slider
                        {...props}
                        onChange={(_, value) => {
                          props.onChange(value);
                        }}
                        getAriaValueText={valuetext}
                        valueLabelDisplay="auto"
                        min={10}
                        max={200000}
                        step={50}
                      />
                    )}
                  />
                  <Textfield
                    name="minimumSalary"
                    inputRef={register}
                    placeholder="Approximate salary"
                    defaultValue=''
                    color='secondary'
                    InputProps={{
                      startAdornment: <InputAdornment position="start">£</InputAdornment>,
                    }}
                  />

                </ListItem>
                {/* <Button variant="contained" color="primary" type="submit">Search</Button> */}
                <DialogActions>
                  <Button
                    color="secondary"
                    aria-label="search"
                    component="button"
                    type="submit"
                    variant="contained"
                    startIcon={<SearchIcon />}
                  >Search
                  </Button>
                  <Button onClick={handleClose} color="secondary" variant="contained">
                    Cancel
                 </Button>
                </DialogActions>

              </form>
            </List>

          </Dialog>
        </Grid>

      </Grid>
      {/* <IconButton color="primary" aria-label="Back to Search" component="button" onClick={handleBackToSearch}>
        <PageviewIcon />
      </IconButton>
      <IconButton color="primary" aria-label="Saved Posts" component="button" onClick={handleSavedPosts}>
        <StarIcon />
      </IconButton> */}
    </Grid>
  )
}
