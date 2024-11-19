"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";
import AuthProvider from "./providers/authProvider";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      main: "#3b82f6",
    },
    secondary: {
      main: "#1e293b",
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
});

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
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <body>{children}</body>
          </QueryClientProvider>
        </AuthProvider>
      </ThemeProvider>
    </html>
  );
}
