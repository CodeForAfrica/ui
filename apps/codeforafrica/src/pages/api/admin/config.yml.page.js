import yaml from "js-yaml";

import config from "./config.json";

import site from "@/codeforafrica/utils/site";

config.logoUrl = site.logoUrl;

export default function handler(req, res) {
  if (req.method === "GET") {
    if (process.env.NODE_ENV === "production") {
      // Set production configurations
      config.backend.name = "github";
      config.backend.repo = process.env.GITHUB_BACKEND_REPO;
      config.backend.base_url = site.url.replace(/\/+$/, "");
      config.backend.auth_endpoint = process.env.GITHUB_AUTH_ENDPOINT;
      config.publish_mode = "editorial_workflow";
      // Remove dev configurations
      config.local_backend = undefined;
    }
    const configFile = yaml.dump(config);

    res.setHeader("Content-Type", "text/yaml");
    res.setHeader("Content-Disposition", "attachment; filename=config.yml");
    res.send(configFile);
  }

  return res.status(405).end();
}
