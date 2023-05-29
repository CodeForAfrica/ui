import { Box } from "@mui/material";
import Script from "next/script";
import React from "react";

const Infographic = React.forwardRef(function Infographic(props, ref) {
  const {
    countriesFile: countriesFileProp,
    dataFile: dataFileProp,
    infographicId: id,
    sx,
    url,
  } = props;

  if (!(id && url)) {
    return null;
  }
  const countriesFile =
    countriesFileProp?.url ??
    countriesFileProp ??
    `${url}/infographic/data/countries.json`;
  const dataFile =
    dataFileProp?.url ?? dataFileProp ?? `${url}/infographic/data/data.json`;
  return (
    <>
      <Box id={id} sx={sx} ref={ref} />
      <Script id={`show-${id}`}>
        {`
            window.infographicIframeLocation = '${url}/infographic/embed.html';
            window.data_file = '${dataFile}';
            window.data_country_file = '${countriesFile}';
            var s = document.createElement('script');
            var n = document.getElementsByTagName('script')[0];
            s.async = 1;
            s.src = '${url}/infographic/static/js/bundle.js?v2023-05-19_1149';
            n.parentNode.insertBefore(s, n);
        `}
      </Script>
    </>
  );
});

export default Infographic;
