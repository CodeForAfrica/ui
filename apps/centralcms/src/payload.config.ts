// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import path from 'path'
import { buildConfig, GlobalConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { Users } from '@/payload/collections/Users'
import { Media } from '@/payload/collections/Media'
import { Tenants } from '@/payload/collections/Tenants'
import Pages from '@/payload/collections/codeforafrica/Pages'
import { Pages as RoboShieldPages } from '@/payload/collections/roboshield/Pages'
import Authors from './payload/collections/codeforafrica/Authors'
import GuidingPrinciples from '@/payload/collections/codeforafrica/GuidingPrinciples'
import Partners from '@/payload/collections/codeforafrica/Partners'
import Posts from '@/payload/collections/codeforafrica/Posts'
import Donors from '@/payload/collections/codeforafrica/Donors'
import Impact from '@/payload/collections/codeforafrica/Impact'
import Members from '@/payload/collections/codeforafrica/Members'
import Offices from '@/payload/collections/codeforafrica/Offices'
import Projects from '@/payload/collections/codeforafrica/Projects'
import Tags from '@/payload/collections/codeforafrica/Tags'
import Teams from '@/payload/collections/codeforafrica/Teams'
import CodeforAfricaGlobals from '@/payload/globals/CodeforAfricaGlobals'
import RoboShieldGlobals from '@/payload/globals/RoboShieldGlobals'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const DATABASE_URI: string =
  process.env.DATABASE_URI ??
  (() => {
    throw new Error('DATABASE_URI environment variable is not set')
  })()

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    Media,
    Tenants,
    Authors,
    Donors,
    GuidingPrinciples,
    Impact,
    Offices,
    Members,
    Partners,
    Projects,
    Posts,
    Tags,
    Teams,
    Pages,
    RoboShieldPages,
  ],
  editor: lexicalEditor(),
  globals: [CodeforAfricaGlobals, RoboShieldGlobals],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: DATABASE_URI,
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
    seoPlugin({}),
  ],
})
