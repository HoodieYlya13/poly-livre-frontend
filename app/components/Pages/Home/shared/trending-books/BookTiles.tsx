import BookTile from "@/app/components/UI/shared/components/BookTile";

export default function BookTiles() {
  const mockedBook = {
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
  return (
    <div className="w-full grid sm:grid-cols-2 xl:grid-cols-4 gap-3 justify-items-center mx-auto max-w-2xl xl:max-w-8xl">
      <BookTile book={mockedBook} />
      <BookTile book={mockedBook} />
      <BookTile book={mockedBook} />
      <BookTile book={mockedBook} />
    </div>
  );
}
