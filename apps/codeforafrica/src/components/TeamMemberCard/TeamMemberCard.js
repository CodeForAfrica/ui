import { Link, RichTypography } from "@commons-ui/next";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { styled } from "@mui/material/styles";
import React from "react";

const TeamMemberCardRoot = styled(Card, {
  slot: "Root",
})(({ theme }) => ({
  backgroundColor: `${theme.palette.background.main}`,
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: 150,
  [theme.breakpoints.only("sm")]: {
    padding: "0 7px",
    width: 164,
  },
}));

const TeamMemberCardMedia = styled(CardMedia, {
  slot: "Root",
})({
  filter: "grayscale(100%)",
  height: 150,
});

const TeamMemberCard = React.forwardRef(function TeamMemberCard(props, ref) {
  const { href, name, title, thumbnail, ...other } = props;

  return (
    <TeamMemberCardRoot elevation={0} square ref={ref} {...other}>
      <CardActionArea component={href ? Link : undefined} href={href}>
        <TeamMemberCardMedia {...thumbnail} component="img" />
        <CardContent
          sx={{
            p: "10px",
            "&:last-child": {
              p: 0,
            },
          }}
        >
          <RichTypography variant="body1SemiBold">{name}</RichTypography>
          <RichTypography
            variant="body1"
            sx={{ mt: "5px", textTransform: "capitalize" }}
          >
            {title}
          </RichTypography>
        </CardContent>
      </CardActionArea>
    </TeamMemberCardRoot>
  );
});

export default TeamMemberCard;
