import { Book, BookReview } from "@/models/book.models";
import { Testimonial, User, Status } from "@/models/user.models";
import { LocaleLanguages, LocaleLanguagesUpperCase } from "@/i18n/utils";

const USER_IDENTITIES = {
  user1: {
    userId: "1",
    username: "PDG",
    firstName: "Naheem",
    lastName: "Akaby",
    status: "STUDENT" as Status,
  },
  user2: {
    userId: "2",
    username: "RacistePrime",
    firstName: "Imed",
    lastName: "Zarour",
    status: "STUDENT" as Status,
  },
  user3: {
    userId: "3",
    username: "example",
    firstName: "John",
    lastName: "Doe",
    status: "TEACHER" as Status,
  },
};

const COMMON_DESCRIPTION =
  "Le roman suit les destins croisés de plusieurs personnages, mais se concentre principalement sur Jean Valjean, un ancien forçat condamné pour vol de pain qui devient un homme intègre, et sur l'inspecteur Javert, déterminé à le ramener à la justice.\nL'histoire se déroule dans la France du 19ème siècle, couvrant des événements historiques comme la révolution de 1832. À travers ces personnages et événements, Hugo explore des thèmes universels tels que la rédemption, l'amour, la misère et l'injustice sociale.";

const MOCKED_OWNER: User = {
  userId: "Mocked Owner",
  username: "Mocked Owner",
  email: "Mocked Owner",
  firstName: "Mocked Owner",
  lastName: "Mocked Owner",
  status: "WORKER",
  createdAt: new Date(),
  updatedAt: new Date(),
  bookIds: [],
  reviewIds: [],
  testimonialIds: [],
  favoriteIds: [],
  loanedBookIds: [],
};

const BOOK_INFO = {
  pages: 100,
  year: 2022,
  language: "FR" as LocaleLanguagesUpperCase,
  delivery: "FREE" as const,
};

const MOCKED_REVIEWS: BookReview[] = [
  {
    ...USER_IDENTITIES.user1,
    reviewId: "1",
    bookId: "1",
    rating: 5,
    comment: "Mocked Comment",
    language: "fr",
    createdAt: "2022-01-01",
  },
  {
    ...USER_IDENTITIES.user2,
    reviewId: "2",
    bookId: "2",
    rating: 4,
    comment: "Mocked Comment",
    language: "fr",
    createdAt: "2022-01-01",
  },
  {
    ...USER_IDENTITIES.user3,
    reviewId: "3",
    bookId: "3",
    rating: 4,
    comment: "Mocked Comment",
    language: "fr",
    createdAt: "2022-01-01",
  },
];

const BASE_BOOK: Omit<Book, "id"> = {
  title: "Mocked Book",
  description: COMMON_DESCRIPTION,
  author: "Mocked Author",
  cover: "/img/woman_studying.png",
  favorite: false,
  styles: ["Mocked Style", "Mocked Style 2", "Mocked Style 3"],
  rating: 4.6,
  reviews: MOCKED_REVIEWS,
  price: 3,
  owner: MOCKED_OWNER,
  information: BOOK_INFO,
  loaned: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const createBook = (id: string): Book => ({ ...BASE_BOOK, id });

export const MOCKED_BOOK_1 = createBook("1");
export const MOCKED_BOOK_2 = createBook("2");
export const MOCKED_BOOK_3 = createBook("3");
export const MOCKED_BOOK_4 = createBook("4");

export const MOCKED_BOOKS: Book[] = [
  MOCKED_BOOK_1,
  MOCKED_BOOK_2,
  MOCKED_BOOK_3,
  MOCKED_BOOK_4,
];

const createTestimonial = (
  testimonialId: string,
  userKey: keyof typeof USER_IDENTITIES,
  rating: number,
  language: LocaleLanguages,
  comment: string,
): Testimonial => ({
  testimonialId,
  ...USER_IDENTITIES[userKey],
  rating,
  comment,
  language,
  createdAt: "2022-01-01",
});

export const TESTIMONIALS_MOCK_FR: Testimonial[] = [
  createTestimonial(
    "1",
    "user1",
    5,
    "fr",
    "Liprêrie a transformé ma façon de découvrir de nouveaux livres. Le choix est incroyable et la livraison est toujours ponctuelle. J'ai lu plus de livres cette année que jamais auparavant !",
  ),
  createTestimonial(
    "2",
    "user2",
    4,
    "fr",
    "Enfin un service de prêt de livres qui comprend les lecteurs ! Pas de désordre, pas de tracas. J’adore pouvoir rendre les livres sans stress et avoir toujours quelque chose de nouveau à lire.",
  ),
  createTestimonial(
    "3",
    "user3",
    4,
    "fr",
    "Notre club de lecture est entièrement passé à Liprêrie. Tout le monde reçoit ses exemplaires à temps et nous économisons énormément d'argent !",
  ),
];

export const TESTIMONIALS_MOCK_EN: Testimonial[] = [
  createTestimonial(
    "4",
    "user1",
    5,
    "en",
    "Liprêrie has transformed the way I discover new books. The selection is incredible and the delivery is always on time. I've read more books this year than ever before!",
  ),
  createTestimonial(
    "5",
    "user2",
    4,
    "en",
    "Finally, a book lending service that understands readers! No mess, no hassle. I love being able to return books stress-free and always have something new to read.",
  ),
  createTestimonial(
    "6",
    "user3",
    4,
    "en",
    "Our book club has completely switched to Liprêrie. Everyone receives their copies on time and we're saving a lot of money!",
  ),
];
