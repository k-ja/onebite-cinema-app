import Link from "next/link";
import "./globals.css";
import styles from "./layout.module.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={styles.container}>
          <header>
            <h1>
              <Link href={"/"}>ONEBITE CINEMA</Link>
            </h1>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
