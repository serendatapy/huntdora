import React, { useEffect, useState } from 'react';
import './App.css';
import { getData, getFavorites, updateFavorites } from './apiService';
import { Job } from './app-types';
import { Nav } from './components/Nav';
import { JobPosts } from './components/JobPosts';
import { JobDetails } from './components/JobDetails';
import { Loading } from './components/Loading';
import { Welcome } from './components/Welcome';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Container, CssBaseline, AppBar, Toolbar } from '@material-ui/core/';
import { ThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from './auth/ProtectedRoute';

/*Example of custom styles that can be applied to a component (a custom button for example)
Follow docs for specific properties to use
 const useStyles = makeStyles({
   root: {
     background: 'linear-gradient(45deg, #333,#999)',
     border: 0,
     borderRadius: 15,
     color: 'white',
     padding: '0 30px'
   }
 })*/

//global themes can be set here
let theme = createMuiTheme({
  /*text styling */
  typography: {
    allVariants: {
      color: '#1F2F47',
    }
  },
  /*General Primary and Secondary colours */
  palette: {
    primary: {
      light: '#f5f3ed',
      main: '#f3f0e9',
      dark: '#aaa8a3',
      contrastText: '#9fdcda',
    },
    secondary: {
      light: '#9fdcda',
      main: '#87d4d1',
      dark: '#5e9492',
      contrastText: '#1f2f47',
    },
  },
  /*Style of text boxes */
  overrides: {
    MuiFilledInput: {
      input: {
        padding: '5px',
      },
    },
    MuiInputBase: {
      input: {
        padding: '5px',
      },
    },
  },
})
theme = responsiveFontSizes(theme);

const SESSION_STORAGE_KEY = 'huntdora.savedJobs';

function App() {

  /***
   * AUTH 0
   */
  const { isLoading, getAccessTokenSilently } = useAuth0();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [jobsList, setJobsList] = useState<Job[] | []>([]);
  const [jobDetails, setjobDetails] = useState<Job>(Job.parse({}));
  const [savedJobs, setSavedJobs] = useState<Job[] | []>([]);
  const [loading, setloading] = useState<boolean>(false)

  useEffect(() => {
    console.log('executing useEffect:', searchQuery);
    if (searchQuery !== '') {
      const fetchJobs = async () => {
        console.log('Sending query', searchQuery)
        const results: any = await getData(null, searchQuery);
        results.forEach((job: Job) => {
          if (jobExists(job.jobId, savedJobs)) job.saved = !job.saved
        })
        setJobsList(results);
        setloading(false);
      }
      fetchJobs();
    }

  }, [searchQuery]);// eslint-disable-line react-hooks/exhaustive-deps

  /**
   *LOAD JOBS on startup IF USER AUTHENTICATED!
   */
  const { user } = useAuth0();

  useEffect(() => {

    if (user) {
      console.log('User LOGGED IN:', user);
      let { email } = user;
      const fetchFavorites = async () => {
        const token = await getAccessTokenSilently();
        console.log('Sending email', email)
        const results: any = await getFavorites(email,token);
        console.log('Saving Favorite State:', results)
        setSavedJobs(results);
      }
      fetchFavorites();
    }
  }, [user])

  /**
   * If user hasn't logged out and there are jobs saved, get them from
   * session storage.
   */
  useEffect(() => {
    console.log('Fetching from SESSION STORAGE')
    const searchedJobsJSON = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (searchedJobsJSON != null) setJobsList(JSON.parse(searchedJobsJSON));
  }, [])

  /**
   *UPDATE JOBS on save
   * Note: At the moment if the connection fails, the actions on the
   * user still take place, and there is no feedback of disconnection
   * or data being out of sync. The best thing would be to sync
   * a session storage, rather than through the interface, so that
   * when an update occurs, as soon as connection is back
   * things will sync
   */
  useEffect(() => {
    if (user) {
      console.log('User LOGGED IN:', user);
      let { email } = user;

      const changeFavorites = async () => {
        console.log('Updating DB', email, savedJobs)
        const token = await getAccessTokenSilently();
        const results: any = await updateFavorites(email, savedJobs, token);
        console.log('Response:', results);
      }
      changeFavorites();
    }
  }, [savedJobs]);

  useEffect(() => {
    console.log('UPDATING SESSION STORAGE')
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(jobsList))
  }, [jobsList])

  /**
 *
 * functions to query api
 */

  function addQuery(data: { query: string, locationName: string, distanceFrom: number | '', minimumSalary: number | '' }) {
    let { query, locationName, distanceFrom, minimumSalary } = data;
    const locationQuery = locationName ? `&locationName=${locationName}` : `&locationName=london`;
    const distanceQuery = distanceFrom ? `&distanceFromLocation=${distanceFrom}` : `&distanceFromLocation=10`;
    const salaryQuery = minimumSalary ? `&minimumSalary=${minimumSalary}` : '';
    setloading(true);
    setSearchQuery(query + locationQuery + distanceQuery + salaryQuery);
  }

  async function getJob(jobId: number) {
    console.log('Checking if is saved...')
    const jobCached = jobExists(jobId, savedJobs);
    if (jobCached) {
      setjobDetails(jobCached)
      console.log('Fetched Existing', jobCached)
    }
    else {
      setloading(true);
      console.log('Fetching new job details');
      const newJob: Job = await getData(jobId, null)
      setjobDetails(newJob)
      setloading(false);
    }
  }

  /*job saved from memory rather than refetched*/


  /*************************************
   *
   * Function Utilities for handling
   * saved job data and state
   *************************************/

  function saveJobFromDetails(job: Job) {
    if (!jobExists(job.jobId, savedJobs)) setSavedJobs(savedJobs => [...savedJobs, job]);
    updateJobInList(job.jobId);
  }

  async function saveJob(job: Job) {
    const jobToUpdate: Job | undefined = jobExists(job.jobId, savedJobs);
    if (!jobToUpdate) {
      const newJob: Job = await getData(job.jobId, null);
      newJob.saved = true;
      setSavedJobs(savedJobs => [...savedJobs, newJob]);
      updateJobInList(job.jobId);
    }
  }

  function removeJob(job: Job) {
    setSavedJobs(savedJobs => savedJobs.filter(sJob => sJob.jobId !== job.jobId));
    updateJobInList(job.jobId);
  }

  /*This is done to make sure that a savedList job is in sync with the same job in jobList */
  function updateJobInList(jobId: number) {
    console.log('Changing Job: ', jobId);
    const jobToUpdate: Job | undefined = jobExists(jobId, jobsList);
    console.log('Updating Job: ', jobToUpdate?.saved);
    if (jobToUpdate !== undefined) {
      jobToUpdate.saved = !jobToUpdate.saved;
      console.log('Updated Job, saving new: ', jobToUpdate.saved);
      setJobsList((jobsList) => [...jobsList]);
    }
  }

  function jobExists(jobId: number, list: any[]): Job | undefined {
    return list.find(listJob => listJob.jobId === jobId);
  }



  /***
   * AUTH 0
   * Get better loading animation
   * Straighten Existing one!
   */
  if (isLoading) return (<Loading />)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/*MATERIAL UI CSS RESET*/}
      <Container maxWidth="md" className="App">

        <AppBar color="primary">
          <Toolbar >
            <Nav addQuery={addQuery} />
          </Toolbar>
        </AppBar>
        <Switch>
          <Route path='/' exact render={() => (<Welcome />)} />
          <Route path='/job-search' exact render={() => loading ? (<Loading />) : (<JobPosts jobs={jobsList} getJob={getJob} saveJob={saveJob} removeJob={removeJob} />)} />
          <Route path='/job-details' exact render={() => loading ? (<Loading />) : (<JobDetails job={jobDetails} saveJobFromDetails={saveJobFromDetails} removeJob={removeJob} />)} />
          <Route path='/saved-jobs' exact render={() => (<JobPosts jobs={savedJobs} getJob={getJob} saveJob={saveJob} removeJob={removeJob} />)} />
        </Switch>
        {/*
          // @ts-ignore*/}
        {/* <AppBar color="primary" position="fixed" style={{ top: 'auto', bottom: 0 }}>
            <Toolbar>
              <NavBottom />
            </Toolbar>
          </AppBar> */}

      </Container>
    </ThemeProvider>
  );
}

export default App;



/*Note about typescript
Before passing props to components
Interface/class needs to be created (not sure about difference to typescript)
to indicate the component expects that. At the same time, when passing the prop,
also the prop needs to be marked of that type.
*/
