import { reedAPI } from './apiCall';
import { Job } from './app-types';

export async function getData(searchQuery: string | null) {
  let jobs = await apiCall(`/search/search?keywords=${searchQuery}`);
  if (Job.isJobArray(jobs)) return jobs;
  else return [] as Job[]
}

export async function getDataOne(jobId: number | null) {
  let job = await apiCall(`/jobs/${jobId}`);
  if (Job.isJob(job)) return job;
  else return Job.parse({}) as Job;
}

export async function getFavorites(email: string, token: any) {
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  const jobs = await apiCall(`/favorites/${email}`, headers);
  if (Job.isJobArray(jobs)) return jobs;
  else return [] as Job[]
}


/*UPDATE FAVORITES (Allow for changes to take place, whenever a star is pressed)*/
export async function updateFavorites(email: string, newFavorites: [] | Job[], token: any): Promise<any> {

  const headers = {
    Authorization: `Bearer ${token}`,
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let response = await reedAPI.post(`/favorites/`, { email: email, favorites: newFavorites }, { headers: headers })
    return response;
  } catch (error) {
    console.log('UPDATE ERROR: ', error);
  }
}

/**
 * Does this need to be exported?
 */
async function apiCall(
  path: string,
  headers?: {} | undefined
):
  Promise<Job | Job[]> {

  let jobs: Job | Job[] = [];
  try {
    const { data } = headers !== undefined ? await reedAPI.get(path, { headers: headers }) : await reedAPI.get(path);
    if (data.results) {
      jobs = data.results.map((job: any) => Job.parse(job))
    } else if (Array.isArray(data)) {
      jobs = [...data];
    } else { //check it is really what I expect!
      jobs = Job.parse(data);
    }
    return jobs;
  } catch (error) {
    return jobs;
  }
}




