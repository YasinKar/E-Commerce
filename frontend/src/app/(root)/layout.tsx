// Components
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import MobNavbar from "@/components/MobNavbar";
import TopNav from "@/components/TopNav";

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <>
      <header className='sticky top-0 z-40 shadow-xl bg-white'>
        <TopNav />
        <NavBar />
      </header>
      {children}
      <Footer />
      <MobNavbar />
    </>
  );
}