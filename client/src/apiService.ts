import { reedAPI } from './apiCall';
import { Job } from './app-types'

//const pathGetJob: string = `jobs/`;

export async function getData(jobId: number | null, searchQuery: string | null):Promise<any> {
  console.log('API CALL received:',jobId,searchQuery);
  return jobId !== null ?
    await apiCall(`/jobs/${jobId}`) :
    await apiCall(`/search?keywords=${searchQuery}&location=london&distanceFromLocation=20`);
}

export async function apiCall(
  path: string
) :Promise<Job|Job[]> {
  const { data } = await reedAPI.get(path);
  console.log("Fetched", data)
  let jobs;
  if (data.results) {
    jobs = data.results.map((job: any) => Job.parse(job))
  } else {
    jobs = Job.parse(data);
  }
  console.log("Data has been transformed!", jobs)
  return jobs;
}




