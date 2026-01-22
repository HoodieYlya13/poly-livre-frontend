export default async function BookPage(props: {
  params: Promise<{ style: string }>;
}) {
  const { style } = await props.params;

  return <div>{style}</div>;
}
