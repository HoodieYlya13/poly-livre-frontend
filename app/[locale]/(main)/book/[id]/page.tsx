import Book from "@/app/components/Pages/Book/Book";

export default async function BookPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  return <Book id={id} />;
}
