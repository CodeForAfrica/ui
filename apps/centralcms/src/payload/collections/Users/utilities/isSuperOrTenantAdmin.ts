import type { PayloadRequest } from "payload";
import { isSuperAdmin } from "@/payload/utilities/isSuperAdmin";

const logs = false;

export const isSuperOrTenantAdmin = async (args: {
  req: PayloadRequest;
}): Promise<boolean> => {
  const {
    req,
    req: { user, payload },
  } = args;

  // always allow super admins through
  if (isSuperAdmin(user)) {
    return true;
  }

  if (logs) {
    const msg = `Finding tenant with host: '${req.headers.get('host')}'`;
    payload.logger.info({ msg });
  }

  // read `req.headers.host`, lookup the tenant by `domain` to ensure it exists, and check if the user is an admin of that tenant
  const foundTenants = await payload.find({
    collection: "tenants",
    where: {
      "domains.domain": {
        in: [req.headers.get('host')],
      },
    },
    depth: 0,
    limit: 1,
    req,
  });

  // if this tenant does not exist, deny access
  if (foundTenants.totalDocs === 0) {
    if (logs) {
      const msg = `No tenant found for ${req.headers.get('host')}`;
      payload.logger.info({ msg });
    }

    return false;
  }

  if (logs) {
    const msg = `Found tenant: '${foundTenants.docs?.[0]?.name}', checking if user is an tenant admin`;
    payload.logger.info({ msg });
  }

  // finally check if the user is an admin of this tenant
  const tenantWithUser = user?.tenants?.find(({ tenant: userTenant }) => {
    // Check if userTenant is a Tenant object or a string/number
    if (typeof userTenant === "object" && "id" in userTenant) {
      return userTenant.id === foundTenants.docs[0].id;
    }
    
    // Handle the case when userTenant is a string or number
    return typeof userTenant === "string" 
      ? userTenant === foundTenants.docs[0].id
      : typeof userTenant === "number"
      ? userTenant === foundTenants.docs[0].id
      : false;
  });

  if (tenantWithUser?.roles?.some((role) => role === "admin")) {
    if (logs) {
      const msg = `User is an admin of ${foundTenants.docs[0].name}, allowing access`;
      payload.logger.info({ msg });
    }

    return true;
  }

  if (logs) {
    const msg = `User is not an admin of ${foundTenants.docs[0].name}, denying access`;
    payload.logger.info({ msg });
  }

  return false;
};
