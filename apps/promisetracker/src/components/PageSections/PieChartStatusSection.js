import React, { useState } from 'react';
import { PieChart, Pie, Cell, LabelList } from 'recharts';

import { Grid, Typography, makeStyles } from '@material-ui/core';

import chartData from 'data';
import slugify from 'lib/slugify';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import Layout from 'components/Layout';
import StatusIndicator from 'components/StatusIndicator';
import config from '../../config';

const getIndicatorImage = require.context(
  '../../assets/images/indicators',
  false,
  /\.png$/
);

const GET_CHART_DATA = gql`
  query {
    team(slug: "pesacheck-promise-tracker") {
      id
      name
      projects {
        edges {
          node {
            id
            title
            description
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

const useStyles = makeStyles(theme => ({
  root: {
    padding: '3rem 0'
  },
  statusGridRoot: {
    position: 'relative'
  },
  statusGrid: {
    padding: '5rem 0'
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

function PieChartStatusSection() {
  const classes = useStyles();

  const { loading, error, data } = useQuery(GET_CHART_DATA);
  if (loading) {
    return <div>Loading pie chart...</div>;
  }
  if (error) {
    return null;
  }

  // Get total promises
  const promises = data.team.projects.edges.map(({ node: project }) => project);
  const medias = promises[0].project_medias.edges.map(
    ({ node: media }) => media
  );

  const promiseStatuses = chartData.statusTypes.map(promise => ({
    ...promise,
    count: 0
  })); // Initialize
  const statusFor = media =>
    slugify(
      media.tasks.edges.find(
        ({ node: task }) => task.label === 'What is the status of the promise?'
      ).node.first_response_value
    );
  medias.forEach(media => {
    const status = statusFor(media);
    const promiseStatus = promiseStatuses.find(s => s.slug === status);
    promiseStatus.count += 1;
  });

  const totalPromises = promiseStatuses.reduce((a, b) => a + b.count, 0);

  const filteredPromises = promiseStatuses.filter(f => f.count > 0);

  function PercentageLabelFormatter(value) {
    return `${((Number(value) * 100) / totalPromises).toFixed(0)}%`;
  }

  const [activeData, setActiveData] = useState(null);
  const onMouseEnter = pieData => {
    setActiveData(pieData);
    if (promiseStatuses) {
      setActiveData(pieData);
    }
  };
  const onMouseLeave = () => {
    setActiveData(null);
  };
  return (
    <div className={classes.root}>
      <Layout justify="center">
        <Grid item className={classes.statusGrid}>
          <div className={classes.statusGridRoot}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              className={classes.centerTextGrid}
            >
              <Typography variant="h6" className={classes.typo}>
                {activeData
                  ? activeData.count ||
                    promiseStatuses.find(p => p.slug === activeData.status)
                      .count
                  : totalPromises}
              </Typography>
              <Typography variant="h6" className={classes.typo}>
                Promises
              </Typography>
              {activeData && (
                <Typography variant="h6" className={classes.typo}>
                  {(chartData.statusTypes.find(
                    s => s.slug === activeData.slug
                  ) &&
                    chartData.statusTypes.find(s => s.slug === activeData.slug)
                      .name) ||
                    '' ||
                    promiseStatuses.find(p => p.slug === activeData.status)
                      .name}
                </Typography>
              )}
            </Grid>
            <PieChart width={300} height={300}>
              <Pie
                blendStroke
                isAnimationActive={false}
                data={filteredPromises}
                dataKey="count"
                nameKey="slug"
                cx="50%"
                cy="50%"
                paddingAngle={2}
                outerRadius={300 / 2}
                innerRadius={90}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              >
                {promiseStatuses.map(promise => (
                  <Cell
                    key={promise.slug}
                    fill={config.colors[promise.slug].dark}
                  />
                ))}
                <LabelList
                  className={classes.percentageLabel}
                  dataKey="count"
                  position="insideTop"
                  formatter={PercentageLabelFormatter}
                />
              </Pie>
            </PieChart>
          </div>
        </Grid>

        <Grid container spacing={2} justify="center">
          {promiseStatuses.map(promise => (
            <Grid key={promise.status} item xs={8} sm={4} md={2}>
              <StatusIndicator
                img={getIndicatorImage(promise.img)}
                label={promise.name}
                status={promise.slug}
                value={promise.count}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              />
            </Grid>
          ))}
        </Grid>
      </Layout>
    </div>
  );
}

export default PieChartStatusSection;
