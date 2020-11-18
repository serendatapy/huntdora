import React, { useEffect, useState } from 'react';
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
import {Container, CssBaseline,AppBar,Toolbar} from '@material-ui/core/';
import { makeStyles, ThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';



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

const LOCAL_STORAGE_KEY = 'huntdora.savedJobs';

function App() {

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
   *Load jobs on startup
   */
  useEffect(() => {
    const sJobsJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (sJobsJSON != null) setSavedJobs(JSON.parse(sJobsJSON));
  }, [])
  /**
   *update jobs on save
   */
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedJobs))
  }, [savedJobs])

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
  async function saveJob(job: Job) {
    if (!jobExists(job.jobId, savedJobs)) {
      const newJob: Job = await getData(job.jobId, null);
      newJob.saved = true;
      setSavedJobs(savedJobs => [...savedJobs, newJob]);
    }
  }

  /*************************************
   *
   * Function Utilities for handling
   * saved job data and state
   *************************************/

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/*MATERIAL UI CSS RESET*/}
      <Container maxWidth="sm" className="App">
        <Router>
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
          <AppBar color="primary" position="fixed" style={{ top: 'auto', bottom: 0 }}>
            <Toolbar>
              <NavBottom />
            </Toolbar>
          </AppBar>
        </Router>
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
