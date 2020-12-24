import { reedAPI } from './apiCall';
import { Job } from './app-types';

export async function getData(jobId: number | null, searchQuery: string | null): Promise<any> {
  return jobId !== null ?
    await apiCall(`/jobs/${jobId}`) :
    await apiCall(`/search/search?keywords=${searchQuery}`);
}

export async function getFavorites(email: string, token: any) {
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  return await apiCall(`/favorites/${email}`, headers);
}


/*UPDATE FAVORITES (Allow for changes to take place, whenever a star is pressed)*/
export async function updateFavorites(email: string, newFavorites: [] | Job[], token: any): Promise<any> {

  const headers = {
    Authorization: `Bearer ${token}`,
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let response = await reedAPI.post(`/favorites/`, { email: email, favorites: newFavorites }, { headers: headers })
  } catch (error) {
    console.log('UPDATE ERROR: ', error);
  }
}

/**
 * Does this need to be exported?
 */
async function apiCall(
  path: string, headers?: any): Promise<Job | Job[]> {

  let jobs: Job | Job[] = [];
  try {
    const { data } = headers ? await reedAPI.get(path, { headers: headers }) : await reedAPI.get(path);

    if (data.results) {
      jobs = data.results.map((job: any) => Job.parse(job))
    } else if (data.favorites) {
      jobs = [...data.favorites];
    } else {
      jobs = Job.parse(data);
    }
    return jobs;
  } catch (error) {
    return jobs;
  }
}




