import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProviders from "@/utils/QueryProviders";
import { Toaster } from "react-hot-toast";
import ReduxProviders from "@/utils/ReduxProviders";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SocketProvider } from "@/utils/SocketProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CareerPilot — AI-Powered Career Intelligence",
  description:
    "Land your dream job 3x faster with AI resume scoring, smart job tracking, and interview prep.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        >
          <QueryProviders>
            <ReduxProviders>
              <SocketProvider>{children}</SocketProvider>
            </ReduxProviders>
          </QueryProviders>
        </GoogleOAuthProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
