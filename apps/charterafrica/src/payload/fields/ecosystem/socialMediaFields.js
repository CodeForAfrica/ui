import airtableColumnSelect from "./airtableColumnSelect";

function socialMediaColumns({ tableField, schema }) {
  return {
    label: "Social Media",
    type: "group",
    name: "socialMediaColumns",
    fields: [
      airtableColumnSelect({
        schema,
        tableField,
        overrides: {
          name: "twitter",
          label: "Twitter",
        },
      }),
      airtableColumnSelect({
        schema,
        tableField,
        overrides: {
          name: "tiktok",
          label: "Tiktok",
        },
      }),
      airtableColumnSelect({
        schema,
        tableField,
        overrides: {
          name: "facebook",
          label: "Facebook",
        },
      }),
      airtableColumnSelect({
        schema,
        tableField,
        overrides: {
          name: "linkedIn",
          label: "Linkedin",
        },
      }),
      airtableColumnSelect({
        schema,
        tableField,
        overrides: {
          name: "instagram",
          label: "Instagram",
        },
      }),
      airtableColumnSelect({
        schema,
        tableField,
        overrides: {
          name: "youtube",
          label: "Youtube",
        },
      }),
      airtableColumnSelect({
        schema,
        tableField,
        overrides: {
          name: "telegram",
          label: "Telegram",
        },
      }),
      airtableColumnSelect({
        schema,
        tableField,
        overrides: {
          name: "discord",
          label: "Discord",
        },
      }),
      airtableColumnSelect({
        schema,
        tableField,
        overrides: {
          name: "whatsapp",
          label: "Whatsapp",
        },
      }),
    ],
    admin: {
      hideGutter: true,
    },
  };
}

export default socialMediaColumns;
