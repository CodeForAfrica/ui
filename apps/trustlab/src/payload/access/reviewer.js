/* eslint-disable import/prefer-default-export */

import { checkRole } from "./checkRole";
import { ROLE_REVIEWER } from "./roles";

export const reviewer = (user) => checkRole([ROLE_REVIEWER], user);
