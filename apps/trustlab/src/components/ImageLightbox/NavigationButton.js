import { IconButton, SvgIcon } from "@mui/material";

import ChevronRightDouble from "@/trustlab/assets/icons/Type=chevronRightDouble, Size=20, Color=currentColor.svg";

export default function NavigationButton({ direction, onClick }) {
  const isPrevious = direction === "previous";
  return (
    <IconButton
      onClick={onClick}
      aria-label={isPrevious ? "Previous image" : "Next image"}
      sx={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        [isPrevious ? "left" : "right"]: { xs: 8, sm: 24 },
        color: "white",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        width: { xs: 40, sm: 48 },
        height: { xs: 40, sm: 48 },
        "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
        zIndex: 1,
      }}
    >
      <SvgIcon
        component={ChevronRightDouble}
        viewBox="0 0 20 20"
        sx={{
          fill: "none",
          fontSize: "24px",
          ...(isPrevious && { transform: "rotate(180deg)" }),
        }}
      />
    </IconButton>
  );
}
