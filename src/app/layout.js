import "./globals.css";
import Dropdown from "@/components/Dropdown";

export const metadata = {
  title: "",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body><Dropdown/>{children}</body>
    </html>
  );
}
