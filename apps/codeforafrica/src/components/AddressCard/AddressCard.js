import { RichTypography } from "@commons-ui/core";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import React from "react";

const AddressCardRoot = styled(Card)(({ theme, ownerState }) => ({
  border: "none",
  color: ownerState.active
    ? theme.palette.primary.main
    : theme.palette.text.primary,
}));

const AddressCard = React.forwardRef(function AddressCard(props, ref) {
  const { active, address, onClick, title } = props;
  const handleClick = (e) => {
    if (onClick) {
      onClick(e, title);
    }
  };
  if (!(title && address)) {
    return null;
  }
  const ownerState = { active };
  return (
    <AddressCardRoot
      elevation={0}
      onClick={handleClick}
      ownerState={ownerState}
      square
      variant="outlined"
      ref={ref}
    >
      <CardActionArea>
        <CardContent>
          <RichTypography sx={{ color: "inherit" }} variant="body3Underline">
            {title}
          </RichTypography>
          <RichTypography sx={{ color: "inherit", pt: 1.25 }} variant="body3">
            {address}
          </RichTypography>
        </CardContent>
      </CardActionArea>
    </AddressCardRoot>
  );
});

export default AddressCard;
