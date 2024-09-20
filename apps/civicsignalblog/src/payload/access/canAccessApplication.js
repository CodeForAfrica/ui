export default function canAccessApplication(user, searchString) {
  if (user) {
    const managedApplication =
      user.currentlyManagedApplication || user.defaultManagedApplication;
    if (managedApplication) {
      return managedApplication === searchString.toLowerCase();
    }
    return false;
  }
  return false;
}
