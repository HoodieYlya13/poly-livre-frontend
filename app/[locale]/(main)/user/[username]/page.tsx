export default async function UserPage(props: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await props.params;
  return <div>{username}</div>;
}
