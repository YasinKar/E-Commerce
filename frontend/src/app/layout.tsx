import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";

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