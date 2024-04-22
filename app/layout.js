import "./globals.css";
import { Roboto_Flex } from "next/font/google";
import Provider from "@/components/Authentication/Provider";

const roboto = Roboto_Flex({ subsets: ["latin"] });

export const metadata = {
  title: "TIM Dashboard",
  description: "Administrator dashboard for Try It Mirror",
};

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Provider session={session}>{children}</Provider>
      </body>
    </html>
  );
}
