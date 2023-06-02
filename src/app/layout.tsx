"use client";
import "./globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import Appconfig from "./layout/appconfig";
import { SidebarProvider } from "./context/sidebarcontext";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "/node_modules/primeflex/primeflex.css";
import "../Styles/layout/layout.scss";
import "../Styles/layout/_config.scss";
import { ConfirmDialog } from "primereact/confirmdialog";
import { ToastProvider } from "./context/ToastContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConfirmDialog />
        <ToastProvider>
          <SidebarProvider>
            <Appconfig>{children}</Appconfig>
          </SidebarProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
