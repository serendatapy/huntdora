import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import { fetchJobs } from './apiService';
import { Job } from './app-types';
import { Nav } from './components/Nav'
import { JobPosts } from './components/JobPosts'
import { JobDetails } from './components/JobDetails';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

const LOCAL_STORAGE_KEY = 'huntdora.savedJobs';

function App() {

  const [jobsList, setJobsList] = useState<Job[] | []>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewDetail, setViewDetail] = useState<boolean>(false);
  const [jobDetails, setjobDetails] = useState<Job>(Job.parse({}));
  const [savedJobs, setSavedJobs] = useState<Job[] | []>([]);

  useEffect(() => {
    console.log('executing useEffect:', searchQuery);
    const getData = async () => {
      const results = await fetchJobs<any>(searchQuery);
      if (viewDetail) setjobDetails(results);
      else setJobsList(results);
      console.log("The new State is:", viewDetail, results, jobsList, jobDetails)
    }
    if (searchQuery !== '') getData();
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

  function saveJob(job: Job) {
    const jobExists: Job | undefined = savedJobs.find(sJob => sJob.jobId === job.jobId);
    if (!jobExists) setSavedJobs([...savedJobs, job]);
  }

  function removeJob(job: Job) {
    let newSavedJobs: Job[] | [] = savedJobs.filter(sJob => sJob.jobId !== job.jobId);
    if (newSavedJobs.length !== savedJobs.length) setSavedJobs(newSavedJobs);
  }

  function addQuery(query: string) {
    const newPath = `/search?keywords=${query}&location=london&distanceFromLocation=20`;
    setViewDetail(false);
    setSearchQuery(newPath);
  }

  function getJob(jobId: number) {
    const newPath = `jobs/${jobId}`;
    setViewDetail(true);
    setSearchQuery(newPath);
  }

  return (
    <Router>
      <div className="">
        <Nav addQuery={addQuery} />
        <Switch>
        <Route path='/job-search' key="fetched-jobs" exact render={()=> (<JobPosts jobs={jobsList} getJob={getJob} />)}/>
        <Route path='/job-details' exact render={()=> (<JobDetails job={jobDetails} saveJob={saveJob} removeJob={removeJob}/>)}/>
        <Route path='/saved-jobs' exact render={()=> (<JobPosts jobs={savedJobs} getJob={getJob} />)}/>
        </Switch>
      </div>

    </Router>
  );
}

/**
 * tried to add keys to component, but didn't work. Try to make a new component instead
 * at the moment, when the route is called, for some reason it returns to home route
 * it doesn't seem to want to change route. Admitedly the data coming in Is a little different. Job in search and Job in details, has the same type?
 */

export default App;



/*
Before passing props
Interface/class needs to be created (not sure about difference to typescript)
The object needs to be marked at such class
The Component needs to expect it by creating an interface for the prop
In other words, it must name the prop and type it in the interface
beforehand.
*/
