import React from 'react'
import { Job } from '../app-types'
import { useHistory } from 'react-router-dom';
import { useState } from 'react'
import {Checkbox,Typography,Card,CardContent,Grid} from '@material-ui/core';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import LocalActivityOutlinedIcon from '@material-ui/icons/LocalActivityOutlined';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
  job: Job;
  getJob: (jobId: number) => void;
  saveJob: (job: Job) => void;
  removeJob: (job: Job) => void;
}
/**
 * Hover over card animation
 */
const useStyles = makeStyles({
  root: {
    transition: "transform 0.25s ease-in-out"
  },
  cardHovered: {
    transform: "scale(1.025)"
  }
});


export const JobCard: React.FC<Props> = ({ job, getJob, saveJob, removeJob }) => {
  const [saved, setsaved] = useState<boolean>(job.saved)
  const [raised, setraised] = useState({ raised: false, shadow: 10 })

  let history = useHistory();
  const classes = useStyles();

  const handleOnJobClick = (jobId: number):void => {
    getJob(jobId)
    history.push("/job-details") // eslint-disable-line no-restricted-globals
  }
  const handleAddRemove = ():void => {
    console.log('Changing property', job.saved)
    setsaved((saved) => !saved);
    job.saved ? removeJob(job) : saveJob(job);
    job.saved = !job.saved;
    console.log('Changed property', job.saved)
  }

  return (
    <Card
      className={classes.root}
      classes={{ root: raised.raised ? classes.cardHovered : "" }}
      onMouseOver={() => setraised({ raised: true, shadow: 20 })}
      onMouseOut={() => setraised({ raised: false, shadow: 10 })}
      raised={raised.raised}
      elevation={raised.shadow}
    >
      <CardContent>
        <Grid container direction="column">
          <Grid container direction="row" spacing={1}>
            <Grid item xs={10} onClick={() => handleOnJobClick(job.jobId)}>
              <Typography variant="h6">
                <div>{job.jobTitle}</div>
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
