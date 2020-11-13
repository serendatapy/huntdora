import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import Nav from './components/Nav'
import { JobPosts } from './components/JobPosts'
import apiService from './apiService';
//need a use effect to fetch data

function App() {

  const [jobsList, setJobsList] = useState([]);

  useEffect(() => {
    //fetch data from api
    // setJobsList
    // return () => {
    //   cleanup
    // }
  }, []);



  return (
    <div className="">
      <Nav />
      <JobPosts jobs={jobsList} />
    </div>
  );
}

export default App;
