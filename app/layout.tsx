import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, } from '@clerk/nextjs'
import { Toaster } from "@/components/ui/toaster";

import '@stream-io/video-react-sdk/dist/css/styles.css';
import "react-datepicker/dist/react-datepicker.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Conference",
  description: "This ain an app n which people can have a conferences, meetings and so on",
  icons: {
    icon: '/icons/logo.svg'
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          logoImageUrl: '/icons/logo.svg',
          socialButtonsVariant: 'iconButton'
        },
        variables: {
          colorText: '#fff',
          colorBackground: '#1C1F2E',
          colorPrimary: '#0E78F9',
          colorInputBackground: '#252A41',
          colorInputText: '#fff',
        }
      }}
    >
      <html lang="en">
        <body className={`${inter.className} bg-dark-2`}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
