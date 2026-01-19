import { Book } from "@/models/book.models";
import { Testimonial } from "@/models/user.models";

export const MOCKED_BOOK_1: Book = {
  id: "1",
  title: "Mocked Book",
  author: "Mocked Author",
  cover: "/img/woman_studying.png",
  favorite: false,
  styles: ["Mocked Style", "Mocked Style 2", "Mocked Style 3"],
  rating: 4.6,
  price: 3,
  owner: "Mocked Owner",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const MOCKED_BOOK_2: Book = {
  id: "2",
  title: "Mocked Book",
  author: "Mocked Author",
  cover: "/img/woman_studying.png",
  favorite: false,
  styles: ["Mocked Style", "Mocked Style 2", "Mocked Style 3"],
  rating: 4.6,
  price: 3,
  owner: "Mocked Owner",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const MOCKED_BOOK_3: Book = {
  id: "3",
  title: "Mocked Book",
  author: "Mocked Author",
  cover: "/img/woman_studying.png",
  favorite: false,
  styles: ["Mocked Style", "Mocked Style 2", "Mocked Style 3"],
  rating: 4.6,
  price: 3,
  owner: "Mocked Owner",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const MOCKED_BOOK_4: Book = {
  id: "4",
  title: "Mocked Book",
  author: "Mocked Author",
  cover: "/img/woman_studying.png",
  favorite: false,
  styles: ["Mocked Style", "Mocked Style 2", "Mocked Style 3"],
  rating: 4.6,
  price: 3,
  owner: "Mocked Owner",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const MOCKED_BOOKS: Book[] = [
  MOCKED_BOOK_1,
  MOCKED_BOOK_2,
  MOCKED_BOOK_3,
  MOCKED_BOOK_4,
];

export const TESTIMONIALS_MOCK_FR: Testimonial[] = [
  {
    testimonialId: "1",
    userId: "1",
    username: "PDG",
    firstName: "Naheem",
    lastName: "Akaby",
    status: "STUDENT",
    rating: 5,
    comment:
      "Liprêrie a transformé ma façon de découvrir de nouveaux livres. Le choix est incroyable et la livraison est toujours ponctuelle. J'ai lu plus de livres cette année que jamais auparavant !",
    createdAt: "2022-01-01",
    language: "fr",
  },
  {
    testimonialId: "2",
    userId: "2",
    username: "RacistePrime",
    firstName: "Imed",
    lastName: "Zarour",
    status: "STUDENT",
    rating: 4,
    comment:
      "Enfin un service de prêt de livres qui comprend les lecteurs ! Pas de désordre, pas de tracas. J’adore pouvoir rendre les livres sans stress et avoir toujours quelque chose de nouveau à lire.",
    createdAt: "2022-01-01",
    language: "fr",
  },
  {
    testimonialId: "3",
    userId: "3",
    username: "example",
    firstName: "John",
    lastName: "Doe",
    status: "TEACHER",
    rating: 4,
    comment:
      "Notre club de lecture est entièrement passé à Liprêrie. Tout le monde reçoit ses exemplaires à temps et nous économisons énormément d'argent !",
    createdAt: "2022-01-01",
    language: "fr",
  },
];

  export const TESTIMONIALS_MOCK_EN: Testimonial[] = [
    {
      testimonialId: "4",
      userId: "1",
      username: "PDG",
      firstName: "Naheem",
      lastName: "Akaby",
      status: "STUDENT",
      rating: 5,
      comment:
        "Liprêrie has transformed the way I discover new books. The selection is incredible and the delivery is always on time. I've read more books this year than ever before!",
      createdAt: "2022-01-01",
      language: "en",
    },
    {
      testimonialId: "5",
      userId: "2",
      username: "RacistePrime",
      firstName: "Imed",
      lastName: "Zarour",
      status: "STUDENT",
      rating: 4,
      comment:
        "Finally, a book lending service that understands readers! No mess, no hassle. I love being able to return books stress-free and always have something new to read.",
      createdAt: "2022-01-01",
      language: "en",
    },
    {
      testimonialId: "6",
      userId: "3",
      username: "example",
      firstName: "John",
      lastName: "Doe",
      status: "TEACHER",
      rating: 4,
      comment:
        "Our book club has completely switched to Liprêrie. Everyone receives their copies on time and we're saving a lot of money!",
      createdAt: "2022-01-01",
      language: "en",
    },
  ];