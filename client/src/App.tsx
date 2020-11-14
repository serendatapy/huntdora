import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import { Nav } from './components/Nav'
import { JobPosts } from './components/JobPosts'
import { fetchJobs } from './apiService';
import { Job, JobDetail } from './app-types';
import { JobDetails } from './components/JobDetails';
//need a use effect to fetch data

const LOCAL_STORAGE_KEY = 'huntdora.savedJobs';

function App() {

  const initJobsList: Job[] = [];

  const [jobsList, setJobsList] = useState<Job[]>(initJobsList);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewDetail, setViewDetail] = useState<boolean>(false);
  const [jobDetails, setjobDetails] = useState(Job.parse({}));
  const [savedJobs, setSavedJobs] = useState<Job[]>([])

  useEffect(() => {
    console.log('executing useEffect:', searchQuery);
    const getData = async () => {
      const results = await fetchJobs<any>(searchQuery)

      if (viewDetail) setjobDetails(results)
      else setJobsList(results);
      console.log("The new State is:", viewDetail, results, jobsList, jobDetails)
    }
    if (searchQuery !== '') getData();
    // return () => {
    //   cleanup
    // }
  }, [searchQuery]);

  /**
   *Load recipes on startup
   */
  useEffect(() => {
    const sJobsJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (sJobsJSON != null) setSavedJobs(JSON.parse(sJobsJSON))
    return () => {/*cleanup*/ }
  }, [])
  /**
   *update recipes on change
   */
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedJobs))
    console.log('Saved to local storage',savedJobs);
    return () => {/*cleanup*/}
  }, [savedJobs])

  function saveJob(job:Job) {
    let newSavedJobs = [...savedJobs,job]
    setSavedJobs(newSavedJobs);
  }

  function addQuery(query: string) {
    const newPath = `/search?keywords=${query}&location=london&distanceFromLocation=20`
    setViewDetail(false)
    setSearchQuery(newPath);
  }

  function getJob(jobId: number) {
    const newPath = `jobs/${jobId}`
    setViewDetail(true)
    setSearchQuery(newPath) //correctly returns job id
  }

  function changeDisplay() {
    return viewDetail ? (<JobDetails job={jobDetails} saveJob={saveJob}/>) : (<JobPosts jobs={jobsList} getJob={getJob} />)
  }



  return (
    <div className="">
      <Nav addQuery={addQuery} />
      {changeDisplay()}
    </div>
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
