import "@/app/globals.css";
import { BuilderProvider } from "@/context/BuilderContext";
import { cn } from "@/lib/utils";

import {
  Inter,
  Great_Vibes,
  Cormorant_Garamond,
} from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={cn(
        inter.variable,
        greatVibes.variable,
        cormorant.variable
      )}
    >
      <body>
        <BuilderProvider>
          {children}
        </BuilderProvider>
      </body>
    </html>
  );
}