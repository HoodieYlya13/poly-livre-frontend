import { LocaleLanguages } from "@/i18n/utils";

export interface UserSession {
  userId: string;
  username: string;
  email: string;
  expiresIn: number;
}

export interface User {
  userId: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  bookIds: string[];
  reviewIds: string[];
  testimonialIds: string[];
  favoriteIds: string[];
  loanedBookIds: string[];
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
