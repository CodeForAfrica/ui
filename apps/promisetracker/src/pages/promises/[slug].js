import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";

import Promise from "@/promisetracker/components/Promise";
import RelatedPromises from "@/promisetracker/components/Promises";
import Page from "@/promisetracker/components/Page";
import Subscribe from "@/promisetracker/components/Newsletter";

import promiseImage from "@/promisetracker/assets/promise-thumb-01@2x.png";

const useStyles = makeStyles(({ breakpoints, typography, widths }) => ({
  section: {
    padding: `0 ${typography.pxToRem(23)}`,
    margin: 0,
    width: "100%",
    [breakpoints.up("lg")]: {
      padding: 0,
      margin: "0 auto",
      width: typography.pxToRem(widths.values.lg),
    },
  },
  sectionTitle: {
    marginBottom: typography.pxToRem(21),
    marginTop: typography.pxToRem(46),
    [breakpoints.up("lg")]: {
      marginBottom: 0,
      marginTop: typography.pxToRem(96),
    },
    fontWeight: 400,
  },
}));

function Index({ promise, relatedPromises, ...props }) {
  const classes = useStyles(props);

  return (
    <Page title={promise.title} classes={{ section: classes.section }}>
      <Promise promise={promise} />
      <RelatedPromises
        items={relatedPromises}
        title="Related Promises"
        withFilter={false}
        classes={{
          section: classes.section,
          sectionTitle: classes.sectionTitle,
        }}
      />
      <Subscribe
        classes={{
          section: classes.section,
        }}
      />
    </Page>
  );
}

Index.propTypes = {
  classes: PropTypes.shape({
    section: PropTypes.string,
    sectionTitle: PropTypes.string,
  }),
  promise: PropTypes.shape({
    date: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
  }),
  relatedPromises: PropTypes.arrayOf(PropTypes.shape({})),
};

Index.defaultProps = {
  promise: {
    date: "2019-08-10",
    description: `
           With the county government introducing a ‘car-free day’ to manage traffic in the city, how effective are the various proposals to decongest Nairobi?
            `,
    image: promiseImage,
    title: "Codification of national sports and athletics law",
    body:
      "<p>Decongesting and managing traffic flow in Nairobi is a challenge that seems to have no solution in sight. The Nairobi County government, led by Governor Mike Sonko, tried to introduce car-free days beginning in February 2019, but this plan had to be suspended even before it started.</p><p> This was just the latest attempt to address the traffic congestion problem in the city, and given the fact that previous efforts to redirect traffic only worsened the problem instead of alleviating it, Nairobians have reason to remain skeptical.</p><p> In December, the county government attempted to implement a 2017 policy banning matatus from the city centre. This was an enormous logistical nightmare, given that Nairobi has an estimated 20,000 public service vehicles according to Matatu Owners Association (MOA) chairman Simon Kimutai, and about 70 percent of the city’s 1.3 million commuters use a matatu at some point every month for their commute. </p><p>The plan to ban matatus and other public service vehicles from entering the CBD had been announced in a gazette notice dated 12 May 2017, and the county government published announcements in the press that the ban would take effect on September 20, 2018.</p><p> Although it had seemed that the plan was quietly been shelved, with the proposed date for the suspension having changed several times, it eventually came to effect on December 3, 2018.</p><p> As early as 4AM, traffic marshalls and armed security officers were placed at different termini across the city to keep matatus from driving into the CBD, leading to commuters using matatus to walk into the city. </p><p>Passengers, matatu operators and legislators, including Nairobi senator Johnson Sakaja, criticised the proposed new routes, leading to the plan’s suspension for 30 days. Among the issues raised by the matatu operators was a lack of consultation by the governor in implementing the gazette notice and concerns over disruption of business, as most of the proposed drop-off points were too far away for commuters.</p>",
    status: {
      color: "#FFB322",
      textColor: "#202020",
      title: "delayed",
    },
  },
  classes: undefined,
  relatedPromises: Array(3).fill({
    date: "2019-08-10",
    description: `
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              euismod odio non leo pretium pellentesque.
            `,
    image: promiseImage,
    status: {
      color: "#FFB322",
      textColor: "#202020",
      title: "delayed",
    },
    title: "Codification of national sports and athletics law",
  }),
};

export default Index;
