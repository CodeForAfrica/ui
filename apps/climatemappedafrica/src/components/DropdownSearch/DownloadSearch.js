import { Link } from "@commons-ui/next";
import {
  IconButton,
  InputBase,
  Typography,
  List,
  ListItem,
  SvgIcon,
  Box,
} from "@mui/material";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import SearchIcon from "@/climatemappedafrica/assets/icons/search.svg";

function DropdownSearch({
  IconButtonProps,
  InputBaseProps,
  TypographyProps,
  href: hrefProp = "/explore",
  label,
  locations,
  onClick,
  icon: IconProp = SearchIcon,
  placeholder,
  variant,
  sx,
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    setQuery(e.target.value);
    setSelectedLocation(null);
  };

  const handleSelect = (code, name) => {
    setQuery(name.toLowerCase());
    setSelectedLocation(code);
  };

  useEffect(() => {
    if (query?.length > 0 && !selectedLocation) {
      const matchedGeo = locations?.filter(({ name }) =>
        name.toLowerCase()?.startsWith(query.toLowerCase()),
      );
      setSuggestions(matchedGeo);
    } else {
      setSuggestions([]);
    }
  }, [locations, selectedLocation, query]);

  const handleClickSearch = () => {
    if (onClick) {
      onClick(selectedLocation);
    } else if (selectedLocation) {
      const href = `${hrefProp}/${selectedLocation}`;
      router.push(href);
    } else if (query) {
      router.push("/404");
    }
  };

  let iconComponent = SearchIcon;
  let iconBorder;
  if (variant === "explore") {
    iconComponent = IconProp;
    iconBorder = {
      borderRadius: "50%",
      border: "2px solid #fff",
    };
  }
  const searchIconButton = (
    <IconButton
      color="primary"
      size="small"
      {...IconButtonProps}
      onClick={handleClickSearch}
      sx={[
        () => ({
          padding: 0,
          ml: 2,
        }),
        ...(Array.isArray(IconButtonProps?.sx)
          ? IconButtonProps.sx
          : [IconButtonProps?.sx]),
      ]}
    >
      <SvgIcon
        component={iconComponent}
        viewBox="0 0 48 48"
        sx={{
          width: 40,
          height: 40,
          ...iconBorder,
        }}
      />
    </IconButton>
  );

  return (
    <Box id="location-search" sx={sx}>
      {label && (
        <Typography
          variant="body1"
          {...TypographyProps}
          sx={[
            ({ palette, typography }) => ({
              color: palette.text.primary,
              marginBottom: typography.pxToRem(10),
            }),
            ...(Array.isArray(TypographyProps?.sx)
              ? TypographyProps.sx
              : [TypographyProps?.sx]),
          ]}
        >
          {label}
        </Typography>
      )}
      <InputBase
        {...InputBaseProps}
        endAdornment={variant === "explore" ? searchIconButton : null}
        inputProps={{ "aria-label": "search" }}
        onChange={handleChange}
        placeholder={placeholder}
        value={query}
        sx={[
          ({ typography, palette }) => ({
            borderRadius: typography.pxToRem(10),
            color: palette.text.primary,
            border: `2px solid ${palette.grey.light}`,
            width: typography.pxToRem(278),
            backgroundColor: "inherit",
            height: typography.pxToRem(48),
            padding: `0 0 0 ${typography.pxToRem(20)}`,
            "&.MuiInputBase-input": {
              backgroundColor: "inherit",
              height: typography.pxToRem(48),
              borderRadius: typography.pxToRem(10),
              padding: 0,
              textTransform: "capitalize",
            },
            "&.Mui-focused": {
              border: `2px solid ${palette.grey.main}`,
            },
          }),
          ...(Array.isArray(InputBaseProps?.sx)
            ? InputBaseProps.sx
            : [InputBaseProps?.sx]),
        ]}
      />
      {variant !== "explore" && searchIconButton}

      <Box sx={{ position: "relative" }}>
        {suggestions?.length > 0 && (
          <List
            sx={({ typography, palette }) => ({
              width: typography.pxToRem(278),
              position: "absolute",
              marginTop: typography.pxToRem(5),
              zIndex: 10,
              background: palette.background.default,
              border: `2px solid ${palette.grey.main}`,
              borderRadius: typography.pxToRem(10),
              padding: 0,
              textTransform: "capitalize",
            })}
          >
            {suggestions.map(({ name, code }) => (
              <ListItem
                component={Link}
                href={`${hrefProp}/${code}`}
                variant="subtitle1"
                underline="none"
                onClick={() => handleSelect(code, name)}
                sx={({ typography, palette }) => ({
                  paddingLeft: typography.pxToRem(20),
                  color: palette.text.hint,
                })}
                key={code}
              >
                {name.toLowerCase()}
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
}

DropdownSearch.propTypes = {
  InputBaseProps: PropTypes.shape({}),
  label: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.elementType,
  locations: PropTypes.arrayOf(PropTypes.shape({})),
  variant: PropTypes.string,
  placeholder: PropTypes.string,
};

export default DropdownSearch;
