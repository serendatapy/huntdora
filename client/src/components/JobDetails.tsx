import React from 'react';
import { Job } from '../app-types';
import parse from 'html-react-parser';

interface Props {
  job: Job;
  saveJob: (job: Job) => void;
  removeJob: (job: Job) => void;
}

export const JobDetails: React.FC<Props> = ({ job, saveJob, removeJob }) => {

  function handleClickSave(job: Job) {
    job.saved = true;
    saveJob(job);
  }

  function handleClickRemove(job: Job) {
    removeJob(job);
  }

  function parseJobDesc() {
    if (job.jobDescription) return parse(job.jobDescription)
  }

  const displaySaveRemoveBtn = (): JSX.Element => {
    return job.saved === true ?
      (<button onClick={() => handleClickRemove(job)}>Remove</button>) :
      (<button onClick={() => handleClickSave(job)}>Save</button>)
  }


  return (
    <div>
      {displaySaveRemoveBtn()}
      {job?.jobTitle}
      {parseJobDesc()}
    </div>
  )
}
