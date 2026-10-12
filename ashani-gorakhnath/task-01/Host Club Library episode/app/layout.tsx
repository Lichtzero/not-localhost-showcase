import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Class Project Library | Srishti Manipal Institute of Art, Design & Technology",
  description:
    "A contemporary, motion-driven digital library and experimental bookshop showcasing the projects of 15 students from Srishti Manipal Institute of Art, Design and Technology (MAHE).",
  keywords: [
    "Srishti Manipal",
    "Design School",
    "Digital Library",
    "3D Books",
    "Student Portfolios",
    "Interactive Design",
  ],
  authors: [{ name: "Srishti Manipal Class Cohort" }],
  openGraph: {
    title: "The Class Project Library | Srishti Manipal",
    description: "Explore the collective library of 15 design students.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300..600;1,6..72,300..500&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0b0c0e] text-[#f4f4f5] antialiased selection:bg-rose-600 selection:text-white min-h-screen flex flex-col bg-grain">
        {children}
      </body>
    </html>
  );
}
