import axios from 'axios';
//const API_KEY = process.env.REACT_APP_API_KEY;
//const BASEURL: string = 'https://www.reed.co.uk/api/1.0/';

export async function fetchJobs<JobList>(
  path: string
): Promise<JobList> {
  const { data } = await axios.get(path);
  return data;
}
//fetch job listings



    // function fetchJobs(): Job[] {

    //   const mockJobList = mockdata.results.map(job => Job.parse(job));

    //   return mockJobList;
    // }

    // .then((data:JobList) => {
    //   mockJobList = data.map((job:any) => Job.parse(job));
    // })