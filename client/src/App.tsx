import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import {Nav} from './components/Nav'
import { JobPosts } from './components/JobPosts'
import { fetchJobs } from './apiService';
import { Job } from './app-types';
//need a use effect to fetch data

function App() {

  const initialState:Job[] = [];

  const [jobsList, setJobsList] = useState<Job[]>(initialState);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    console.log('executing useEffect:',searchQuery);
    const getData = async () => {
      const results = await fetchJobs<Job[]>(`/search?keywords=${searchQuery}&location=london&distanceFromLocation=20`)
      setJobsList(results);
      console.log("The new State is:",results)
    }
    if(searchQuery !== '') getData();
    // return () => {
    //   cleanup
    // }
  }, [searchQuery]);

  function addQuery(query:string) {
    setSearchQuery(query);
  }



  return (
    <div className="">
      <Nav addQuery={addQuery} />
      <JobPosts jobs={jobsList} />
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
