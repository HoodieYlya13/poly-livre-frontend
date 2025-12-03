import GeoFallbackFetcher from "./GeoFallbackFetcher";
import { getUserCountryServer } from "@/utils/cookies/server/getUserCountryServer";
import { getUserIp } from "@/utils/cookies/server/getUserIp";

export default async function UserGeoInfo() {
  const userIp = await getUserIp();
  const userCountry = await getUserCountryServer();

  if (!userIp || !userCountry) return <GeoFallbackFetcher />;

  return null;
}