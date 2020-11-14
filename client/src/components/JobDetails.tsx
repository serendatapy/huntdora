import React from 'react';
import { Job } from '../app-types';
import parse from 'html-react-parser'

interface Props {
  job: Job;
  saveJob: (job: Job) => void;
  removeJob: (job: Job) => void;
}

export const JobDetails: React.FC<Props> = ({ job, saveJob, removeJob }) => {

  function handleClickSave(job: Job) {
    saveJob(job);
  }

  function handleClickRemove(job: Job) {
    console.log('HandleClick activated')
    removeJob(job);
  }

  function parseJobDesc() {
    if(job.jobDescription) return parse(job.jobDescription)
  }


  return (
    <div>
      <button onClick={() => handleClickSave(job)}>Save</button>
      <button onClick={() => handleClickRemove(job)}>Remove</button>
      {job?.jobTitle}
      {parseJobDesc()}
    </div>
  )
}
