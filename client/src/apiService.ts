import {reedAPI} from './apiCall';
import {Job} from './app-types'


export async function fetchJobs<JobList>(
  path: string
): Promise<JobList> {
  const { data } = await reedAPI.get(path);
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