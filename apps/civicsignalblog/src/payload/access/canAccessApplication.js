export default function canAccessApplication(user, searchString) {
  // We are using this condition to only control what a user can see at a given time
  if (user) {
    const app = user.currentApp || user.defaultApp;
    return app === searchString.toLowerCase();
  }
  // For APIs coming from external apps we are not going to use any restriction in reading
  return true;
}
