import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CampusBridge | Academia–Industry Portal",
  description: "A skill-first collaboration portal for students, institutions and industry."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
