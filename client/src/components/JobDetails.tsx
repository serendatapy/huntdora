import React from 'react';
import { useState } from 'react';
import { Job } from '../app-types';
import parse from 'html-react-parser';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import LocalActivityOutlinedIcon from '@material-ui/icons/LocalActivityOutlined';
import { Checkbox, Grid, Typography } from '@material-ui/core';
import { NavBottomApply } from './NavBottomApply';

interface Props {
  job: Job;
  saveJobFromDetails: (job: Job) => void;
  removeJob: (job: Job) => void;
}

export const JobDetails: React.FC<Props> = ({ job, saveJobFromDetails, removeJob }) => {

  const [saved, setsaved] = useState<boolean>(job.saved)

  const handleAddRemove = (): void => {
    job.saved ? removeJob(job) : saveJobFromDetails(job);
    job.saved = !job.saved;
    setsaved((saved: boolean) => !saved);
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
      if (url === null) throw new Error('invalid url');
      window.open(url);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <Grid container direction={"column"}>
        <Grid container justify='space-between' style={{ padding: '20px' }}>
          <Grid item xs={10}>
            <Typography variant={'h4'} component="div">
              {job?.jobTitle}
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
          <Typography component="div" style={{ padding: '0 20px 0 20px' }}>
            {parseJobDesc()}
          </Typography>
        </Grid>
      </Grid>
      <NavBottomApply handleApply={handleApply}/>
    </>
  )
}
