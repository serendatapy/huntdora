import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Textfield from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
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
  let location = useLocation();

  useEffect(() => {
    let nav = lottie.loadAnimation({
      container: document.querySelector("#load-welcome-nav")!,
      animationData: welcomeAnimationNav,
      renderer: "svg", // "canvas", "html"
      loop: false, // boolean
      autoplay: true,
    });
  }, []);

  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: any) => {
    console.log('Submited: ', data);
    if (data.query || data.locationName || data.distanceFrom || data.minimumSalary) {
      console.log('Submitting: ', data);
      props.addQuery(data);
      history.push('/job-search');
    }
  }

  // const handleSavedPosts = (): void => {
  //   history.push('/saved-jobs')
  // }

  // const handleBackToSearch = (): void => {
  //   history.push('/job-search')
  // }

  // const displayBtn = (): JSX.Element => {
  //   if (location.pathname === '/saved-jobs') return (
  //     <IconButton color="primary" aria-label="Back to Search" component="button" onClick={handleBackToSearch}>
  //       <FindInPageRoundedIcon />
  //     </IconButton>)
  //   else if (location.pathname === '/job-details') return (<>
  //     <IconButton color="primary" aria-label="Back to Search" component="button" onClick={handleBackToSearch}>
  //       <FindInPageRoundedIcon />
  //     </IconButton>
  //     <IconButton color="primary" aria-label="Saved Posts" component="button" onClick={handleSavedPosts}>
  //       <SaveIcon />
  //     </IconButton>
  //   </>)
  //   else return (
  //     <IconButton color="primary" aria-label="Saved Posts" component="button" onClick={handleSavedPosts}>
  //       <SaveIcon />
  //     </IconButton>)
  // }


  return (
    <Grid container justify="space-evenly" spacing={1}>
      <Grid item xs={2}>
        <div id="load-welcome-nav" style={{width:'100%',maxWidth:100, height:'auto'}} />
      </Grid>
      {/* <div>Now showing post {location.pathname}</div> */}
      <Grid item xs={10}  >
        <form onSubmit={handleSubmit(onSubmit)} style={{ height:'100%',width: '100%', display:"flex", justifyItems:"center", alignItems:"center" }} >
          <Textfield
            name="query"
            inputRef={register}
            placeholder="Search for a job in the uk..."
            defaultValue=''
            style={{width:'80%'}}
          />

          {/* <Textfield
          name="locationName"
          inputRef={register}
          placeholder="Where"
          defaultValue=''
        />
        <Textfield
          name="distanceFrom"
          inputRef={register}
          placeholder="how far?"
          defaultValue=''
        />
        <Textfield
          name="minimumSalary"
          inputRef={register}
          placeholder="Approximate salary"
          defaultValue=''
        /> */}
          {/* <Button variant="contained" color="primary" type="submit">Search</Button> */}
          <IconButton style={{ color: '#666D82' }} aria-label="search" component="button" type="submit">
            <SearchIcon />
          </IconButton>
        </form>

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
