import type { Metadata } from "next";
import "../src/styles/globals.scss";

export const metadata: Metadata = {
  title: "Calflow",
  description: "Gérer vos événements et vos rendez-vous",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
