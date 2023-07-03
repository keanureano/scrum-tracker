import SignOut from "@/components/SignOut";
import "./globals.css";

export const metadata = {
  title: "",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SignOut />
        {children}
      </body>
    </html>
  );
}
