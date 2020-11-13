import axios from 'axios';
import {Job} from './app-types'
//const API_KEY = process.env.REACT_APP_API_KEY;
//const BASEURL: string = 'https://www.reed.co.uk/api/1.0/';

export async function fetchJobs<JobList>(
  path: string
): Promise<JobList> {
  const { data } = await axios.get(path);
  console.log("Fetched",data)
  const jobs = data.results.map((job:any) => Job.parse(job))
  console.log("They've been transformed!",jobs)
  return jobs;
}
//fetch job listings



    // function fetchJobs(): Job[] {

    //   const mockJobList = mockdata.results.map(job => Job.parse(job));

    //   return mockJobList;
    // }

    // .then((data:JobList) => {
    //   mockJobList = data.map((job:any) => Job.parse(job));
    // })