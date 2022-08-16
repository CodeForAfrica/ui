import { join } from "path";

import getCollectionData from "./getCollectionData";

const officesDir = join(process.cwd(), "content/offices");

export default function getOffices(fields) {
  const offices = getCollectionData(officesDir, fields);
  return offices.map((office) => {
    const lat = office.location.latitude;
    const lng = office.location.longitude;
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
      content: office.content,
      title: office.name,
    };
  });
}
