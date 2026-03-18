import { Section } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import { Box, Chip, SvgIcon, Typography } from "@mui/material";
import { forwardRef } from "react";

import ExternalLinkIcon from "@/trustlab/assets/icons/Type=external-link, Size=24, Color=CurrentColor.svg";

const ChipList = forwardRef(function ChipList(props, ref) {
  const { title, organizations = [], sx, ...other } = props;

  if (!organizations.length) {
    return null;
  }

  return (
    <Box
      ref={ref}
      sx={{
        backgroundColor: "#F0F0F5",
        py: 3,
        borderRadius: "10px",
        ...sx,
      }}
      data-testid="chip-list"
      {...other}
    >
      <Section sx={{ px: { xs: 2.5, md: 3 } }}>
        {title && (
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 2,
            }}
          >
            {title}
          </Typography>
        )}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1.5,
            alignItems: "center",
          }}
        >
          {organizations.map((org, index) => {
            const hasLink = Boolean(org.link?.href);

            const chipProps = hasLink
              ? {
                  component: Link,
                  href: org.link.href,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  clickable: true,
                }
              : {};

            return (
              <Chip
                key={org.id ?? index}
                label={
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.75,
                    }}
                  >
                    <Typography variant="body2" sx={{ color: "#333435" }}>
                      {org.name}
                    </Typography>
                    {hasLink && (
                      <SvgIcon
                        component={ExternalLinkIcon}
                        inheritViewBox
                        viewBox="0 0 24 24"
                        sx={{
                          color: "#1020E1",
                          fill: "none",
                          fontSize: 24,
                          viewBox: "0 0 24 24",
                        }}
                      />
                    )}
                  </Box>
                }
                {...chipProps}
                sx={{
                  backgroundColor: "#E7E9FF",
                  border: "1px solid #E0E0E0",
                  borderRadius: "20px",
                  height: 36,
                  color: "text.primary",
                  textDecoration: "none",
                  "& .MuiChip-label": {
                    px: 2,
                  },
                }}
              />
            );
          })}
        </Box>
      </Section>
    </Box>
  );
});

export default ChipList;
