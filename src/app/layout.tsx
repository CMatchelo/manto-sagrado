import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '@/contexts/AuthContext';
import { JerseyProvider } from "@/contexts/JerseyContext";

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Meu manto sagrado",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9198845586058201"
          crossOrigin="anonymous"></script>
      </head>
      <body
        className={montserrat.variable}
      >
        <AuthProvider>
          <JerseyProvider>
            {children}
          </JerseyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
