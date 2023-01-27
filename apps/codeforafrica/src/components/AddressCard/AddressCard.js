import { RichTypography } from "@commons-ui/next";
import { Card, CardActionArea, CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

const AddressCardRoot = styled(Card)(({ theme, ownerState }) => ({
  border: "none",
  [theme.breakpoints.up("md")]: {
    color: ownerState.active
      ? theme.palette.primary.main
      : theme.palette.text.primary,
  },
}));

const AddressCard = React.forwardRef(function AddressCard(props, ref) {
  const { active, content, onClick, title } = props;
  const handleClick = (e) => {
    if (onClick) {
      onClick(e, title);
    }
  };

  if (!(title && content)) {
    return null;
  }
  const ownerState = { active };
  return (
    <AddressCardRoot
      elevation={0}
      ownerState={ownerState}
      square
      variant="outlined"
      ref={ref}
    >
      <CardActionArea onClick={handleClick}>
        <CardContent sx={{ p: 0 }}>
          <RichTypography sx={{ color: "inherit" }} variant="body3Underline">
            {title}
          </RichTypography>
          <RichTypography
            component="address"
            // In address, we treat <p> as a line i.e.no margins.
            sx={{ color: "inherit", pt: 1.25, "& p": { m: 0 } }}
            variant="body3"
          >
            {content}
          </RichTypography>
        </CardContent>
      </CardActionArea>
    </AddressCardRoot>
  );
});

export default AddressCard;
