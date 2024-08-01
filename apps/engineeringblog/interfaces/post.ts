import { Metadata } from 'next';
import { Author } from './author';

export interface Post extends Metadata {
  author: Array<Author>,
  excerpt: string,
}