import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import dynamic from "next/dynamic";

import config from "@/promisetracker/config";

const MapIt = dynamic(() => import("@hurumap-ui/core/MapIt"), {
  ssr: false,
});

const useStyles = makeStyles(({ typography, breakpoints }) => ({
  root: {
    alignItems: "center",
    display: "flex",
    marginBottom: "2rem",
  },

  radar: {
    width: "100%",
    objectFit: "cover",
    height: typography.pxToRem(256),
    [breakpoints.up("lg")]: {
      width: typography.pxToRem(256),
    },
  },
}));

function Radar(props) {
  const classes = useStyles({ ...props });
  const [tileLayer, setTileLayer] = useState();
  const { MAPIT_URL } = config;
  useEffect(() => {
    import("leaflet").then((leaflet) => {
      setTileLayer(
        leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
      );
    });
  }, []);

  return (
    <div className={classes.root}>
      <MapIt
        height="238.5px"
        width="100%"
        url={MAPIT_URL}
        zoom={4}
        tolerance={0.001}
        tileLayer={tileLayer}
        latLng={[-1.28333, 36.81667]}
        center={[8.7832, 34.5085]}
        drawProfile
        drawChildren
        codeType="KEN"
        geoLevel="country"
        geoCode="KE"
        geoLayerBlurStyle={{
          color: "black",
          fillColor: "transparent",
          weight: 1,
          opacity: 0.3,
          fillOpacity: 0.5,
        }}
        {...props}
      />
    </div>
  );
}

export default Radar;
