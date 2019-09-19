import React from 'react'
import { Grid, Typography, makeStyles } from '@material-ui/core';
import StatusChip from '../StatusChip';


const useStyles = makeStyles(theme => ({
  root: {
    borderLeft: '1px solid #e6e6e6',
  }
}));

function SideBar() {
  const classes = useStyles()
  return (
    <Grid item xs={12} sm={4} className={classes.root}>
      <Typography variant="h2" style={{ paddingBottom: '2rem' }}>OUR RATINGS</Typography>
      <Grid
        spacing={6}
        container>
        <Grid item>
          <StatusChip status="achieved" />
          <Typography>The promise is mostly or completely fulfilled.</Typography>
        </Grid>

        <Grid item>
          <StatusChip status="compromised" />
          <Typography>
            When promises are accomplished less than the original promise but when there is
            still a significant accomplishment that is consistent with the goal of the original
            promise.
          </Typography>
        </Grid>

        <Grid item>
          <StatusChip status="in-progress" />
          <Typography>The promise is in the works or is being considered.</Typography>
        </Grid>

        <Grid item>
          <StatusChip status="not-achieved" />
          <Typography>This could occur because of inaction by the administration or lack of
            support from the legislative branch or other groups and factors that was critical
            for the promise to be fulfilled. This rating does not necessarily mean that the
            administration failed to push for its fulfilment
          </Typography>
        </Grid>

        <Grid item>
          <StatusChip status="stalled" />
          <Typography>There is no movement on the promise, perhaps because of financial
            limitations,opposition from lawmakers or higher ranks or a change in priorities.
          </Typography>
        </Grid>

        <Grid item>
          <StatusChip status="inactive" />
          <Typography>
            Every promise begins at this level and retains this rating until we see evidence of
            progress or evidence that the promise has been shelved.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )

}

export default SideBar;