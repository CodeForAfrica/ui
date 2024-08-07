import { Author } from "./author";
import { TAG } from "@/lib/constants/tag";
import ImageMetadata from "./image-metadata";

export interface Post {
  title: string;
  description: string;
  excerpt: string;
  previewImage: ImageMetadata;
  publishingDate: string;
  authors: Array<Author>;
  tags: Set<string>;
}
