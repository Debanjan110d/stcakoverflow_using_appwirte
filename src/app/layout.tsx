import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevQnA - Developer Q&A Community",
  description: "A modern developer community for asking and answering programming questions. Built with Next.js, Appwrite, and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body suppressHydrationWarning className="antialiased">
        {children}
      </body>
    </html>
  );
}
