import yaml from "js-yaml";

import config from "./config";

import site from "@/codeforafrica/utils/site";

export default function handler(req, res) {
  if (req.method === "GET") {
    if (process.env.NODE_ENV === "production") {
      // Set production configurations
      config.backend.name = "github";
      config.backend.repo = process.env.GITHUB_BACKEND_REPO;
      config.backend.base_url = site.environmentUrl.replace(/\/+$/, "");
      // Remove dev configurations
      config.local_backend = undefined;
    }
    config.logo_url = site.logoUrl;
    const configFile = yaml.dump(config);

    res.setHeader("Content-Type", "text/yaml");
    res.setHeader("Content-Disposition", "attachment; filename=config.yml");
    res.send(configFile);
  }

  return res.status(405).end();
}
