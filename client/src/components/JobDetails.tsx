import React from 'react';
import { Job } from '../app-types';
import parse from 'html-react-parser'

interface Props {
  job: Job;
}

function handleClickSave() {
  //save job to local store
}

function handleClickRemove() {
  //save job to local store
}

export const JobDetails: React.FC<Props> = ({ job }) => {
  return (
    <div>
      <button onClick={handleClickSave}>Save</button>
      <button onClick={handleClickRemove}>Remove</button>
      {job?.jobTitle}
      {parse(job.jobDescription)}
    </div>
  )
}
