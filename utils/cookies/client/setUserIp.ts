export async function setUserIp(userIp: string) {
  await fetch("/api/user/ip", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userIp }),
  });
}