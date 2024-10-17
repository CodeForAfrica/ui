export default async function canAccessApplication(req, searchString) {
  const { user, headers } = req;

  if (user) {
    const currentApp = headers["x-current-app"] || user.currentApp;
    const app = currentApp || user.defaultApp;
    return app === searchString.toLowerCase() && user.allowedApps.includes(app);
  }
  return false;
}
