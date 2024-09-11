import { Tenant } from "@/payload-types";

export function isTenant(obj: any): obj is Tenant {
    return obj && typeof obj === 'object' && 'id' in obj;
}
