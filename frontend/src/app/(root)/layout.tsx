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
      <main className="container relative my-8 space-y-10 z-10">
        {children}
      </main>
      <Footer />
      <MobNavbar />
    </>
  );
}