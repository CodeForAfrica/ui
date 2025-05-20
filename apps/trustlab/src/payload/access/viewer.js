/* eslint-disable import/prefer-default-export */

import { checkRole } from "./checkRole";
import { ROLE_VIEWER } from "./roles";

export const viewer = (user) => checkRole([ROLE_VIEWER], user);
