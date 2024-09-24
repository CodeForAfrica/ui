export default function canAccessApplication(user, searchString) {
  if (user) {
    const app = user.currentApp || user.defaultApp;
    if (app) {
      return app === searchString.toLowerCase();
    }
    return false;
  }
  return false;
}
