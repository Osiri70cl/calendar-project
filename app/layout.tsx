import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "../src/styles/globals.scss";
import "@osiris70cl/simple-react-date-picker/dist/index.css";

const dmSans = DM_Sans({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={dmSans.className}>
      <body>{children}</body>
    </html>
  );
}
