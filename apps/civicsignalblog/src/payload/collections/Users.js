import payload from "payload";

import applications from "../../lib/data/json/applications";
import { isAdmin, isAdminFieldLevel } from "../access/isAdmin";
import {
  isAdminOrSelf,
  isAdminOrSelfFieldLevel,
} from "../access/isAdminOrSelf";
import { ROLE_DEFAULT, ROLE_OPTIONS } from "../access/roles";

const Users = {
  slug: "users",
  access: {
    create: isAdmin,
    read: () => true,
    update: isAdminOrSelf,
    delete: isAdminOrSelf,
  },
  admin: {
    defaultColumns: ["firstName", "lastName", "email", "updatedAt"],
    enableRichTextLink: false,
    group: "Settings",
    useAsTitle: "email",
  },
  auth: {
    verify: true,
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "firstName",
          type: "text",
          required: true,
        },
        {
          name: "lastName",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "roles",
      type: "select",
      // Save this field to JWT so we can use from `req.user`
      saveToJWT: true,
      required: true,
      defaultValue: [ROLE_DEFAULT],
      hasMany: true,
      access: {
        read: isAdminOrSelfFieldLevel,
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      options: ROLE_OPTIONS,
    },
    {
      name: "defaultManagedApplication",
      type: "select",
      hasMany: false,
      admin: {
        isClearable: true,
        isSortable: true,
      },
      options: applications,
    },
    {
      name: "currentlyManagedApplication",
      type: "select",
      hasMany: false,
      admin: {
        isClearable: true,
        isSortable: true,
      },
      options: applications,
    },
  ],
  endpoints: [
    {
      path: "/current-managed-app",
      method: "get",
      handler: async (req, res) => {
        const userId = req.user.id;
        const currentUser = await payload.findByID({
          collection: "users",
          id: userId,
        });

        const currentApplication =
          currentUser.currentlyManagedApplication ||
          currentUser.defaultManagedApplication;

        if (currentUser) {
          res.status(200).send({ currentApplication });
        } else {
          res.status(404).send({ error: "User not found" });
        }
      },
    },
    {
      path: "/update-current-managed-app",
      method: "get",
      handler: async (req, res) => {
        const userId = req.user.id;
        const { newApplication } = req.query;

        const currentUser = await payload.findByID({
          collection: "users",
          id: userId,
          showHiddenFields: true,
        });

        if (!currentUser) {
          return res.status(404).send({ error: "User not found" });
        }

        const updatedUser = await payload.update({
          collection: "users",
          id: userId,
          data: {
            currentlyManagedApplication:
              newApplication || currentUser.defaultManagedApplication,
          },
        });
        return res.status(200).send({
          message: "Application updated successfully",
          currentlyManagedApplication: updatedUser.currentlyManagedApplication,
        });
      },
    },
  ],
};

export default Users;
