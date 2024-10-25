import { deepmerge } from "@mui/utils";

function document({ overrides = undefined } = {}) {
  const documentResult = {
    name: "document",
    type: "upload",
    relationTo: "media",
    filterOptions: {
      mimeType: { contains: "application/pdf" }, // Restricts to PDF files
    },
    admin: {
      description: "Upload PDF files only",
    },
  };

  return deepmerge(documentResult, overrides);
}

export default document;
