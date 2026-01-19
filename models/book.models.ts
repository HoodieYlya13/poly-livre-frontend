export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  favorite: boolean;
  styles: string[];
  rating: number;
  price: number;
  owner: string;
  createdAt: Date;
  updatedAt: Date;
}