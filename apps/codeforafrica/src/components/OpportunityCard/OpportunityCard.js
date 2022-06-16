import { RichTypography } from "@commons-ui/core";
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
} from "@mui/material";
import React from "react";

const OpportunityCard = React.forwardRef(function OpportunityCard(props, ref) {
  return (
    <Card ref={ref}>
      <CardMedia component="img" alt="" src="/images/opportunities-1.png" />
      <CardContent>
        <RichTypography>
          DEPUTY INVESTIGATIVE MANAGER: Support the fight against disinformation
          and transnational organised crime
        </RichTypography>
        <RichTypography>
          Position in: Africa Do you want to help expose the puppet-masters
          behind disinformation networks, and expose transnational organised
          criminals? Code for Africa (CfA) has an immediate vacancy for a
          full-time Deputy Investigative Manager to join our pan-African
          forensic...
        </RichTypography>
      </CardContent>
      <CardActions>
        <Button>Read More</Button>
      </CardActions>
    </Card>
  );
});

export default OpportunityCard;
