import dynamic from "next/dynamic";
import React from "react";

const LazyMap = dynamic(() => import("./LazyMap"), {
  ssr: false,
  loading: () => <div>loading...</div>,
});

function MapContainer(props) {
  return <LazyMap {...props} />;
}

export default MapContainer;
