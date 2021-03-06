import React from 'react';
import { useHistory } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import Textfield from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import { Button, Dialog, DialogTitle, DialogActions, List, ListItem, Slider, InputAdornment } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar/Avatar';
import logo from "../animations/welcome-spinner-static.svg";
import { FormData } from '../app-types';
import AuthenticationButton from "./AuthenticationBtn";



interface Props {
  addQuery: (data: FormData) => void;
}

export const Nav = ({ addQuery }: Props) => {

  let history = useHistory();
  const [open, setOpen] = React.useState<boolean>(false);
  const { register, handleSubmit, control, errors } = useForm<FormData>({
    defaultValues: {
      query: "",
      locationName: "",
      distanceFrom: 10,
      minimumSalary: 5000
    }
  });

  const handleBackToWelcome = (): void => {
    history.push('/')
  }

  /************************
   * Form utility functions
   ************************/

  const onSubmit = (data: FormData): void => {
    handleCloseForm();
    if (data.query || data.locationName || data.minimumSalary) {
      addQuery(data);
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
    <Grid container justify="center" spacing={1} direction="row" alignItems="center">
      <Grid item xs={2}>
        <Avatar src={logo} onClick={handleBackToWelcome}></Avatar>
      </Grid>
      <Grid item xs={8}>
        <Grid container justify="flex-start" alignItems="center" direction="row">

          <Textfield
            name='mainSearch'
            onClick={handleClickOpenForm}
            inputRef={register}
            placeholder="Search jobs in the UK..."
            defaultValue=''
            style={{ width: '90%' }}
            color='secondary'
            InputProps={{
              startAdornment: (
                <IconButton style={{ color: '#666D82' }} aria-label="search" component="button" onClick={handleClickOpenForm}>
                  <SearchIcon fontSize='large' />
                </IconButton>
              ),
              readOnly: true,
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
                    inputRef={register({ pattern: /^([^0-9]*)$/ })}
                    placeholder="Search for a job in the uk..."
                    style={{ width: '80%' }}
                    color='secondary'
                    variant='outlined'
                  />
                  {errors.query && "Numbers not allowed"}
                </ListItem>
                <ListItem>
                  <Textfield
                    name="locationName"
                    inputRef={register({ pattern: /^([^0-9]*)$/ })}
                    placeholder="Where"
                    style={{ width: '80%' }}
                    color='secondary'
                    variant='outlined'
                  />
                  {errors.locationName && "Numbers not allowed"}
                </ListItem>
                <ListItem>
                  <Controller
                    name="distanceFrom"
                    control={control}
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
                    inputRef={register({ pattern: /^[0-9]*$/ })}
                    placeholder="how far?"
                    color='secondary'
                    InputProps={{
                      startAdornment: <InputAdornment position="start">mi</InputAdornment>,
                    }}
                  />
                  {errors.distanceFrom && "Only numbers allowed"}
                </ListItem>
                <ListItem>
                  <Controller
                    name="minimumSalary"
                    control={control}
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
                    inputRef={register({ pattern: /^[0-9]*$/ })}
                    placeholder="Approximate salary"
                    color='secondary'
                    InputProps={{
                      startAdornment: <InputAdornment position="start">£</InputAdornment>,
                    }}
                  />
                  {errors.minimumSalary && "Only numbers allowed"}
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
      <Grid item xs={2} sm={1}>
        <AuthenticationButton />
      </Grid>
    </Grid>
  )
}
