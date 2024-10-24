const apiUrl = process.env.PAYLOAD_PUBLIC_APP_URL;
const fetcher = (url) => fetch(url).then((res) => res.json());

const fetchProfile = async () => {
  const data = await fetcher(`${apiUrl}/api/hurumap/profiles`);
  return data;
};

const fetchProfileGeography = async (geoCode) => {
  const data = await fetcher(`${apiUrl}/api/hurumap/geographies/${geoCode}`);
  return data;
};

async function explorePage({ slugs }, _, __, hurumap) {
  const {
    initialLocation,
    page: { value },
  } = hurumap;
  const { name } = initialLocation;
  const code = slugs.length ? slugs[0] : name;
  const hurumapProfile = await fetchProfile();

  const { locations, preferredChildren, mapType, choropleth } = hurumapProfile;

  const locationCodes = locations.map(({ code: locationCode }) => locationCode);
  const geoCodes = code
    .split("-vs-")
    .map((c) => c.trim())
    .filter((c) => c);
  if (!geoCodes.every((gC) => locationCodes.includes(gC))) {
    return {
      notFound: true,
    };
  }

  const [primaryCode, secondaryCode] = geoCodes;
  const primaryProfile = await fetchProfileGeography(primaryCode);
  const profile = [primaryProfile];
  if (secondaryCode) {
    const secondaryProfile = await fetchProfileGeography(secondaryCode);
    profile.push(secondaryProfile);
  }

  // TODO: Move this to a PayloadCMS
  const panel = {
    panelItems: [
      {
        value: "rich-data",
        icon: "https://cms.dev.codeforafrica.org/pesayetu/wp-content/uploads/sites/2/2021/11/Group-4505.svg",
        iconProps: {
          src: "https://cms.dev.codeforafrica.org/pesayetu/wp-content/uploads/sites/2/2021/11/Group-4505.svg",
          width: 44,
          height: 44,
          type: "svg",
          blurDataURL:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGElEQVR4nGNgQAP/T///f/o/jHMWiQMHACIVCyeABSwfAAAAAElFTkSuQmCC",
          placeholder: "blur",
        },
      },
      {
        value: "pin",
        icon: "https://cms.dev.codeforafrica.org/pesayetu/wp-content/uploads/sites/2/2022/01/Path-210-1-1.svg",
        pin: true,
        iconProps: {
          src: "https://cms.dev.codeforafrica.org/pesayetu/wp-content/uploads/sites/2/2022/01/Path-210-1-1.svg",
          width: 44,
          height: 44,
          type: "svg",
          blurDataURL:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAH0lEQVR4nGNgQAP/L/z/f/r//4P/wZzT//+fBbOQAQBvnQ3r6iVM4QAAAABJRU5ErkJggg==",
          placeholder: "blur",
        },
      },
    ],
    scrollToTopLabel: "Back To Top",
    dataNotAvailable: "— DATA NOT AVAILABLE",
    lazyblock: {
      slug: "lazyblock/panel",
    },
    align: "",
    anchor: "",
    blockId: "20amuc",
    blockUniqueClass: "lazyblock-panel-20amuc",
    ghostkitSpacings: "",
    ghostkitSR: "",
  };
  const res = {
    id: "explore-page",
    blockType: "explore-page",
    choropleth,
    initialLocation,
    explorePagePath: value.slug,
    locations,
    mapType,
    panel,
    profile,
    variant: "explore",
    preferredChildren,
  };

  return res;
  // return {}
}

export default explorePage;
