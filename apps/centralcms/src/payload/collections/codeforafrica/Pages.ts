import ContactForm from '@/payload/blocks/codeforafrica/ContactForm'
import CustomPageHeader from '@/payload/blocks/codeforafrica/CustomPageHeader'
import Error from '@/payload/blocks/codeforafrica/Error'
import FeaturedStories from '@/payload/blocks/codeforafrica/FeaturedStories'
import FeaturedWork from '@/payload/blocks/codeforafrica/FeaturedWork'
import GetInTouch from '@/payload/blocks/codeforafrica/GetInTouch'
import GetInvolved from '@/payload/blocks/codeforafrica/GetInvolved'
import GuidingPrinciples from '@/payload/blocks/codeforafrica/GuidingPrinciples'
import Hero from '@/payload/blocks/codeforafrica/Hero'
import JoinOurSlack from '@/payload/blocks/codeforafrica/JoinOurSlack'
import LongForm from '@/payload/blocks/codeforafrica/LongForm'
import MeetOurTeam from '@/payload/blocks/codeforafrica/MeetOurTeam'
import OurImpact from '@/payload/blocks/codeforafrica/OurImpact'
import OurMission from '@/payload/blocks/codeforafrica/OurMission'
import OurOffices from '@/payload/blocks/codeforafrica/OurOffices'
import OurPartners from '@/payload/blocks/codeforafrica/OurPartners'
import OurTeam from '@/payload/blocks/codeforafrica/OurTeam'
import OurWork from '@/payload/blocks/codeforafrica/OurWork'
import PageHeader from '@/payload/blocks/codeforafrica/PageHeader'
import Posts from '@/payload/blocks/codeforafrica/Posts'
import slug from '@/payload/fields/slug'
import formatDraftUrl from '@/payload/utilities/formatDraftUrl'
import { CollectionConfig } from 'node_modules/payload/dist/collections/config/types'
import { canRead } from '@/payload/access/codeforafrica'

const Pages: CollectionConfig = {
  slug: 'CodeForAfricaPages',
  access: {
    read: canRead,
    create: () => true,
    update: () => true,
  },
  labels: {
    singular: 'Page',
    plural: 'Pages',
  },
  admin: {
    defaultColumns: ['fullTitle', 'updatedAt'],
    group: 'Publications',
    preview: (doc, options) => formatDraftUrl('pages', doc, options),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    //fullTitle({ overrides: { localized: true } }),
    slug(),
    {
      name: 'blocks',
      type: 'blocks',
      // Generally sort blocks alphabetically but keep related blocks next to
      // each other e.g. while alphabecially CustomPageHeader should be with C,
      // it's functiaonally equivalent with PageHeader so we keep it next to
      // PageHeader
      blocks: [
        ContactForm,
        Error,
        FeaturedWork,
        FeaturedStories,
        GetInTouch,
        GetInvolved,
        GuidingPrinciples,
        Hero,
        JoinOurSlack,
        MeetOurTeam,
        PageHeader,
        Posts,
        CustomPageHeader,
        LongForm,
        OurOffices,
        OurImpact,
        OurMission,
        OurPartners,
        OurTeam,
        OurWork,
      ],
      localized: true,
      admin: {
        initCollapsed: true,
      },
    },
  ],
  versions: {
    drafts: true,
  },
}

export default Pages
