import React from 'react'
import { Job } from '../app-types'
import { useHistory } from 'react-router-dom';
import { useState } from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import LocalActivityOutlinedIcon from '@material-ui/icons/LocalActivityOutlined';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

interface Props {
  job: Job;
  getJob: (jobId: number) => void;
  saveJob: (job: Job) => void;
  removeJob: (job: Job) => void;
}


export const JobCard: React.FC<Props> = ({ job, getJob, saveJob, removeJob }) => {
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
    <Card raised={true}>
      <CardContent>
        <Grid container direction="column">
          <Grid container direction="row" spacing={1}>
            <Grid item xs={10}>
              <Typography variant="h6">
                <div onClick={() => handleOnJobClick(job.jobId)}>{job.jobTitle}</div>
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
          <Grid container direction="row">
            <Grid item xs={6}>
              <Typography variant="overline">
                <div>{job.locationName}</div>
              </Typography>

            </Grid>
            <Grid item xs={6}>
              <Typography variant="overline">
                <div>{'£' + Job.calculateSalaryFreq(job.minimumSalary, job.maximumSalary)}</div>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card >
  )
}
