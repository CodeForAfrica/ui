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
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { forwardRef, useState, useRef } from "react";

import chevronDown from "@/charterafrica/assets/icons/chevron-down, Size=24, Color=CurrentColor.svg";
import chevronUp from "@/charterafrica/assets/icons/Chevron-up, Size=24, Color=CurrentColor.svg";
import thumbsUp from "@/charterafrica/assets/icons/Type=thumbs-up, Size=24, Color=CurrentColor.svg";
import userIcon from "@/charterafrica/assets/icons/Type=user, Size=auto, Color=CurrentColor.svg";
import { neutral } from "@/charterafrica/colors";
import LineClampedRichTypography from "@/charterafrica/components/LineClampedRichTypography";

const DynamicLineClampedTypography = forwardRef(
  ({ comment, ...props }, ref) => {
    const ref1 = useRef();
    const commentHeight = ref1?.current?.offsetHeight;
    const currentTheme = useTheme();
    const lineHeight =
      currentTheme.typography.p3.lineHeight *
      currentTheme.typography.p3.fontSize;
    const showReadMore = commentHeight >= lineHeight * 3;

    const [readMoreOpen, setReadMoreOpen] = useState(false);
    const lineClamp = !readMoreOpen ? 2 : undefined;

    return (
      <>
        <LineClampedRichTypography
          ref={ref}
          lineClamp={lineClamp}
          variant="p3"
          {...props}
        >
          {/* eslint-disable-next-line react/no-danger */}
          <span dangerouslySetInnerHTML={{ __html: comment }} ref={ref1} />
        </LineClampedRichTypography>

        {showReadMore ? (
          <Button
            onClick={() => setReadMoreOpen((v) => !v)}
            sx={(theme) => ({
              ...theme.typography.p2,
              mt: 2,
              p: 0,
              color: theme.palette.neutral.main,
            })}
          >
            {readMoreOpen ? "Read less" : `Read more`}
          </Button>
        ) : null}
      </>
    );
  }
);
const ThreadChildComment = forwardRef((props, ref) => {
  const {
    comment,
    authorProfileImageUrl,
    authorDisplayName,
    publishedAt,
    updatedAt,
  } = props;

  return (
    <Box sx={{ mb: 3 }} ref={ref}>
      <Box display="flex" alignItems="center">
        <Avatar
          sx={(theme) => ({
            bgcolor: "#fff",
            color: theme.palette.neutral.main,
          })}
          src={authorProfileImageUrl}
        >
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
        <DynamicLineClampedTypography comment={comment} />
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
    pinnedMessage,
  } = props;

  const [threadExpanded, setThreadExpanded] = useState(false);

  const expandThread = () => {
    setThreadExpanded((val) => !val);
  };

  return (
    <ListItem sx={{ p: 2.5 }} alignItems="flex-start" ref={ref}>
      <ListItemAvatar sx={{ mr: 2.5 }}>
        <Avatar
          sx={(theme) => ({
            height: 60,
            width: 60,
            bgcolor: "#fff",
            color: theme.palette.neutral.main,
          })}
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
                  {pinnedMessage}
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
              <DynamicLineClampedTypography comment={comment} />
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

Comment.propTypes = {
  textDisplay: PropTypes.string,
  publishedAt: PropTypes.string,
  updatedAt: PropTypes.string,
  threads: PropTypes.arrayOf(PropTypes.shape()),
  likeCount: PropTypes.number,
  authorDisplayName: PropTypes.string,
  pinned: PropTypes.boolean,
  authorProfileImageUrl: PropTypes.string,
  pinnedMessage: PropTypes.string,
};

Comment.defaultProps = {
  textDisplay: undefined,
  publishedAt: undefined,
  updatedAt: undefined,
  threads: undefined,
  likeCount: undefined,
  authorDisplayName: undefined,
  pinned: undefined,
  authorProfileImageUrl: undefined,
  pinnedMessage: undefined,
};

export default Comment;
