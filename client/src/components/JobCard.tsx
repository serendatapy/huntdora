import React from 'react'
import { Job } from '../app-types'

interface Props {
  job: Job;
  getJob: (jobId: number) => void;
}


export const JobCard: React.FC<Props> = ({ job, getJob }) => {

  const handleOnJobClick = (e: any, jobId: number): void => {
    getJob(jobId)
  }

  return (
    <div className="card" onClick={(e) => handleOnJobClick(e, job.jobId)}>
      <div>{job.jobTitle}</div>
      <div>{job.locationName}</div>
      <div>{Job.calculateSalaryFreq(job.minimumSalary, job.maximumSalary)}</div>
    </div >
  )
}
