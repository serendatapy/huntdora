import React from 'react';
import JobCard from './JobCard';

interface Job {
  id: string;
  companyName: string;
}

interface Props {
  jobs: Job[];
}

export const JobPosts: React.FC<Props> = (props) => {
  // get info from app
  // for every job send info to jobcard
  return (
    <div>
      {props.jobs[0].companyName}
      <JobCard />
    </div>
  )
}
