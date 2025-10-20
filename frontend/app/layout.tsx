import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Komentarze",
  description:
    "Przeglądaj, edytuj i usuwaj komentarze dodane przez użytkowników.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased dark">{children}</body>
    </html>
  );
}
