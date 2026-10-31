import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "tudi",
  description: "Design unique 2D cartoon id cards",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="h-full">
      <body className="min-h-full flex flex-col bg-white text-[#261F36] selection:bg-[#6A5495] selection:text-white">
        {children}
      </body>
    </html>
  );
}
