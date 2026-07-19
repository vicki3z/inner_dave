import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inner DAVE",
  description: "A gentle check-in that helps you notice your own patterns.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
