import yaml from "js-yaml";

import config from "./config";

import site from "@/codeforafrica/utils/site";

export default function handler(req, res) {
  if (req.method === "GET") {
    console.log("GET /api/admin/config", process.env);
    console.log("GET1 /api/admin/config", config);
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
    console.log("GET2 /api/admin/config", config);
    config.logo_url = site.logoUrl;
    const configFile = yaml.dump(config);

    res.setHeader("Content-Type", "text/yaml");
    res.setHeader("Content-Disposition", "attachment; filename=config.yml");
    res.send(configFile);
  }

  return res.status(405).end();
}
