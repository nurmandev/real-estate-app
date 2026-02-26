"use client";
import "../styles/index.scss";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { EB_Garamond } from "next/font/google";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <html lang="en" suppressHydrationWarning={isDev}>
      <head>
        <meta
          name="keywords"
          content="Real estate, Property sale, Property buy"
        />
        <meta name="description" content="Omnis Properties LLC" />
        <meta property="og:site_name" content="Omnis Properties LLC" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Omnis Properties LLC" />
        <meta name="og:image" content="images/assets/ogg.png" />
        {/* For IE  */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {/* For Resposive Device */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* For Window Tab Color */}
        {/* Chrome, Firefox OS and Opera */}
        <meta name="theme-color" content="#0D1A1C" />
        {/* Windows Phone */}
        <meta name="msapplication-navbutton-color" content="#0D1A1C" />
        {/* iOS Safari */}
        <meta name="apple-mobile-web-app-status-bar-style" content="#0D1A1C" />
        <link rel="icon" href="/favicon.png" sizes="any" />
      </head>
      <body suppressHydrationWarning={true} className={ebGaramond.className}>
        <div className="main-page-wrapper">
          <Provider store={store}>{children}</Provider>
        </div>
      </body>
    </html>
  );
}
