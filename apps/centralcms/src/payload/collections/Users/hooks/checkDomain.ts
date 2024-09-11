import { AuthenticationError, CollectionBeforeLoginHook } from 'payload'
import { CustomError } from './customError'
import { checkUserRoles } from '@/payload/utilities/checkUserRoles'

export const checkDomain: CollectionBeforeLoginHook = async ({
  req, // full express request
  user, // user being logged in
  req: { payload },
}) => {
  //get tenant details that belong to a specific domain
  const currentTenant = await payload.find({
    collection: 'tenants',
    where: {
      'domains.domain': {
        in: [req.headers.get('host')],
      },
    },
    depth: 0,
    limit: 1,
    req,
  })

  if (currentTenant.totalDocs === 0) {
    if (!checkUserRoles(['super-admin'], user)) {
      throw new CustomError('Only super admins can login via this domain')
    }
  } else {
    if (
      !user?.tenants.some((tenantDetails) => tenantDetails.tenant === currentTenant.docs[0]['id'])
    ) {
      throw new CustomError('This user is not authorized to login via this domain')
    }
  }

  return user
}
