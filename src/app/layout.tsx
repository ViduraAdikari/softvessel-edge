import type {Metadata} from "next";
import {Inter} from "next/font/google";
import SiteLayout from "@/components/Layout/SiteLayout";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "StepNavigator | TDD",
  description: "Typescript class to test StepNavigator component",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <SiteLayout>
      {children}
    </SiteLayout>
    </body>
    </html>
  );
}
