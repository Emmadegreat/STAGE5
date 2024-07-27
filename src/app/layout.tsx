import "./globals.css";
import 'react-toastify/dist/ReactToastify.css'

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Devlinks - App",
  description: "Devlinks"
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
         <link rel="icon" href="https://res.cloudinary.com/dbnxbly1r/image/upload/v1722110403/general/devlinks_dbrksv.png"/>
     </head>
      <body className={inter.className}>
        {children}
        <ToastContainer/>
      </body>
    </html>
  );
}

