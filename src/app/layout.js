import AuthButton from "@/components/AuthButton";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata = {
  title: "",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AuthButton />
          {children}
        </Providers>
      </body>
    </html>
  );
}
