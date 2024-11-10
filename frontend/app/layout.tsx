"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";
import AuthProvider from "./providers/authProvider";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {
        // We must ensure our app is wrapped by the AuthProvider we created or else the useAuth hook will not work
      }
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <body>{children}</body>
        </QueryClientProvider>
      </AuthProvider>
    </html>
  );
}
