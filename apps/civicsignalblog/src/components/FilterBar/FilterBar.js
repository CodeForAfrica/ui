import { Stack } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import ChoiceChip from "@/civicsignalblog/components/ChoiceChip";
import ChoiceChipGroup from "@/civicsignalblog/components/ChoiceChipGroup";
import SearchInput from "@/civicsignalblog/components/SearchInput";

const FilterBar = React.forwardRef(function FilterBar(props, ref) {
  const {
    ChoiceChipGroupProps,
    ChoiceChipProps,
    SearchInputProps,
    onChangeQ,
    onChangeTag,
    q,
    tag,
    tags,
    ...other
  } = props;
  const [search, setSearch] = useState();
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { tag: initialTag, q: initialQ } = router.query;
      if (initialTag && onChangeTag) {
        onChangeTag(undefined, initialTag);
      }
      if (initialQ && onChangeQ) {
        onChangeQ(undefined, initialQ);
      }
    }
    // We're only interested in initial isReady and not any subsequent
    // router.query changes e.g. due to search
  }, [router.isReady]);

  const handleChangeChoice = (e, value) => {
    if (onChangeTag) {
      onChangeTag(e, value);
    }
  };

  const handleChangeQ = (e, value) => {
    if (onChangeQ) {
      onChangeQ(e, value);
    }
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleClickSearch = (e) => {
    handleChangeQ(e, search);
  };

  const handleKeyPressSearch = (e) => {
    if (e.key === "Enter") {
      handleChangeQ(e, search);
    }
  };

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      {...other}
      ref={ref}
    >
      <SearchInput
        key={q}
        defaultValue={q}
        size="small"
        {...SearchInputProps}
        onChange={handleChangeSearch}
        onClick={handleClickSearch}
        onKeyPress={handleKeyPressSearch}
        sx={{
          mb: { xs: 2.5, sm: 0 },
          minWidth: { xs: "auto", sm: "200px" },
          ml: { xs: 0, sm: 2.5 },
          order: { xs: 0, sm: 1 },
          width: { xs: "auto", sm: "200px" },
          ...SearchInputProps?.sx,
        }}
      />
      {tags?.length > 0 ? (
        <ChoiceChipGroup
          color="default"
          {...ChoiceChipGroupProps}
          onChange={handleChangeChoice}
          value={tag.slug}
          sx={{
            order: { xs: 1, sm: 0 },
            ...ChoiceChipGroupProps?.sx,
          }}
        >
          {tags.map((t) => (
            <ChoiceChip
              {...ChoiceChipProps}
              label={t.name}
              value={t.slug}
              key={t.slug}
            />
          ))}
        </ChoiceChipGroup>
      ) : null}
    </Stack>
  );
});

export default FilterBar;
