import { getSettings } from "@/utils/actions/content.actions";
import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";

export async function generateMetadata() {
  const settings = await getSettings();

  return {
    title: `${settings.site_name} | ${settings.site_main_title}`,
    description: settings.site_description,
    openGraph: {
      title: `${settings.site_name} | ${settings.site_main_title}`,
      description: settings.site_description,
      url: `${settings.domain}`,
      images: [{ url: settings.image }],
      type: 'website',
    },
  };
}

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <AuthContextProvider>
        <body>
          {children}
        </body>
      </AuthContextProvider>
    </html>
  );
}