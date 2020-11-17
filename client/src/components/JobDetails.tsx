import React from 'react';
import { useState } from 'react';
import { Job } from '../app-types';
import parse from 'html-react-parser';
import Typography from '@material-ui/core/Typography';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import LocalActivityOutlinedIcon from '@material-ui/icons/LocalActivityOutlined';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';


interface Props {
  job: Job;
  saveJobFromDetails: (job: Job) => void;
  removeJob: (job: Job) => void;
}

export const JobDetails: React.FC<Props> = ({ job, saveJobFromDetails, removeJob }) => {

  const [saved, setsaved] = useState<boolean>(job.saved)

  const handleAddRemove = () => {
    job.saved ? removeJob(job) : saveJobFromDetails(job);
    job.saved = !job.saved;
    setsaved((saved: boolean) => !saved);
  }

  function parseJobDesc() {
    if (job.jobDescription) return parse(job.jobDescription)
  }

  return (
    <Grid container direction={"column"}>
      <Grid container>
        <Grid item xs={10}>
          <Typography variant={'h6'} component="div">
            {job?.jobTitle}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Checkbox
            icon={<LocalActivityOutlinedIcon />}
            checkedIcon={<LocalActivityIcon />}
            checked={saved}
            onChange={handleAddRemove}
            inputProps={{
              'aria-label': 'secondary checkbox'
            }}
          />
        </Grid>
      </Grid>
      <Grid item>
        <Typography>
          {parseJobDesc()}
        </Typography>
      </Grid>
    </Grid>
  )
}
