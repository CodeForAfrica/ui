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

import chevronDown from "@/charterafrica/assets/icons/chevron-down, Size=24, Color=CurrentColor.svg";
import chevronUp from "@/charterafrica/assets/icons/Chevron-up, Size=24, Color=CurrentColor.svg";
import thumbsUp from "@/charterafrica/assets/icons/Type=thumbs-up, Size=24, Color=CurrentColor.svg";
import userIcon from "@/charterafrica/assets/icons/Type=user, Size=auto, Color=CurrentColor.svg";
import { neutral } from "@/charterafrica/colors";
import LineClampedRichTypography from "@/charterafrica/components/LineClampedRichTypography";

const ThreadChildComment = forwardRef((props, ref) => {
  const {
    comment,
    authorProfileImageUrl,
    authorDisplayName,
    publishedAt,
    updatedAt,
  } = props;
  const [readMoreOpen, setReadMoreOpen] = useState(false);
  const lineClamp = !readMoreOpen ? 2 : undefined;
  return (
    <Box sx={{ mb: 3 }} ref={ref}>
      <Box display="flex" alignItems="center">
        <Avatar sx={{ bgcolor: "#fff" }} src={authorProfileImageUrl}>
          <SvgIcon
            inheritViewBox
            component={userIcon}
            sx={{
              color: neutral[800],
              fill: "none",
              height: 40,
              width: 40,
            }}
          />
        </Avatar>
        <LineClampedRichTypography
          lineClamp={1}
          color="neutral.dark"
          sx={{ ml: 1.25 }}
          variant="p2"
        >
          {authorDisplayName}
        </LineClampedRichTypography>
        <LineClampedRichTypography
          lineClamp={1}
          sx={{ ml: 1 }}
          variant="p2"
          color="neutral.main"
        >
          {publishedAt} {publishedAt !== updatedAt && "(edited)"}
        </LineClampedRichTypography>
      </Box>

      <Box sx={{ mt: 1 }}>
        <LineClampedRichTypography lineClamp={lineClamp} variant="p3">
          {comment}
        </LineClampedRichTypography>

        <Button
          onClick={() => setReadMoreOpen((v) => !v)}
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
  const {
    textDisplay: comment,
    publishedAt,
    updatedAt,
    threads,
    likeCount,
    authorDisplayName,
    pinned,
    authorProfileImageUrl,
  } = props;

  const [threadExpanded, setThreadExpanded] = useState(false);
  const [readMoreOpen, setReadMoreOpen] = useState(false);
  const lineClamp = !readMoreOpen ? 2 : undefined;

  const expandThread = () => {
    setThreadExpanded((val) => !val);
  };
  return (
    <ListItem sx={{ p: 2.5 }} alignItems="flex-start" ref={ref}>
      <ListItemAvatar sx={{ mr: 2.5 }}>
        <Avatar
          sx={{ height: 60, width: 60, bgcolor: "#fff" }}
          src={authorProfileImageUrl}
        >
          <SvgIcon
            inheritViewBox
            component={userIcon}
            sx={{
              color: neutral[800],
              fill: "none",
              height: 60,
              width: 60,
            }}
          />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Box>
            {pinned && (
              <Box sx={{ mb: 1.25 }}>
                <RichTypography variant="p2" color="neutral.main">
                  Pinned by Charter Africa
                </RichTypography>
              </Box>
            )}

            <Box display="flex" alignItems="center" sx={{ mb: 2.5 }}>
              {pinned ? (
                <>
                  {}
                  <Chip
                    sx={(theme) => ({
                      backgroundColor: theme.palette.neutral.dark,
                      color: theme.palette.text.secondary,
                      ...theme.typography.p2,
                      mr: 1.75,
                    })}
                    label={authorDisplayName}
                  />
                </>
              ) : (
                <LineClampedRichTypography
                  lineClamp={1}
                  sx={{ mr: 2 }}
                  color="neutral.dark"
                  variant="p2"
                >
                  {authorDisplayName}
                </LineClampedRichTypography>
              )}
              <LineClampedRichTypography
                lineClamp={1}
                variant="p2"
                color="neutral.main"
              >
                {publishedAt} {publishedAt !== updatedAt && "(edited)"}
              </LineClampedRichTypography>
            </Box>

            <Box>
              <LineClampedRichTypography lineClamp={lineClamp} variant="p3">
                {comment}
              </LineClampedRichTypography>

              <Button
                onClick={() => setReadMoreOpen((v) => !v)}
                sx={(theme) => ({
                  ...theme.typography.p2,
                  mt: 2,
                  p: 0,
                  color: theme.palette.neutral.main,
                })}
              >
                Read more
              </Button>

              <Box display="flex" alignItems="center" sx={{ mt: 3 }}>
                <IconButton>
                  <SvgIcon
                    sx={{
                      color: neutral[800],
                      display: "inline-flex",

                      fill: "none",
                    }}
                    component={thumbsUp}
                  />
                </IconButton>
                <RichTypography color="neutral.dark">
                  {likeCount}
                </RichTypography>
                {/* Dislikes go here. Youtube doesn't have dislike count */}
              </Box>
            </Box>
            {threads.length ? (
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
                          sx={{
                            color: neutral[800],
                            display: "inline-flex",

                            fill: "none",
                          }}
                        />
                      }
                      variant="standard"
                      size="small"
                      onClick={expandThread}
                    >
                      <RichTypography variant="p2" color="neutral.dark">
                        {threads.length} Replies
                      </RichTypography>
                    </Button>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 0 }}>
                    {threads.map((thread) => (
                      <ThreadChildComment {...thread} key={thread.id} />
                    ))}
                  </AccordionDetails>
                </Accordion>
              </Box>
            ) : null}
          </Box>
        }
      />
    </ListItem>
  );
});

export default Comment;
