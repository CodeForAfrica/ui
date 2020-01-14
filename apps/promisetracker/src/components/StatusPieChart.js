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

  const currentPromiseArray = medias.map(media => ({
    title: media.title,
    status: slugify(
      media.tasks.edges.find(
        ({ node: task }) => task.label === 'What is the status of the promise?'
      ).node.first_response_value
    )
  }));

  const totalPromises = currentPromiseArray.length;

  // Get status for promise not in currentPromiseArray
  const graphqlPromiseArray = currentPromiseArray.map(status => status.status); // Get all values in graphql chart
  const chartDataPromiseArray = chartData.chartPromises.map(s => s.status); // Get all values logged in chartData
  const chartDataSetDiff = chartDataPromiseArray.filter(
    item => !graphqlPromiseArray.includes(item)
  );

  // Obj containing status of promise not in currentPromiseArray
  const currentChartDataSetDiff = chartDataSetDiff.map(item => {
    const obj = {};
    obj.status = item;
    obj.count = 0;
    return obj;
  });

  // Get count of current values in currentPromiseArray
  /* eslint-disable no-param-reassign */
  const setPromiseCount = currentPromiseArray.reduce((c, { status: key }) => {
    c[key] = (c[key] || 0) + 1;
    return c;
  }, {});

  // Set object array for setPromiseCount
  const currentSetPromiseCount = Object.keys(setPromiseCount).map(e => ({
    status: e,
    count: Number(((setPromiseCount[e] * 100) / totalPromises).toFixed(0))
  }));

  // Push into one array
  const pieData = [...currentChartDataSetDiff, ...currentSetPromiseCount];

  function PercentageLabelFormatter(count) {
    return `${count}%`;
  }

  const [activeData, setActiveData] = useState(null);
  const onMouseEnter = pieChartData => {
    setActiveData(pieChartData);
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
          {activeData
            ? PercentageLabelFormatter(activeData.count)
            : totalPromises}
        </Typography>
        <Typography variant="h6" className={classes.typo}>
          Promises
        </Typography>
        {activeData && (
          <Typography variant="h6" className={classes.typo}>
            {(chartData.statusTypes.find(s => s.slug === activeData.status) &&
              chartData.statusTypes.find(s => s.slug === activeData.status)
                .name) ||
              ''}
          </Typography>
        )}
      </Grid>
      <PieChart width={300} height={300}>
        <Pie
          blendStroke
          isAnimationActive={false}
          data={pieData}
          dataKey="count"
          nameKey="status"
          cx="50%"
          cy="50%"
          paddingAngle={2}
          outerRadius={300 / 2}
          innerRadius={90}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {pieData.map(promise => (
            <Cell key={promise.status} />
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
  );
}

export default StatusPieChart;
