import React, { useState } from 'react';
import { PieChart, Pie, Cell, LabelList } from 'recharts';

import { Grid, Typography, makeStyles } from '@material-ui/core';

import chartData from 'data';
import slugify from 'lib/slugify';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GET_CHART_DATA = gql`
  query {
    team {
      id
      name
      projects {
        edges {
          node {
            id
            title
            project_medias(last: 6) {
              edges {
                node {
                  id
                  dbid
                  title
                  tasks {
                    edges {
                      node {
                        id
                        label
                        first_response_value
                      }
                    }
                  }
                  tags {
                    edges {
                      node {
                        id
                        tag_text
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const totalPromises = chartData.chartPromises.reduce((a, b) => a + b.value, 0);

function PercentageLabelFormatter(value) {
  return `${((Number(value) * 100) / totalPromises).toFixed(0)}%`;
}

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative'
  },
  centerTextGrid: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0
  },
  typo: {
    color: theme.palette.common.black
  },
  percentageLabel: {
    pointerEvents: 'none'
  }
}));

function StatusPieChart() {
  const classes = useStyles();

  const { loading, error, data } = useQuery(GET_CHART_DATA);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return null;
  }

  // Get  total medias
  const promises = data.team.projects.edges.map(({ node: project }) => project);
  const medias = promises[0].project_medias.edges.map(
    ({ node: media }) => media
  );

  const mediaArray = medias.map(media => ({
    title: media.title,
    status: slugify(
      media.tasks.edges.find(
        ({ node: task }) => task.label === 'What is the status of the promise?'
      ).node.first_response_value
    )
  }));

  // const newCount = mediaArray.reduce(
  // (c, { status: key }) => ((c[key] = (c[key] || 0) + 1), c),
  // {}
  // );

  /* eslint-disable no-param-reassign */
  const newCount = mediaArray.reduce((c, { status: key }) => {
    c[key] = (c[key] || 0) + 1;
    return c;
  }, {});

  console.log(newCount);

  const [activeData, setActiveData] = useState(null);
  const onMouseEnter = newData => {
    setActiveData(newData);
  };
  const onMouseLeave = () => {
    setActiveData(null);
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.centerTextGrid}
      >
        <Typography variant="h6" className={classes.typo}>
          {activeData ? activeData.value : totalPromises}
        </Typography>
        <Typography variant="h6" className={classes.typo}>
          Promises
        </Typography>
        {activeData && (
          <Typography variant="h6" className={classes.typo}>
            {activeData.name}
          </Typography>
        )}
      </Grid>
      <PieChart width={255} height={255}>
        <Pie
          blendStroke
          isAnimationActive={false}
          data={chartData.chartPromises}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          paddingAngle={1}
          outerRadius={255 / 2}
          innerRadius={75}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {chartData.chartPromises.map(promise => (
            <Cell key={promise.status} />
          ))}
          <LabelList
            className={classes.percentageLabel}
            dataKey="value"
            position="insideTop"
            formatter={PercentageLabelFormatter}
          />
        </Pie>
      </PieChart>
    </div>
  );
}

export default StatusPieChart;
