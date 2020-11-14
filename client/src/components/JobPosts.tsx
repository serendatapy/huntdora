import React from 'react';
import { JobCard } from './JobCard';
import { Job } from '../app-types';

interface Props {
  jobs: Job[];
  getJob: (jobId: number) => void;
}

export const JobPosts: React.FC<Props> = (props) => {

  console.log("We've got: ", props)
  return (
    <div>
      {props.jobs?.map(job => <JobCard job={job} getJob={props.getJob} />)}
    </div>
  )
}
