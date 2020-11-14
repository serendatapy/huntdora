import React from 'react';
import { Job } from '../app-types';
import parse from 'html-react-parser'

interface Props {
  job: Job;
  saveJob: (job: Job) => void;
}

export const JobDetails: React.FC<Props> = ({ job, saveJob }) => {

  function handleClickSave(job: Job) {
    console.log('HandleClick activated')
    //saveJob(job);
  }

  function handleClickRemove() {
    //save job to local store
  }

  function parseJobDesc() {
    if(job.jobDescription) return parse(job.jobDescription)
  }


  return (
    <div>
      <button onClick={() => handleClickSave(job)}>Save</button>
      <button onClick={handleClickRemove}>Remove</button>
      {job?.jobTitle}
      {parseJobDesc()}
    </div>
  )
}
