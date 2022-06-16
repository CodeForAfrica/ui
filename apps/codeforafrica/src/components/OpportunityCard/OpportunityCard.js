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
    <Card sx={{ boxShadow: "none", borderRadius: 0 }} ref={ref}>
      <CardMedia component="img" alt="" src="/images/opportunities-1.png" />
      <CardContent sx={{ padding: 0 }}>
        <RichTypography sx={{ mt: "40px", mb: "20px" }} variant="h3">
          DEPUTY INVESTIGATIVE MANAGER: Support the fight against disinformation
          and transnational organised crime
        </RichTypography>
        <RichTypography variant="body2">
          Jan 27, 2022 | Career, Full-time, Remote | 0 Comments
        </RichTypography>
        <RichTypography sx={{ py: "20px" }} variant="body2">
          Position in: Africa Do you want to help expose the puppet-masters
          behind disinformation networks, and expose transnational organised
          criminals? Code for Africa (CfA) has an immediate vacancy for a
          full-time Deputy Investigative Manager to join our pan-African
          forensic...
        </RichTypography>
      </CardContent>
      <CardActions sx={{ padding: 0 }}>
        <Button variant="contained-reverse">Read More</Button>
      </CardActions>
    </Card>
  );
});

export default OpportunityCard;
