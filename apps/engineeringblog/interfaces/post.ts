import { Author } from "./author";
import { TAG } from "@/lib/constants/tag";

export interface Post {
  title: string;
  description: string;
  excerpt: string;
  previewImage: string;
  publishingDate: string;
  authors: Array<Author>;
  categories: Set<typeof TAG>;
}
