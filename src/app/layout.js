import "./globals.css";

export const metadata = {
  title: "",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}
      Navbar
      </body>
    </html>
  );
}
