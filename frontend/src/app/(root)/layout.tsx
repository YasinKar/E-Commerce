// Components
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import MobNavbar from "@/components/MobNavbar";
import TopNav from "@/components/TopNav";
import { getElectronicSymbols, getSettings } from "@/utils/actions/content.actions";

export async function generateMetadata() {
  const settings = await getSettings();

  return {
    title: `${settings.site_name} | Home`,
    description: settings.site_about,
    openGraph: {
      title: `${settings.site_name} | Home`,
      description: settings.site_about,
      url: `${settings.domain}`,
      images: [{ url: settings.image }],
      type: 'website',
    },
  };
}

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  const settings = await getSettings();

  const electronicSymbols = await getElectronicSymbols();

  return (
    <>
      <header className='sticky top-0 z-40 shadow-xl bg-white'>
        <TopNav settings={settings}/>
        <NavBar />
      </header>
      {children}
      <Footer settings={settings} electronicSymbols={electronicSymbols} />
      <MobNavbar />
    </>
  );
}