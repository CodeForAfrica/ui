import { Card, CardActionArea, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import React from "react";

const ImpactCardRoot = styled(Card, {
  slot: "Root",
})(() => ({}));

const ImpactCard = React.forwardRef(function ImpactCard(ref, props) {
  const { icon, title, number, description } = props;
  return (
    <ImpactCardRoot ref={ref}>
      <CardActionArea>
        <Image src={icon} />
        <Typography>{title}</Typography>
        <Typography>{number}</Typography>
        <Typography>{description}</Typography>
      </CardActionArea>
    </ImpactCardRoot>
  );
});

export default ImpactCard;
