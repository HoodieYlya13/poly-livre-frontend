import { LocaleLanguages, LocaleLanguagesUpperCase } from "@/i18n/utils";
import { Status, User } from "./user.models";

export interface Book {
  id: string;
  title: string;
  description: string;
  author: string;
  cover: string;
  favorite?: boolean;
  styles: string[];
  rating?: number;
  reviews?: BookReview[];
  price: number;
  owner: User;
  information: Information;
  loanDuration: number;
  loaned?: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export interface AddBookFormValues
  extends Omit<
    Book,
    "id" | "createdAt" | "updatedAt" | "owner" | "cover" | "reviews"
  > {
  // cover: FileList;
  ownerId: string;
}

export interface BookReview {
  reviewId: string;
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  status: Status;
  bookId: string;
  rating: number;
  comment: string;
  language: LocaleLanguages;
  createdAt: string;
}

interface Information {
  pages: number;
  year: number;
  language: LocaleLanguagesUpperCase;
  delivery: Delivery;
}

export type Delivery = "FREE" | "PAID";
