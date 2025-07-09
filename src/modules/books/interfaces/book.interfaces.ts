export interface BookModel {
  id: string;
  title: string;
  author: string;
  isbn?: string | null;
  publishedYear: number;
}
