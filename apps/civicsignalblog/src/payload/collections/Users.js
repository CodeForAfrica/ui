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
        if (!req.user) {
          res.status(401).send({
            error: "You need to be authenticated to perform this action",
          });
        }

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
          res
            .status(404)
            .send({ error: "User with specified ID was not found" });
        }
      },
    },
    {
      path: "/update-current-managed-app",
      method: "patch",
      handler: async (req, res) => {
        if (!req.user) {
          res.status(401).send({
            error: "You need to be authenticated to perform this action",
          });
        }

        const userId = req.user.id;

        const { selectedApp } = req.body;

        if (!selectedApp) {
          res.status(400).send({
            error: `Incorrect message format was received:${JSON.stringify(req.body)}`,
          });
        }

        const currentUser = await payload.findByID({
          collection: "users",
          id: userId,
          showHiddenFields: true,
        });

        if (!currentUser) {
          res
            .status(404)
            .send({ error: "User with specified ID was not found" });
        }

        const updatedUser = await payload.update({
          collection: "users",
          id: userId,
          data: {
            currentlyManagedApplication:
              selectedApp || currentUser.defaultManagedApplication,
          },
        });

        res.status(200).send({
          message: "Application updated successfully",
          currentlyManagedApplication: updatedUser.currentlyManagedApplication,
        });
      },
    },
  ],
};

export default Users;
