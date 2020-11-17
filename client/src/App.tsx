import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import { getData } from './apiService';
import { Job } from './app-types';
import { Nav } from './components/Nav';
import { NavBottom } from './components/NavBottom'
import { JobPosts } from './components/JobPosts';
import { JobDetails } from './components/JobDetails';
import { Loading } from './components/Loading';
import { Welcome } from './components/Welcome';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

import { makeStyles, ThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';


//custom themes can be applied to a component
// const useStyles = makeStyles({
//   root: {
//     background: 'linear-gradient(45deg, #333,#999)',
//     border: 0,
//     borderRadius: 15,
//     color: 'white',
//     padding: '0 30px'
//   }
// })
//global themes can be set here
let theme = createMuiTheme({
  typography: {

  },
  palette: {
    primary: {
      light: '#f5f3ed',
      main: '#f3f0e9',
      dark: '#aaa8a3',
      contrastText: '#1f2f47',
    },
    secondary: {
      light: '#9fdcda',
      main: '#87d4d1',
      dark: '#5e9492',
      contrastText: '#1f2f47',
    },
  },
})
theme = responsiveFontSizes(theme);

const LOCAL_STORAGE_KEY = 'huntdora.savedJobs';

function App() {

  const [jobsList, setJobsList] = useState<Job[] | []>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [jobDetails, setjobDetails] = useState<Job>(Job.parse({}));
  const [savedJobs, setSavedJobs] = useState<Job[] | []>([]);
  const [loading, setloading] = useState(false)

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
   *Load jobs on startup
   */
  useEffect(() => {
    const sJobsJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (sJobsJSON != null) setSavedJobs(JSON.parse(sJobsJSON));
  }, [])
  /**
   *update jobs on change
   */
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedJobs))
  }, [savedJobs])

  async function saveJob(job: Job) {
    if (!jobExists(job.jobId, savedJobs)) {
      const newJob: Job = await getData(job.jobId, null);
      newJob.saved = true;
      setSavedJobs(savedJobs => [...savedJobs, newJob]);
    }
  }
  function saveJobFromDetails(job: Job) {
    if (!jobExists(job.jobId, savedJobs)) setSavedJobs(savedJobs => [...savedJobs, job]);
    updateJobInList(job.jobId);
  }

  function removeJob(job: Job) {
    setSavedJobs(savedJobs => savedJobs.filter(sJob => sJob.jobId !== job.jobId));
    updateJobInList(job.jobId);
  }

  function jobExists(jobId: number, list: any[]): Job | undefined {
    return list.find(listJob => listJob.jobId === jobId);
  }

  function updateJobInList(jobId: number) {
    const jobToUpdate: Job | undefined = jobExists(jobId, jobsList);
    if (jobToUpdate) jobToUpdate.saved = !jobToUpdate.saved;
    setJobsList([...jobsList]);
  }

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <div className="App">

          <Router>
            <AppBar color="primary">
              <Toolbar >
                <Nav addQuery={addQuery} />
                {/* <IconButton>
                <Menu />
              </IconButton> */}
              </Toolbar>
            </AppBar>

            <Switch>
              <Route path='/' exact render={() => (<Welcome />)} />
              <Route path='/job-search' exact render={() => loading ? (<Loading />) : (<JobPosts jobs={jobsList} getJob={getJob} saveJob={saveJob} removeJob={removeJob} />)} />
              <Route path='/job-details' exact render={() => loading ? (<Loading />) : (<JobDetails job={jobDetails} saveJobFromDetails={saveJobFromDetails} removeJob={removeJob} />)} />
              <Route path='/saved-jobs' exact render={() => (<JobPosts jobs={savedJobs} getJob={getJob} saveJob={saveJob} removeJob={removeJob} />)} />
            </Switch>
            <AppBar color="primary" position="fixed" style={{ top: 'auto', bottom: 0 }}>
              <Toolbar>
                <NavBottom />
              </Toolbar>
            </AppBar>
          </Router>

          {/* <Grid container spacing={2} justify="center">
            <Grid item xs={3} sm={6}>
              <Paper style={{ height: 75, width: '100%', }}></Paper>
            </Grid>
            <Grid item xs={3} sm={6}>
              <Paper style={{ height: 75, width: '100%', }}></Paper>
            </Grid>
            <Grid item xs={3} lg={12}>
              <Paper style={{ height: 75, width: '100%', }}></Paper>
            </Grid>
          </Grid> */}

        </div>
      </Container>
    </ThemeProvider>
  );
}

export default App;



/*
Before passing props
Interface/class needs to be created (not sure about difference to typescript)
The object needs to be marked at such class
The Component needs to expect it by creating an interface for the prop
In other words, it must name the prop and type it in the interface
beforehand.
*/
