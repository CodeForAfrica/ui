/* eslint-disable import/prefer-default-export */

import { checkRole } from "./checkRole";
import { ROLE_EDITOR } from "./roles";

export const editor = (user) => checkRole([ROLE_EDITOR], user);
