import React from 'react'
import { Job } from '../app-types'

interface Props {
  job: Job;
}

export const JobCard: React.FC<Props> = ({ job }) => {

  return (
    <div>
      <div>{job.jobTitle}</div>
      <div>{job.locationName}</div>
      <div>{Job.calculateSalaryFreq(job.minimumSalary, job.maximumSalary)}</div>
    </div>
  )
}
