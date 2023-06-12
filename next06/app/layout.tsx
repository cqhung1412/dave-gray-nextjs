import Navbar from "./components/Navbar";
import ProfileImg from "./components/ProfileImg";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Barry's Blog",
  description: "Created by Barry Bear",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark:bg-slate-800`}>
        <Navbar />
        <ProfileImg />
        {children}
      </body>
    </html>
  );
}
