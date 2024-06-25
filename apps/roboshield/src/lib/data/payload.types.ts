interface TextNode {
  children: TextNode | null;
  text?: string;
}

interface BreadCrumbs {
  doc: string;
  url: string;
  label: string;
  id: string;
}

interface Document {
  id: string;
  title: string;
  fullTitle: string;
  slug: string;
  blocks: any[];
  meta: any;
  breadcrumbs: BreadCrumbs[];
  createdAt: string;
  updatedAt: string;
}

interface Link {
  label: string;
  linkType: string;
  doc: {
    value: Document;
  };
  relationTo: string;
}

interface SocialMediaLink {
  platform: string;
  url: string;
  id: string;
}

interface StayInTouchData {
  title: string;
  links: SocialMediaLink[];
}

export interface MediaData {
  id: string;
  alt?: string | null;
  prefix: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  createdAt: string;
  updatedAt: string;
  url: string | null;
  src: string | null;
}

export interface Partner {
  logo: MediaData;
  name: string;
  url: string;
}
export interface Settings {
  title: string;
  description: TextNode;
  connect: StayInTouchData;
  primaryLogo: MediaData;
  secondaryLogo: MediaData;
  primaryNavigation: {
    menus: Link[];
    connect: string;
  };
  secondaryNavigation: {
    menus: Link[];
  };
  newsletter: {
    title: string;
    embedCode: string;
  };
  partners: Partner[];
  partnerHeaderTitle: string;
}

export interface CollectionQuery {
  collection: string;
  depth: number;
  page: number;
  limit: number;
  pagination: boolean;
  where: Record<string, any>;
  sort: string;
  locale: string;
  fallbackLocale: boolean | string;
  user: string;
  overrideAccess: boolean;
  showHiddenFields: boolean;
}

export interface Api {
  createCollection: (...args: any) => Promise<any>;
  deleteCollection: (...args: any) => Promise<any>;
  findGlobal: (...args: any) => Promise<any>;
  findPage: (...args: any) => Promise<any>;
  getCollection: (...args: any) => Promise<any>;
  updateCollection: (...args: any) => Promise<any>;
}
