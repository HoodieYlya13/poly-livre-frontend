import { LocaleLanguages } from "@/i18n/utils";

export interface User {
  email: string;
  userId: string;
  username: string;
  expiresIn: number;
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

export interface Testimonial {
  testimonialId: string;
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  status: Status;
  rating: number;
  comment: string;
  language: LocaleLanguages;
  createdAt: string;
}

export type Status = "STUDENT" | "TEACHER" | "WORKER" | "OTHER";
