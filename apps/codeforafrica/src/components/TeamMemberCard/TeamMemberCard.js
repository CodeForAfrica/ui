import { Link, RichTypography } from "@commons-ui/next";
import { Card, CardActionArea, CardContent, CardMedia } from "@mui/material";
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
  const { href, name, title, thumbnail } = props;

  return (
    <TeamMemberCardRoot elevation={0} square ref={ref}>
      <CardActionArea component={href ? Link : undefined} href={href}>
        <>
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
        </>
      </CardActionArea>
    </TeamMemberCardRoot>
  );
});

export default TeamMemberCard;
