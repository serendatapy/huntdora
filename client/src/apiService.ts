import {reedAPI} from './apiCall';
import {Job} from './app-types'


export async function fetchJobs<JobList>(
  path: string
): Promise<JobList> {
  const { data } = await reedAPI.get(path);
  console.log("Fetched",data)
  let jobs;
  if(data.results){
     jobs = data.results.map((job:any) => Job.parse(job))
  } else {
     jobs = Job.parse(data);
  }
  console.log("They've been transformed!",jobs)
  return jobs;
}