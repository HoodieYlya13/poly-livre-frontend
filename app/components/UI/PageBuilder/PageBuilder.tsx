import Footer from "./Footer/Footer";
import NavBar from "./NavBar/NavBar";
import UserGeoInfo from "./CustomerGeoInfo/UserGeoInfo";
import clsx from "clsx";
import Aurora from "./NavBar/shared/Aurora";
import LocaleMismatch from "./LocaleMismatch";
import { getServerCookie } from "@/utils/cookies/server/cookiesServer";

interface PageBuilderProps {
  children: React.ReactNode;
  padding?: boolean;
  showNavBar?: boolean;
  showFooter?: boolean;
  auroraBackground?: boolean;
}

export default async function PageBuilder({
  children,
  padding = true,
  showNavBar = true,
  showFooter = true,
  auroraBackground = false,
}: PageBuilderProps) {
  const localeMismatch = await getServerCookie("locale_mismatch");
  return (
    <div className="flex flex-col bg-black text-white font-black">
      {showNavBar && <NavBar />}

      {auroraBackground && <Aurora speed={0.3} />}

      {localeMismatch && <LocaleMismatch localeMismatch={localeMismatch} />}

      <div className="flex flex-col z-10">
        <main
          className={clsx("grow flex flex-col min-h-dvh", {
            "p-5 pb-0 md:p-10 md:pb-0 pt-20 md:pt-30": padding,
          })}
        >
          {children}
        </main>
        {showFooter && <Footer />}
      </div>

      <UserGeoInfo />
    </div>
  );
}
