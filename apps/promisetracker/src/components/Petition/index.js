import { Section, RichTypography } from "@commons-ui/core";
import { Grid, Hidden, Typography } from "@material-ui/core";
import React from "react";

import useStyles from "./useStyles";

import Status from "@/promisetracker/components/PromiseStatus";

const petition = {
  title: "Codification of national sports and athletics law",
  image:
    "http://dashboard.hurumap.org/promisetracker/wp-content/uploads/sites/2/2021/08/adeboro-odunlami-bJgTryACMF0-unsplash.jpg",
  status: {
    name: "Closed",
    description: "",
    title: "Closed",
    color: "#EBEBEB",
  },
  description:
    "Decongesting and managing traffic flow in Nairobi is a challenge that seems to have no solution in sight. The Nairobi County government, led by Governor Mike Sonko, tried to introduce car-free days beginning in February 2019, but this plan had to be suspended even before it started. This was just the latest attempt to address the traffic congestion problem in the city, and given the fact that previous efforts to redirect traffic only worsened the problem instead of alleviating it, Nairobians have reason to remain skeptical. In December, the county government attempted to implement a 2017 policy banning matatus from the city centre. This was an enormous logistical nightmare, given that Nairobi has an estimated 20,000 public service vehicles according to Matatu Owners Association (MOA) chairman Simon Kimutai, and about 70 percent of the city’s 1.3 million commuters use a matatu at some point every month for their commute. The plan to ban matatus and other public service vehicles from entering the CBD had been announced in a gazette notice dated 12 May 2017, and the county government published announcements in the press that the ban would take effect on September 20, 2018. Although it had seemed that the plan was quietly been shelved, with the proposed date for the suspension having changed several times, it eventually came to effect on December 3, 2018. As early as 4AM, traffic marshalls and armed security officers were placed at different termini across the city to keep matatus from driving into the CBD, leading to commuters using matatus to walk into the city. Passengers, matatu operators and legislators, including Nairobi senator Johnson Sakaja, criticised the proposed new routes, leading to the plan’s suspension for 30 days. Among the issues raised by the matatu operators was a lack of consultation by the governor in implementing the gazette notice and concerns over disruption of business, as most of the proposed drop-off points were too far away for commuters.",
};

function Petition() {
  const classes = useStyles({ image: petition.image });

  return (
    <Section classes={{ root: classes.section }}>
      <Grid container>
        <Grid item xs={12} lg={8}>
          <RichTypography variant="h1" className={classes.promiseTitle}>
            {petition.title}
          </RichTypography>
          <div className={classes.featuredImageContainer} />
          <Typography>Gertrude Nyenyeshi started this petition</Typography>
          {/* <ActNowCard {...props} /> */}
          <Hidden lgUp implementation="css">
            <div className={classes.mobileStatusContainer}>
              <Grid item className={classes.mobileStatusLabelGrid}>
                <RichTypography variant="h5" className={classes.statusLabel}>
                  Promise rating status:
                </RichTypography>
                <Status
                  {...petition.status}
                  classes={{ root: classes.mobileStatus }}
                />
              </Grid>
            </div>
          </Hidden>
          <RichTypography className={classes.promiseBody} variant="body1">
            {petition.description}
          </RichTypography>
        </Grid>
        <Grid item md={1} implementation="css" smDown component={Hidden} />
        <Hidden mdDown>
          <Grid item xs={12} lg={3}>
            <RichTypography variant="h4" className={classes.statusLabel}>
              Promise rating status:
            </RichTypography>
            <Status {...petition.status} classes={{ root: classes.status }} />
          </Grid>
        </Hidden>
      </Grid>
    </Section>
  );
}

export default Petition;
