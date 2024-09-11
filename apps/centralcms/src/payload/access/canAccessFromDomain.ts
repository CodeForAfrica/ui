import { User } from '@/payload-types'
import { isSuperAdmin } from '@/payload/utilities/isSuperAdmin'

export default function canAccessFromDomain(user: User | null, searchString: string): boolean {
  if (user) {
    if (
      user.lastLoggedInTenant &&
      typeof user.lastLoggedInTenant === 'object' &&
      'name' in user.lastLoggedInTenant
    ) {
      return user?.lastLoggedInTenant.name.toLowerCase() === searchString.toLowerCase()
    } else {
      if (isSuperAdmin(user)) {
        return false
      }
    }
  }
  return false
}
