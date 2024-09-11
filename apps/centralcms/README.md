# Central CMS

This repo has contains source code for [Payload 3.0](https://github.com/payloadcms/payload) CMS for multiple full stack Applications. It borrows ideas from this [example](https://payloadcms.com/blog/how-to-build-a-multi-tenant-app-with-payload) the main difference is that this example is suited for a scenario where you are managing content of multiple instances of the same application while in our case we are managing content of multiple instances of different applications.

## Running the project in Development mode

To spin up the project locally, follow these steps:

1. First clone the repo
1. Then `cd YOUR_PROJECT_REPO && cp .env.example .env`
1. Next `pnpm install && pnpm run dev` (or `docker-compose up`, see [Docker](#docker))
1. Now `open http://localhost:3000/admin` to access the admin panel
1. Create your first super-admin user using the form on the page

That's it!

Next step see [Configuring Domains for your applications](#configuring-domains-for-your-applications)

### Docker

Alternatively, you can use [Docker](https://www.docker.com) to spin up this project locally. To do so, follow these steps:

1. Follow [steps 1 and 2 from above](#development), the docker-compose file will automatically use the `.env` file in your project root
1. Next run `docker-compose up`
1. Follow [steps 4 and 5 from above](#development) to login and create your first super-admin user

That's it! The Docker instance will help you get up and running quickly while also standardizing the development environment across your teams.

Next step see [Configuring Domains for your applications](#configuring-domains-for-your-applications)

## Production

To run Payload in production, you need to build and serve the Admin panel. To do so, follow these steps:

1. First invoke the `payload build` script by running `pnpm build` or `pnpm run build` in your project root. This creates a `./build` directory with a production-ready admin bundle.
1. Then run `pnpm start` to run Node in production and serve Payload from the `./build` directory.

Next step see [Configuring Domains for your applications](#configuring-domains-for-your-applications)

## Configuring Domains for your applications

After creating your Super-admin account you will need to create tenants (application instances) which will be tied to non super-admin user accounts. To do so, follow these steps:

1. Select `Tenants` from the side bar menu or dashboard.
1. Click `Create New`
1. Provide the Name, and Domain for your application.

Take Note:

- For local development, you may need to edit your `/etc/hosts` file to ensure that you have multiple domains see this [article](https://linuxize.com/post/how-to-edit-your-hosts-file/).
- The domain configured for a tenant is used for authentication and authorization services for this application.

- Therefore in this setup, non-super admin users will only be able to log in via a URL with a domain that has been configured for a tenant tied to their account i.e. If a user account is tied with Tenant A then the user account will only be able to log in via the allowed domains for Tenant A.
- A user account may be tied to more than one tenant, this allows a user to be authenticated using the same credentials for multiple applications.

- A user account may have different roles per each tenant tied to their account.

- A tenant may have more than one allowed domain, users will only be able to log in if they make login requests via a URL belonging to domains assigned to a tenant tied to their account.

- Upon authentication via a given URL, the user will only be able to see content and configurations belonging to a specific tenant belonging to the domain they have been authenticated from

- User accounts can be authenticated by using API keys, this is expected to be used for the Full-stack applications accessing content from the CMS, see [Authentication Config](https://payloadcms.com/docs/authentication/config).

## Development Approach

This section provides an overview of the approach and thought process behind the development of this application. It outlines the strategies, methodologies, and considerations that guided the overall development process. By understanding this approach, you can gain insight into the decisions made and the reasoning behind the design and implementation of the Multi-tenant application.

### Project folder structure

This application follow a standard convention in which each of the different configurations for a specific application e.g. collections, blocks, and fields will be enclosed in a folder structure following this convention:
`src/payload/<CONFIGURATION_TYPE>/<APP_NAME>/`

Two examples have been provided in this repository which are RoboShield and CodeforAfrica web applications. For example to store blocks under each application we can use the following paths:

- `src/payload/blocks/roboshield`

- `src/payload/blocks/codeforafrica`

Moreover, to store collections we can use:

- `src/payload/collections/roboshield`

- `src/payload/collections/codeforafrica`

This convention is expected to significantly reduce the time to migrate the multiple existing Payload instances to a single CMS instance and ensure that the code responsible for managing the content of a specific application is isolated, consequently improving maintainability. It should be noted that some of the configurations are shared across different applications and can be placed in a shared global folder to improve reusability, see the `src/payload/fields`

### User Authentication and Authorization

Custom logic has been implemented for authorization and authentication to meet this use case.

For authentication two custom hooks have been tied to the User collection namely:

- `checkDomain`: This hook is invoked `beforeLogin` It ensures that users with valid credentials (correct username and password) are also permitted to log in based on the domain from which they are accessing the application. This extra layer of security helps control access and enforces domain-specific login permissions.

- `recordLastLoggedInTenant`: This hook is invoked `afterLogin`. It records the id of the tenant a user has been authenticated with. This is further used in providing access control to ensure that a user only sees collections, blocks and other configurations belonging to the domain they have been authenticated with. Take note: Super-Admins will only be authenticated via

For authorization a custom function that is used in collection level `Access` function(s) named `canAccessFromDomain` has been implemented. The collection level Access has been tied to each collection which verifies if a user can view a given collection after being authenticated from a specific domain. The implementation of the function can be seen on `src/payload/access/<APP_NAME>`

An example of this implementation can be seen below:

```
import type { Access } from "payload";
import canAccessFromDomain from "@/payload/access/canAccessFromDomain"

export const canRead: Access = ({ req: { user } }) => {
   return canAccessFromDomain(user, "CodeforAfrica");
};

```

The `canRead` Access function is tied to each collection under a specific folder e.g. for the example to control access of Authors collection we can use the following code snippet:

```
import { canRead } from "@/payload/access/codeforafrica";

const Authors: CollectionConfig = {
  slug: "author",
  access: {
    read: canRead,
```
