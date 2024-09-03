import Layout1 from "@/climatemappedafrica/assets/icons/layout.svg";
import Layout2 from "@/climatemappedafrica/assets/icons/layout2.svg";
import logo from "@/climatemappedafrica/assets/logos/climateMapped.png";

export const navigationArgs = {
  desktopLogoProps: {
    width: 200,
    height: 80,
    alt: "desktop logo",
    href: "https://codeforafrica.org",
    src: logo,
  },

  mobileLogoProps: {
    width: 180,
    height: 70,
    alt: "mobile logo",
    href: "https://codeforafrica.org",
    src: logo,
  },
};

export const hurumapArgs = {
  pinAndCompare: {
    helperText: "Pin and compare",
    placeholder: "Select a location",
    options: ["Municipality", "Municipality One", "Municipality Two"],
  },
  indicatorTitle: {
    download: {
      values: ["Percentage", "Value"],
      layouts: [Layout1, Layout2],
      imageTypes: ["PNG", "SVG"],
      fileTypes: ["CSV", "XLSX", "JSON"],
    },
  },
  chartFormatting: {
    percentage: ".0%",
    value: ",.0f",
  },
};

export const hurumap = {
  api: {
    url: "http://localhost:8000/api/v1/",
  },
  formatting: {
    decimal: ",.1f",
    integer: ",.2d",
    percentage: ".1%",
  },
};

// https://vega.github.io/vega/docs/api/view/#view_toImageURL
const IMAGE_SCALE_FACTOR = 2;

const config = {
  images: {
    scaleFactor:
      process.env.NEXT_PUBLIC_IMAGE_SCALE_FACTOR || IMAGE_SCALE_FACTOR,
  },
  navigationArgs,
  url: "http://localhost:3000",
};

export default config;
