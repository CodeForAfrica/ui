import authorizationUri from "./auth";

// Initial page redirecting to Github
export default async (req, res) => {
  res.writeHead(302, { Location: authorizationUri });
  res.end();
};
