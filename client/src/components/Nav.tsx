import React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import Textfield from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import { Button, Dialog, DialogTitle, DialogActions, List, ListItem, Slider, InputAdornment } from '@material-ui/core';
import welcomeAnimationNav from "../loading-spinner.json";
import lottie from 'lottie-web';

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
  const [open, setOpen] = React.useState<boolean>(false);
  const { register, handleSubmit, control } = useForm<FormData>();

  useEffect(() => {
    let nav = lottie.loadAnimation({
      container: document.querySelector("#load-welcome-nav")!,
      animationData: welcomeAnimationNav,
      renderer: "svg",
      loop: false,
      autoplay: true,
    });
  }, []);

  const handleBackToWelcome = (): void => {
    history.push('/')
  }

  /************************
   * Form utility functions
   ************************/

  const onSubmit = (data: any): void => {
    handleCloseForm();
    console.log('Submited: ', data);
    if (data.query || data.locationName || data.distanceFrom || data.minimumSalary) {
      console.log('Submitting: ', data);
      props.addQuery(data);
      history.push('/job-search');
    }
  }

  const handleClickOpenForm = (): void => {
    setOpen(true);
  };

  const handleCloseForm = (): void => {
    setOpen(false);
  };

  function valuetext(value: number): string {
    return `${value}miles`;
  }


  return (
    <Grid container justify="space-evenly" spacing={1}>
      <Grid item xs={2}>
        <div id="load-welcome-nav" style={{ width: '100%', maxWidth: 100, height: 'auto' }} onClick={handleBackToWelcome} />
      </Grid>
      <Grid item xs={10}>
        <Grid container justify="center" alignItems="center" direction="column">

          <Textfield
            onClick={handleClickOpenForm}
            inputRef={register}
            placeholder="Search for a job in the uk..."
            defaultValue=''
            style={{ width: '80%' }}
            color='secondary'
            InputProps={{
              startAdornment: (
                <IconButton style={{ color: '#666D82' }} aria-label="search" component="button" onClick={handleClickOpenForm}>
                  <SearchIcon fontSize='large' />
                </IconButton>
              ),
            }}
          />

          <Dialog
            open={open}
            onClose={handleCloseForm}
            fullWidth={true}
            PaperProps={{
              style: {
                backgroundColor: '#F5CE89',
                boxShadow: 'none',
              },
            }}>
            <List>
              <DialogTitle>Set Filters</DialogTitle>
              <form onSubmit={handleSubmit(onSubmit)}  >
                <ListItem>
                  <Textfield
                    name="query"
                    inputRef={register}
                    placeholder="Search for a job in the uk..."
                    defaultValue=''
                    style={{ width: '80%' }}
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
                    style={{ width: '80%' }}
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
                  <Button onClick={handleCloseForm} color="secondary" variant="contained">
                    Cancel
                 </Button>
                </DialogActions>
              </form>
            </List>
          </Dialog>
        </Grid>
      </Grid>
    </Grid>
  )
}
