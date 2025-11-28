import NavBarClient from "./shared/NavBarClient";

export default function NavBar() {
  return (
    <header className="fixed w-full z-20 h-20 md:h-30 backdrop-blur-md liquid-glass-background border-b liquid-glass-border-color shadow-xl flex">
      <NavBarClient />
    </header>
  );
}