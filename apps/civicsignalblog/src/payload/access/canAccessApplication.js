export default function canAccessApplication(user, searchString) {
  if (user) {
    const app = user.currentApp || user.defaultApp;
    return app === searchString.toLowerCase();
  }
  return false;
}
