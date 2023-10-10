function ourOffices(block) {
  const { offices } = block;
  const addresses =
    offices?.map((item) => {
      let location = null;
      if (item?.location?.length) {
        location = {
          lng: item?.location?.[0],
          lat: item?.location?.[1],
        };
      }
      return {
        ...item,
        position: location,
        center: location,
      };
    }) ?? null;
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
