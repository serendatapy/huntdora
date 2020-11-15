import React from 'react'
import { Job } from '../app-types'
import { useHistory } from 'react-router-dom';
import { useState } from 'react'

interface Props {
  job: Job;
  getJob: (jobId: number) => void;
  saveJob: (job: Job) => void;
  removeJob: (job: Job) => void;
}


export const JobCard: React.FC<Props> = ({ job, getJob,saveJob,removeJob }) => {
  const [saved, setsaved] = useState<boolean>(job.saved)

  let history = useHistory();

  const handleOnJobClick = (jobId: number) => {
    getJob(jobId)
    history.push("/job-details") // eslint-disable-line no-restricted-globals
  }
  const handleAddRemove = () => {
    console.log('Changing property', job.saved)
    setsaved((saved) => !saved);
    job.saved ? removeJob(job) : saveJob(job);
    job.saved = !job.saved;
    console.log('Changed property', job.saved)
  }

  return (
    <div className="card">
      <div onClick={() => handleOnJobClick(job.jobId)}>{job.jobTitle}</div>
      <div>{job.locationName}</div>
      <div>{Job.calculateSalaryFreq(job.minimumSalary, job.maximumSalary)}</div>
      <button onClick={() => handleAddRemove()}>{saved ? 'Remove' : 'Save'}</button>
    </div >
  )
}
