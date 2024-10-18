export default async function canAccessApplication(req, searchString) {
  const { user, headers } = req;

  if (user) {
    const app = headers["CS-App"] || user.currentApp || user.defaultApp;
    return app === searchString.toLowerCase() && user.allowedApps.includes(app);
  }
  return false;
}
