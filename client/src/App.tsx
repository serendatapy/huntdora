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
    if (!jobExists) setSavedJobs(savedJobs => [...savedJobs, job]);
  }

  function removeJob(job: Job) {
    if (savedJobs.find(sJob => sJob.jobId === job.jobId)) setSavedJobs(savedJobs => savedJobs.filter(sJob => sJob.jobId !== job.jobId));
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
        <Route path='/job-search' key="fetched-jobs" exact render={()=> (<JobPosts jobs={jobsList} getJob={getJob} saveJob={saveJob} removeJob={removeJob}/>)}/>
        <Route path='/job-details' exact render={()=> (<JobDetails job={jobDetails} saveJob={saveJob} removeJob={removeJob}/>)}/>
        <Route path='/saved-jobs' exact render={()=> (<JobPosts jobs={savedJobs} getJob={getJob} saveJob={saveJob} removeJob={removeJob}/>)}/>
        </Switch>
      </div>

    </Router>
  );
}

/**
 * The remove button changes, but effectively the state of saved, removed elements is not changing. Check Callbacks are working properly
 * In job detail, job is added correctly, but when remove is pressed it doesn't work(doesn't refresh component)
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
