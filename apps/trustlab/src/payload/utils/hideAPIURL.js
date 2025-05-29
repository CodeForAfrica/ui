import { site } from "@/trustlab/utils";

const hideAPIURL = site.environment === "production";

export default hideAPIURL;
