import { reedAPI } from './apiCall';
import { Job } from './app-types';
import { useAuth0 } from "@auth0/auth0-react";

export async function getData(jobId: number | null, searchQuery: string | null): Promise<any> {
  console.log('API CALL received:', jobId, searchQuery);
  return jobId !== null ?
    await apiCall(`/jobs/${jobId}`) :
    await apiCall(`/search/search?keywords=${searchQuery}`);
}

export async function getFavorites(email: string, token: any): Promise<any> {
  console.log('Fetching from DB:', email);
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
  console.log('Updating DB:', email, newFavorites);
  try {
    let response = await reedAPI.post(`/favorites/`, { email: email, favorites: newFavorites }, { headers: headers })
    console.log('Update Response:', response);
  } catch (error) {
    console.log('UPDATE ERROR: ', error);
  }
}

/**
 * Look at axios cancel token
 * documentation for better request management.
 * Does this need to be exportted?
 */
export async function apiCall(
  path: string, headers?:any): Promise<Job | Job[]> {

  let jobs: Job | Job[] = [];
  try {
    console.log("HEADERS:",headers)
    const { data } = headers ? await reedAPI.get(path, { headers: headers }): await reedAPI.get(path);
    console.log("Fetched", data)


    if (data.results) {
      jobs = data.results.map((job: any) => Job.parse(job))
    } else if (data.favorites) {
      jobs = [...data.favorites];
    } else {
      jobs = Job.parse(data);
    }
    console.log("Data has been transformed!", jobs)
    return jobs;
  } catch (error) {
    console.log('Error fetching!', error);
    return jobs;
  }
}




