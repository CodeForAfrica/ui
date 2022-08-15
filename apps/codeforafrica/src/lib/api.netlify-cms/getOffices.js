import { join } from "path";

import getCollectionData from "./getCollectionData";

const officesDir = join(process.cwd(), "content/offices");

export default function getOffices(fields) {
  const offices = getCollectionData(officesDir, fields);
  return offices.map((office) => {
    const lat = Number.parseFloat(office.location.latitude);
    const lng = Number.parseFloat(office.location.longitude);
    return {
      map: {
        center: {
          lat,
          lng,
        },
        position: {
          lat,
          lng,
        },
      },
      address: office.content,
      title: office.name,
    };
  });
}
