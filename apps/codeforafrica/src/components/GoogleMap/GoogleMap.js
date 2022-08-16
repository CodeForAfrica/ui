import { Wrapper } from "@googlemaps/react-wrapper";
import React from "react";

import Map from "./Map";
import Marker from "./Marker";

import icon from "@/codeforafrica/assets/icons/Type=map-pin, Size=64, Color=Primary.svg";

function GoogleMap({ apiKey, position, render, ...props }) {
  return (
    <Wrapper apiKey={apiKey} render={render}>
      <Map {...props}>
        <Marker icon={icon} position={position} title="Boom" />
      </Map>
    </Wrapper>
  );
}

export default GoogleMap;
