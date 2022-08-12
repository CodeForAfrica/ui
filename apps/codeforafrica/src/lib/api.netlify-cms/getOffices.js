import { join } from "path";

import getCollectionData from "./getCollectionData";

const officesDir = join(process.cwd(), "content/offices");

export default function getOffices(fields) {
  const offices = getCollectionData(officesDir, fields);
  return offices.map((office) => {
    return {
      map: {
        center: {
          lat: JSON.parse(office.map.latitude),
          lng: JSON.parse(office.map.longitude),
        },
        position: {
          lat: JSON.parse(office.map.latitude),
          lng: JSON.parse(office.map.longitude),
        },
      },
      address: office.content,
      title: office.name,
    };
  });
}
