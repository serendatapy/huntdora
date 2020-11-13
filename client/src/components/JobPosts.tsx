import React from 'react';
import JobCard from './JobCard';
import {Job} from '../app-types';

interface Props {
  jobs: Job[];
}

export const JobPosts: React.FC<Props> = (props) => {
  // get info from app
  // for every job send info to jobcard
  return (
    <div>
      {props.jobs[0]?.jobTitle}
      <JobCard />
    </div>
  )
}
