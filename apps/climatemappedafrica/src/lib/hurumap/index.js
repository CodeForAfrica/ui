import defaultIcon from "@/climatemappedafrica/assets/icons/eye-white.svg";
import fetchJson from "@/climatemappedafrica/utils/fetchJson";
import formatNumericalValue from "@/climatemappedafrica/utils/formatNumericalValue";

export async function fetchProfile({ BASE_URL, profileId }) {
  const { configuration } = await fetchJson(
    new URL(`/api/v1/profiles/${profileId}/?format=json`, BASE_URL),
  );

  const locations = configuration?.featured_locations?.map(
    ({ name, code, level, count = null }) => {
      return { name, level, code: code.toLowerCase(), count };
    },
  );

  return {
    locations,
    preferredChildren: configuration.preferred_children,
    mapType: configuration?.map_type ?? "default",
    choropleth: configuration?.choropleth ?? null,
  };
}

export async function fetchProfiles(BASE_URL) {
  const { results } = await fetchJson(new URL("/api/v1/profiles", BASE_URL));
  const profiles = results.map(({ name, id }) => ({ name, id }));
  return profiles;
}

function formatProfileGeographyData(data, parent) {
  if (!data) {
    return null;
  }
  return Object.keys(data)
    .map((label) => {
      return {
        title: label,
        icon: data[label].icon ?? defaultIcon,
        description: data[label].description,
        children: Object.keys(data[label]?.subcategories)
          .map((child) => {
            return {
              title: child,
              description: data[label]?.subcategories[child].description,
              children: Object.keys(
                data[label]?.subcategories[child]?.indicators ?? [],
              )
                .map((indicator) => {
                  return {
                    index: `${indicator}-${data[label]?.subcategories[child]?.indicators[indicator]?.id}`,
                    title: indicator,
                    indicator: {
                      ...data[label]?.subcategories?.[child]?.indicators?.[
                        indicator
                      ],
                      parentData: parent.data
                        ? (parent?.data?.[label]?.subcategories?.[child]
                            ?.indicators?.[indicator]?.data ?? null)
                        : null,
                      parentName: parent?.name ?? null,
                    },
                  };
                })
                .filter((indic) => indic.indicator?.data),
              metrics: (
                data[label]?.subcategories[child]?.key_metrics ?? []
              ).map((m, index) => {
                return {
                  ...m,
                  parentName: parent?.name ?? null,
                  parentMetric:
                    parent.data &&
                    parent?.data[label]?.subcategories[child]?.key_metrics
                      ? (parent?.data[label]?.subcategories[child]?.key_metrics[
                          index
                        ] ?? null)
                      : null,
                };
              }),
            };
          })
          .filter(
            (subcategory) =>
              subcategory.children.length || subcategory.metrics.length,
          ),
      };
    })
    .filter((category) => category.children.length);
}

export async function fetchProfileGeography(
  geoCode,
  { BASE_URL, profileId, version = "Climate" },
) {
  // HURUmap codes are uppercased in the API
  const json = await fetchJson(
    new URL(
      `/api/v1/all_details/profile/${profileId}/geography/${geoCode.toUpperCase()}/?version=${version}`,
      BASE_URL,
    ),
  );
  const { boundary, children, parent_layers: parents } = json;
  const geometries = { boundary, children, parents };
  const {
    profile_data: data,
    highlights: originalHighlights,
    overview,
    geography,
  } = json.profile;
  const highlights = originalHighlights.map(
    ({
      label,
      method,
      value,
      value_display_format: valueDisplayFormat,
      ...other
    }) => ({
      ...other,
      formattedValue: formatNumericalValue({
        value,
        method: valueDisplayFormat ?? method,
      }),
      displayFormat: valueDisplayFormat,
      method,
      value,
      title: label,
    }),
  );
  const tags = geography.parents
    .concat(geography)
    .map(({ code, level, name }) => ({
      code,
      level,
      name,
    }));

  const parent = {};
  const { code: parentCode, name } =
    geography.parents[geography.parents.length - 1] || {};

  if (parentCode) {
    const parentJson = await fetchJson(
      new URL(
        `/api/v1/all_details/profile/${profileId}/geography/${parentCode.toUpperCase()}/?version=${version}`,
        BASE_URL,
      ),
    );
    parent.data = parentJson.profile.profile_data;
    parent.name = name;
  }

  return {
    data,
    geography,
    geometries,
    highlights,
    tags,
    overview,
    parent,
    items: formatProfileGeographyData(data, parent),
  };
}
