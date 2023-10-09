function ourOffices(block) {
  const addresses = block.addresses.map((item) => ({
    ...item,
    position: {
      lng: item?.location?.[0],
      lat: item?.location?.[1],
    },
    center: {
      lng: item?.location?.[0],
      lat: item?.location?.[1],
    },
  }));
  return {
    ...block,
    slug: block.blockType,
    addresses,
    map: {
      apiKey: process.env.GOOGLE_API_KEY ?? null,
      zoom: 20,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
    },
  };
}

export default ourOffices;
