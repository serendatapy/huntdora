import React from 'react';
import { useState } from 'react';
import { Job } from '../app-types';
import parse from 'html-react-parser';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import LocalActivityOutlinedIcon from '@material-ui/icons/LocalActivityOutlined';
import { Checkbox, Grid, Typography } from '@material-ui/core';
import { NavBottom } from './NavBottom';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';

interface Props {
  job: Job;
  saveJobFromDetails: (job: Job) => void;
  removeJob: (job: Job) => void;
}

export const JobDetails = ({ job, saveJobFromDetails, removeJob }: Props) => {

  const [saved, setsaved] = useState<boolean>(job.saved)
  const { user } = useAuth0();
  const { loginWithRedirect } = useAuth0();
  let history = useHistory();

  const handleAddRemove = (): void => {
    if (user) {
      job.saved ? removeJob(job) : saveJobFromDetails(job);
      job.saved = !job.saved;
      setsaved((saved: boolean) => !saved);
    } else loginWithRedirect()
  }
  /**
   * Long job description returns
   * a string of HTML
   */
  function parseJobDesc(): JSX.Element | JSX.Element[] | undefined {
    if (job.jobDescription) return parse(job.jobDescription)
  }

  function handleApply() {
    let url: string | null = job?.externalUrl || job?.jobUrl;
    try {
      if (url !== null) window.open(url);
    } catch (e) {
      console.log(e);
    }
  }

  function renderSalary() {
    if (job.minimumSalary) return `Salary: £${job?.minimumSalary}-${job?.maximumSalary} ${job.salaryType}`
    else return `Salary: Negotiable`
  }
  if(!job.jobId) history.push("/job-search")
  return (
    <>
      <Grid container direction={"column"}>
        <Grid container justify='space-between' style={{ padding: '20px' }}>
          <Grid item xs={10}>
            <Typography variant={'h4'} component="div">
              {job?.jobTitle}
            </Typography>
            <Typography component="div" style={{ padding: '10px 0 0 0' }}>
              {`Company: ${job?.employerName}`}
            </Typography>
            <Typography component="div" >
              {`Location: ${job?.locationName}`}
            </Typography>
            <Typography component="div" >
              {renderSalary()}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Checkbox
              icon={<LocalActivityOutlinedIcon fontSize="large" />}
              checkedIcon={<LocalActivityIcon fontSize="large" />}
              checked={saved}
              onChange={handleAddRemove}
              inputProps={{
                'aria-label': 'secondary checkbox'
              }} />
          </Grid>
        </Grid>
        <Grid item>
          <Typography component="div" style={{ padding: '0 20px 0 20px', marginBottom: '100px' }}>
            {parseJobDesc()}
          </Typography>
        </Grid>
      </Grid>
      <NavBottom handleApply={handleApply} />
    </>
  )
}
