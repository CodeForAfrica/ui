import { deepmerge } from "@mui/utils";

// Local drop-in replacement for @nouance/payload-better-fields-plugin's
// ColourTextField. The plugin's client Field component is built against an
// older @payloadcms/ui and crashes under the version this app runs
// ("Cannot destructure property 'config' of ... as it is undefined"), taking
// down the edit view of every block that renders a colour field. This emits a
// native text field rendered by our own ColourPicker client component (a colour
// swatch + hex input), so it uses the app's @payloadcms/ui instance and stays
// compatible. Validation/defaults are preserved via overrides.
const colourTextField = (overrides = {}) => {
  const field = deepmerge(
    {
      name: "colour",
      type: "text",
      admin: {
        description: "Color in hex format (e.g. #FFFFFF)",
        components: {
          Field: "@/trustlab/payload/components/ColourPicker",
        },
      },
    },
    overrides,
  );
  return [field];
};

export default colourTextField;
