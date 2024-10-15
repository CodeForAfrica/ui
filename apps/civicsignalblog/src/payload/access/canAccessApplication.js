import { ROLE_APP } from "./roles";

export default function canAccessApplication(user, searchString) {
  // We are using this condition to only control what a user can see at a given time
  if (user) {
    const app = user.currentApp || user.defaultApp;
    // The assumption is that one account with ROLE_APP will be used to access all the app content
    return app === searchString.toLowerCase() || user.roles.includes(ROLE_APP);
  }
  return false;
}
