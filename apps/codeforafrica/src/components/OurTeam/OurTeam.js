import { Section } from "@commons-ui/core";
import { RichTypography } from "@commons-ui/next";
import { Box, Stack } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

import useMembers from "./useMembers";

import ChoiceChip from "@/codeforafrica/components/ChoiceChip";
import ChoiceChipGroup from "@/codeforafrica/components/ChoiceChipGroup";
import FilterBar from "@/codeforafrica/components/FilterBar";
import NextPreviousPagination from "@/codeforafrica/components/NextPreviousPagination";
import TeamMemberCardList from "@/codeforafrica/components/TeamMemberCardList";
import useFilterQuery, {
  ALL_TAG,
} from "@/codeforafrica/components/useFilterQuery";
import equalsIgnoreCase from "@/codeforafrica/utils/equalsIgnoreCase";

function getTags(tagsByFields, field) {
  return tagsByFields.find((tf) => equalsIgnoreCase(field, tf.field))?.tags;
}

const OurTeam = React.forwardRef(function OurTeam(
  {
    pathname,
    sx,
    tags: tagsByFields = [],
    team: {
      pagination: { count: countProp, page: pageProp },
      results: resultsProp,
    },
    title,
  },
  ref
) {
  const [action, setAction] = useState();
  const [count, setCount] = useState(countProp);
  const [field, setField] = useState(tagsByFields[0]?.field);
  const [fields] = useState(() => tagsByFields.map((tf) => tf.field));
  const [page, setPage] = useState(pageProp);
  const [members, setMembers] = useState(resultsProp);
  const [q, setQ] = useState();
  const [tag, setTag] = useState(ALL_TAG);
  const [tags, setTags] = useState(() => getTags(tagsByFields, field));
  const queryParams = useFilterQuery({ field, page, q, tag });
  const sectionRef = useRef();
  const router = useRouter();

  const handleChangeField = (_, value) => {
    // Since fields don't have ALL choice, don't allow deselecting
    if (value) {
      setField(value);
      setTag(ALL_TAG);
      setTags(getTags(tagsByFields, value));
      setPage(1);
      setAction("field");
    }
  };

  const handleChangePage = (_, value) => {
    setPage(value);
    setAction("page");
  };

  const handleChangeQ = (_, value) => {
    setQ(value || undefined);
    setAction("q");
  };

  const handleChangeTag = (_, value) => {
    const newValue =
      (value && tags.find((t) => equalsIgnoreCase(value, t))) || ALL_TAG;
    setTag(newValue);
    setPage(1);
    setAction("tag");
  };

  const { data } = useMembers({ field, page, q, tag });
  useEffect(() => {
    if (data) {
      const { results, pagination } = data;
      setCount(pagination.count);
      setMembers([...results]);
    }
  }, [data]);

  useEffect(() => {
    const url = pathname ? `${pathname}${queryParams}` : queryParams;
    router.push(url, undefined, {
      shallow: true,
    });
    // We don't want to listen to router changes here since we're the ones
    // updating them
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);

  useEffect(() => {
    if (action === "page") {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [action, page]);

  return (
    <Box
      sx={{
        bgcolor: "background.main",
        overflowX: "hidden",
        ...sx,
      }}
      ref={ref}
    >
      <Section
        sx={{
          maxWidth: { md: 1028, lg: 1144 },
          overflowX: "visible",
          pb: { xs: 2.5, sm: 0 },
          px: { xs: 2.5, sm: 0 },
          pt: { xs: 2.5, md: "62px", lg: 10 },
          scrollMarginTop: 80,
        }}
        ref={sectionRef}
      >
        <RichTypography
          variant="h5Small"
          sx={{ mb: 2.5, typography: { md: "h4" } }}
        >
          {title}
        </RichTypography>
        {fields?.length > 0 ? (
          <Stack
            alignItems="center"
            direction="row"
            spacing={2.5}
            sx={{ mb: 1 }}
          >
            <RichTypography sx={{ color: "grey.main" }}>
              Filter by:
            </RichTypography>
            <ChoiceChipGroup
              color="default"
              onChange={handleChangeField}
              value={field}
              sx={{
                order: { xs: 1, sm: 0 },
              }}
            >
              {fields.map((f) => (
                <ChoiceChip label={f} value={f} key={f} />
              ))}
            </ChoiceChipGroup>
          </Stack>
        ) : null}

        <FilterBar
          ChoiceChipProps={{
            sx: {
              background: "none",
              border: 0,
              color: "text.primary",
              textDecoration: "underline",
              typography: "body1",
              "&:active": {
                boxShadow: "none",
              },
              "&:hover": {
                background: "none",
              },
              "&.MuiChip-filledPrimary": {
                border: 0,
                textDecoration: "none",
              },
              "&.MuiChip-filled.MuiToggleButtonGroup-grouped:not(:first-of-type), &.MuiChip-filledPrimary.MuiToggleButtonGroup-grouped:not(:first-of-type)":
                {
                  border: 0,
                },
              "&.MuiChip-clickable:hover": {
                background: "none",
              },
            },
          }}
          ChoiceChipGroupProps={{
            sx: {
              gap: 0,
              order: { xs: 0, sm: 0 },
            },
          }}
          SearchInputProps={{
            placeholder: "Search",
            sx: {
              order: { xs: 1, sm: 1 },
              ml: { xs: 0, md: 2.5 },
              width: { sm: "100%", md: "200px" },
            },
          }}
          direction={{ xs: "column", md: "row" }}
          onChangeQ={handleChangeQ}
          onChangeTag={handleChangeTag}
          q={q}
          tag={tag}
          tags={tags}
        />
        <TeamMemberCardList team={members} sx={{ mt: { sm: 2.5 } }} />
      </Section>
      <NextPreviousPagination
        count={count}
        onChange={handleChangePage}
        page={page}
        sx={{
          background: "inherit",
          display: { xs: "none", sm: "flex" },
        }}
      />
    </Box>
  );
});

export default OurTeam;
