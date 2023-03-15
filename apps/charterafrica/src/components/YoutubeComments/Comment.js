import RichTypography from "@/commons-ui/core/RichTypography";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon,
} from "@mui/material";
import React, { forwardRef, useState } from "react";

import chevronDown from "@/charterafrica/assets/icons/chevronDown.svg";
import chevronUp from "@/charterafrica/assets/icons/chevronUp.svg";
import thumbsDown from "@/charterafrica/assets/icons/thumbsDown.svg";
import thumbsUp from "@/charterafrica/assets/icons/thumbsUp.svg";
import LineClampedRichTypography from "@/charterafrica/components/LineClampedRichTypography";

const ThreadChildComment = forwardRef((props, ref) => {
  return (
    <Box sx={{ mb: 3 }} ref={ref}>
      <Box display="flex" alignItems="center">
        <Avatar />
        <RichTypography sx={{ ml: 1.25 }} variant="p2">
          User Name
        </RichTypography>
        <RichTypography sx={{ ml: 1 }} variant="p2" color="neutral.main">
          6 months ago (edited)
        </RichTypography>
      </Box>

      <Box sx={{ mt: 1 }}>
        <LineClampedRichTypography
          color="neutral.dark"
          lineClamp={2}
          variant="p3"
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy ever since
          the 1500s, when an unknown printer took a galley of of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </LineClampedRichTypography>

        <Button
          sx={(theme) => ({
            ...theme.typography.p2,
            mt: 2,
            p: 0,
            color: theme.palette.neutral.main,
          })}
        >
          Read more
        </Button>
      </Box>
    </Box>
  );
});

const Comment = forwardRef((props, ref) => {
  const [threadExpanded, setThreadExpanded] = useState(false);

  const expandThread = () => {
    setThreadExpanded((val) => !val);
  };
  return (
    <ListItem alignItems="flex-start" ref={ref}>
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Box>
            <Box sx={{ mb: 1.25 }}>
              <RichTypography variant="p2" color="neutral.main">
                Pinned by Charter Africa
              </RichTypography>
            </Box>

            <Box display="flex" alignItems="center" sx={{ mb: 2.5 }}>
              <Chip
                sx={(theme) => ({
                  backgroundColor: theme.palette.neutral.dark,
                  color: theme.palette.text.secondary,
                  ...theme.typography.p2,
                  mr: 1.75,
                })}
                label="Charter Africa"
              />
              <RichTypography variant="p2" color="neutral.main">
                6 months ago (edited)
              </RichTypography>
            </Box>

            <Box>
              <LineClampedRichTypography
                color="neutral.dark"
                lineClamp={2}
                variant="p3"
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy ever
                since the 1500s, when an unknown printer took a galley of of
                type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </LineClampedRichTypography>

              <Button
                sx={(theme) => ({
                  ...theme.typography.p2,
                  mt: 2,
                  p: 0,
                  color: theme.palette.neutral.main,
                })}
              >
                Read more
              </Button>

              <Box display="flex" sx={{ mt: 3 }}>
                <IconButton>
                  <SvgIcon component={thumbsUp} />
                  <RichTypography color="neutral.dark" sx={{ ml: 1 }}>
                    4
                  </RichTypography>
                </IconButton>
                <IconButton>
                  <SvgIcon component={thumbsDown} />
                  <RichTypography color="neutral.dark" sx={{ ml: 1 }}>
                    4
                  </RichTypography>
                </IconButton>
              </Box>
            </Box>
            <Box sx={{ mt: 1 }}>
              <Accordion
                expanded={threadExpanded}
                elevation={0}
                square
                disableGutters
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                  sx={{ p: 0 }}
                >
                  <Button
                    startIcon={
                      <SvgIcon
                        component={threadExpanded ? chevronDown : chevronUp}
                      />
                    }
                    variant="standard"
                    size="small"
                    onClick={expandThread}
                  >
                    <RichTypography variant="p2" color="neutral.dark">
                      52 Replies
                    </RichTypography>
                  </Button>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0 }}>
                  <ThreadChildComment />
                  <ThreadChildComment />
                  <ThreadChildComment />
                  <ThreadChildComment />
                  <ThreadChildComment />
                  <ThreadChildComment />
                  <ThreadChildComment />
                </AccordionDetails>
              </Accordion>
            </Box>
          </Box>
        }
      />
    </ListItem>
  );
});

export default Comment;
