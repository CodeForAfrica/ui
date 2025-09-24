import payload from "payload";

import {
  isAdmin,
  isAdminFieldLevel,
} from "#civicsignalblog/payload/access/isAdmin";
import {
  isAdminOrSelf,
  isAdminOrSelfFieldLevel,
} from "#civicsignalblog/payload/access/isAdminOrSelf";
import {
  ROLE_DEFAULT,
  ROLE_OPTIONS,
} from "#civicsignalblog/payload/access/roles";
import CurrentAppSelectField from "#civicsignalblog/payload/fields/customSelect/currentApp";
import DefaultAppSelectField from "#civicsignalblog/payload/fields/customSelect/defaultApp";
import applications, {
  RESEARCH,
} from "#civicsignalblog/payload/lib/data/common/applications";

const Users = {
  slug: "users",
  access: {
    create: isAdmin,
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
    useAPIKey: true,
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
    DefaultAppSelectField,
    CurrentAppSelectField,
    {
      name: "allowedApps",
      defaultValue: RESEARCH,
      type: "select",
      hasMany: true,
      admin: {
        isClearable: true,
      },
      options: applications,
    },
  ],
  endpoints: [
    {
      path: "/apps/current",
      method: "patch",
      handler: async (req, res) => {
        if (!req.user) {
          res.status(401).send({
            error: "You need to be authenticated to perform this action",
          });
        }

        const { selectedApp } = req.body;
        if (!selectedApp) {
          res.status(400).send({
            error: `Incorrect message format was received:${JSON.stringify(req.body)}`,
          });
        }

        const userId = req.user.id;
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
            currentApp: selectedApp || currentUser.defaultApp,
          },
        });
        res.status(200).send({
          message: "Application updated successfully",
          currentApp: updatedUser.currentApp,
        });
      },
    },
  ],
};

export default Users;
