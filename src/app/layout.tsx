import "@/app/globals.css";
import { BuilderProvider } from "@/context/BuilderContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <BuilderProvider>
          {children}
        </BuilderProvider>
      </body>
    </html>
  );
}