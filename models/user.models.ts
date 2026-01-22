import { LocaleLanguages } from "@/i18n/utils";

export interface User {
  id: string;
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
  id: string;
  user: User;
  rating: number;
  comment: string;
  language?: LocaleLanguages;
  createdAt?: string;
}

export type Status = "STUDENT" | "TEACHER" | "WORKER" | "OTHER";
