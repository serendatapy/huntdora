import React from 'react'
import { Job } from '../app-types'

interface Props {
  job: Job;
}

export const JobCard: React.FC<Props> = ({ job }) => {



  function calculateSalaryFreq(minSalary: number | null, maxSalary: number | null): string {

    if (maxSalary === null) return 'Negotiable'
    else if (maxSalary > 1000) return `${minSalary}-${maxSalary} per annum`
    else if (maxSalary > 100) return `${minSalary}-${maxSalary} per day`
    else return `${minSalary}-${maxSalary} per hour`
  }


  return (
    <div>
      <div>{job.jobTitle}</div>
      <div>{job.locationName}</div>
      <div>{calculateSalaryFreq(job.minimumSalary, job.maximumSalary)}</div>
    </div>
  )
}
