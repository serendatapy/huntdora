import React, { useEffect, useState } from 'react';
import './App.css';
import { getData, getFavorites, updateFavorites, getDataOne } from './apiServiceReed';
import { Job, User, FormData } from './typeInterfaces';
import { NavTop } from './components/NavTop';
import { JobPosts } from './components/JobPosts';
import { JobDetails } from './components/JobDetails';
import { ScreenLoading } from './components/ScreenLoading';
import { ScreenWelcome } from './components/ScreenWelcome';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Container, CssBaseline, AppBar, Toolbar } from '@material-ui/core/';
import { ThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { useAuth0 } from "@auth0/auth0-react";

//Global themes can be set here
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

/**
   * Custom hook that stores state as a variable and in the session in case of refresh
   * for semi-persistent storage, to be placed in it's own file
*/
function useSessionState<ItemType>(storageKey: string, initialState: ItemType): [ItemType, React.Dispatch<React.SetStateAction<ItemType>>] {

  const jsonValue = sessionStorage.getItem(storageKey);
  const startState = jsonValue !== null? JSON.parse(jsonValue) as ItemType : initialState

  const [value, setValue] = React.useState(startState)


  React.useEffect(() => {
    const stringifiedValue = JSON.stringify(value);
    sessionStorage.setItem(storageKey, stringifiedValue);
  }, [value, storageKey]
  )

  return [value, setValue];
}

export function App() {

  const [searchQuery, setSearchQuery] = useState('');
  const [jobsList, setJobsList] = useSessionState('huntdora.savedJobs', [] as Job[]);
  const [jobDetails, setjobDetails] = useState(Job.parse({}));
  const [savedJobs, setSavedJobs] = useState([] as Job[]);
  const [loading, setloading] = useState(false)
  const { isLoading, getAccessTokenSilently } = useAuth0();
  const { user } = useAuth0();

  /**
   * When there is a user, or user changes, fetch their favorites if user
   * is logged in.
   * */
  useEffect(() => {
    if (user && User.isUser(user)) {
      let { email } = user;
      const fetchFavorites = async () => {
        const token = await getAccessTokenSilently();
        const results = await getFavorites(email, token);
        setSavedJobs(results);
      }
      fetchFavorites();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  /**
   *Whenever a job is saved/removed, update DB
   */
  useEffect(() => {
    if (user && User.isUser(user)) {
      let { email } = user;
      const changeFavorites = async () => {
        const token = await getAccessTokenSilently();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const results = await updateFavorites(email, savedJobs, token);
      }
      changeFavorites();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedJobs]);

  /**
   * Search - Whenever query is changed, fetch jobs
   */
  useEffect(() => {
    if (searchQuery !== '') {
      const fetchJobs = async () => {
        const results = await getData(searchQuery);
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
   * Data from form is composed into a query for the API
   */
  function addQuery(data: FormData) {
    let { query, locationName, distanceFrom, minimumSalary } = data;
    const locationQuery = locationName ? `&locationName=${locationName}` : `&locationName=london`;
    const distanceQuery = distanceFrom ? `&distanceFromLocation=${distanceFrom}` : `&distanceFromLocation=10`;
    const salaryQuery = minimumSalary ? `&minimumSalary=${minimumSalary}` : '';
    setloading(true);
    setSearchQuery(query + locationQuery + distanceQuery + salaryQuery);
  }

  /**
   * When fetch job details. Check if it's cached first.
   */
  async function getJob(jobId: number) {
    const jobCached = jobExists(jobId, savedJobs);
    if (jobCached !== undefined) {
      setjobDetails(jobCached)
    }
    else {
      setloading(true);
      const newJob = await getDataOne(jobId)
      setjobDetails(newJob)
      setloading(false);
    }
  }

  /*************************************
   * Function Utilities for handling
   * saved job data and state
   *************************************/
  /**
   *  This function changes the saved property, and updates the job search list
   */
  function updateJobInList(jobId: number) {
    const jobToUpdate: Job | undefined = jobExists(jobId, jobsList);
    if (jobToUpdate !== undefined) {
      jobToUpdate.saved = !jobToUpdate.saved;
      setJobsList((jobsList) => [...jobsList]);
    }
  }
  /**
   * When job is saved from jobsearch list, the details are pre-fetched
   * for later viewing in job details.
   */
  async function saveJob(job: Job) {
    const savedJob: Job | undefined = jobExists(job.jobId, savedJobs);
    if (!savedJob) {
      const newJob = await getDataOne(job.jobId);
      newJob.saved = true;
      setSavedJobs(savedJobs => [...savedJobs, newJob]);
      updateJobInList(job.jobId);
    }
  }

  /**
  * Save a job from the details page, sync with joblist. Don't add if already saved.
  */
  function saveJobFromDetails(job: Job) {
    if (!jobExists(job.jobId, savedJobs)) setSavedJobs(savedJobs => [...savedJobs, job]);
    updateJobInList(job.jobId);
  }

  /**
  * Remove a job from saved, sync with joblist
  */
  function removeJob(job: Job) {
    setSavedJobs(savedJobs => savedJobs.filter(sJob => sJob.jobId !== job.jobId));
    updateJobInList(job.jobId);
  }
  /**
   * Check if a job exists in a given job list
   */
  function jobExists(jobId: number, list: Job[]): Job | undefined {
    return list.find(listJob => listJob.jobId === jobId);
  }

  if (isLoading) return (<ScreenLoading />) /*This checks for auth0 loading state*/

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/*MATERIAL UI CSS RESET*/}
      <Container maxWidth="md" className="App">
        <AppBar color="primary">
          <Toolbar >
            <NavTop addQuery={addQuery} />
          </Toolbar>
        </AppBar>
        <Switch>
          <Route path='/' exact render={() => (<ScreenWelcome />)} />
          <Route path='/job-search' exact render={() => loading ? (<ScreenLoading />) : (<JobPosts jobs={jobsList} getJob={getJob} saveJob={saveJob} removeJob={removeJob} />)} />
          <Route path='/job-details' exact render={() => loading ? (<ScreenLoading />) : (<JobDetails job={jobDetails} saveJobFromDetails={saveJobFromDetails} removeJob={removeJob} />)} />
          <Route path='/saved-jobs' exact render={() => (<JobPosts jobs={savedJobs} getJob={getJob} saveJob={saveJob} removeJob={removeJob} />)} />
        </Switch>
      </Container>
    </ThemeProvider>
  );
}