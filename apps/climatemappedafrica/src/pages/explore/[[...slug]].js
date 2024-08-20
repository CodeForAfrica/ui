import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React from "react";

import ExplorePage from "@/climatemappedafrica/components/ExplorePage";
import Tutorial from "@/climatemappedafrica/components/HURUmap/Tutorial";
import Page from "@/climatemappedafrica/components/Page";
import {
  fetchProfile,
  fetchProfileGeography,
} from "@/climatemappedafrica/lib/hurumap";

export default function Explore(props) {
  const {
    blocks: { tutorial, panel },
  } = props;
  const {
    query: { showTutorial },
  } = useRouter();

  return (
    <Tutorial
      key={showTutorial}
      {...tutorial}
      defaultOpen={Number.parseInt(showTutorial, 10) === 1}
    >
      <Page {...props}>
        <ExplorePage panelProps={panel} {...props} />
      </Page>
    </Tutorial>
  );
}

Explore.propTypes = {
  blocks: PropTypes.shape({
    panel: PropTypes.shape({}),
    tutorial: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  }),
};

Explore.defaultProps = {
  blocks: undefined,
};

export async function getStaticPaths() {
  const { locations } = await fetchProfile();
  const paths = locations.map(({ code: locationCode }) => ({
    params: { slug: [locationCode] },
  }));

  // only first location to save on build time
  const [firstLocation] = paths;

  return {
    paths: [firstLocation],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const props = {};
  const revalidate = true;

  // TODO: This info was being fetched from the Wordpress CMS, and is necessary for the ExplorePage to render correctly.
  const blocks = {
    texts: [],
    tutorial: {
      items: [
        {
          title: "SELECT LOCATION",
          description:
            "Select the County or Municipality you want to explore, by clicking on the search field and the dropdown menu.<br><br>Once you have made your selection, explore the visualisations, change location or pin to compare it to a second location.",
          selector: "#location-search",
          image:
            "https://cms.dev.codeforafrica.org/pesayetu/wp-content/uploads/sites/2/2022/04/PesaYetu-Tutorial-1.png",
          imageProps: {
            src: "https://cms.dev.codeforafrica.org/pesayetu/wp-content/uploads/sites/2/2022/04/PesaYetu-Tutorial-1.png",
            width: 694,
            height: 572,
            type: "png",
            blurDataURL:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMElEQVR4nGOoqW09f/7Shw8fzp07x8AuoC4qqdXf311YWMTAL6YVE5ve2tpcV18PAHqlETRE6fa/AAAAAElFTkSuQmCC",
            placeholder: "blur",
          },
        },
        {
          description:
            "Explore the map to confirm or change your selection. You can also pin your location if you want to compare two places. <br><br>Once a location is confirmed, click on the “Rich Data” button (on the left hand-side) to display the data visualisations.",
          title: "EXPLORE THE MAP",
          selector: "#none",
          image:
            "https://cms.dev.codeforafrica.org/pesayetu/wp-content/uploads/sites/2/2022/04/PesaYetu-Tutorial-2.png",
          imageProps: {
            src: "https://cms.dev.codeforafrica.org/pesayetu/wp-content/uploads/sites/2/2022/04/PesaYetu-Tutorial-2.png",
            width: 751,
            height: 589,
            type: "png",
            blurDataURL:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMElEQVR4nGP49u3rxEnTDxw4sn//fobCggJeYVU+YaWCvByGzMxMPmElWwfPgvw8AH1vD9GRbZHGAAAAAElFTkSuQmCC",
            placeholder: "blur",
          },
        },
        {
          title: "BROWSE THE CHARTS",
          description:
            "Continue to open the Rich Data dashboard, using the button on the left.<br><br>Browse the charts by scrolling the data dashboard. You can share and download the data using the buttons on the side of each chart.",
          selector: "#rich-data",
          image:
            "https://cms.dev.codeforafrica.org/pesayetu/wp-content/uploads/sites/2/2022/04/PesaYetu-Tutorial-3a.png",
          imageProps: {
            src: "https://cms.dev.codeforafrica.org/pesayetu/wp-content/uploads/sites/2/2022/04/PesaYetu-Tutorial-3a.png",
            width: 670,
            height: 439,
            type: "png",
            blurDataURL:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMklEQVR4nAEnANj/ANbW1s3NyVtbWrKyswDOztFdY38JCxe5ubcA3t7ffIKf4uPq////vgcX8ZIA2dgAAAAASUVORK5CYII=",
            placeholder: "blur",
          },
        },
        {
          title: "PIN AND COMPARE",
          description:
            "There are two ways to pin and compare a second location: <br><br>1) From the data dashboard: look for the “pin” icon and select a second location from the dropdown menu. <br><br>2) From the map: pin your selected location by clicking on the ”pin” icon, then select a second location, which will appear in a different colour.",
          selector: "#pin",
          image:
            "https://cms.dev.codeforafrica.org/pesayetu/wp-content/uploads/sites/2/2022/04/PesaYetu-Tutorial-4.png",
          imageProps: {
            src: "https://cms.dev.codeforafrica.org/pesayetu/wp-content/uploads/sites/2/2022/04/PesaYetu-Tutorial-4.png",
            width: 675,
            height: 491,
            type: "png",
            blurDataURL:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMklEQVR4nAEnANj/APj491lWYA8QI+zs6wC/wMHXzMmLi5uztLYAu7u7w8XF39/eu7u7x7oYwYnBuWcAAAAASUVORK5CYII=",
            placeholder: "blur",
          },
        },
      ],
      lazyblock: {
        slug: "lazyblock/tutorial",
      },
      align: "",
      anchor: "",
      blockId: "Z1npKaH",
      blockUniqueClass: "lazyblock-tutorial-Z1npKaH",
      ghostkitSpacings: "",
      ghostkitSR: "",
    },
    panel: {
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
    },
  };
  const { locations, preferredChildren, mapType } = await fetchProfile();
  const [originalCode] = params?.slug || [""];
  const code = originalCode.trim().toLowerCase();

  // /explore -> /explore/dj
  if (!code) {
    return {
      redirect: {
        destination: `/explore/af`,
        permanent: true,
      },
    };
  }

  // Allow for case-insensitive code or human-readable location names
  // appended to code e.g.:
  // KE => ke, 47/nairobi => 47, 47-vs-11/nairobi-vs-isiolo => 47-vs-11
  if (code !== originalCode || params?.slug?.length > 1) {
    return {
      redirect: {
        destination: `/explore/${code}`,
        permanent: true,
      },
    };
  }

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

  return {
    props: {
      ...props,
      blocks,
      locations,
      mapType,
      profile,
      variant: "explore",
      preferredChildren,
    },
    revalidate,
  };
}
