import "../styles/index.scss";
import "antd/dist/antd.css";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../common/layout";
function MyApp({ Component, pageProps }) {
  const routeConfigs: any = {
    login: ["hide", "ghost"],
    register: ["hide", "ghost"],
    store: ["protected"],
    seller: ["protected"],
    home: ["ghost"],
  };
  const router = useRouter();
  const { pathname } = router;
  const [loading, setLoading] = useState(isCurrentPathProtected());
  function isCurrentPathProtected() {
    let currentPathname = pathname === "/" ? "home" : pathname.slice(1);
    const pathConfigs = routeConfigs[currentPathname];
    const isPathProtected = pathConfigs?.some(
      (config) => config === "protected"
    );
    return isPathProtected;
  }
  return (
    <>
      <Head>
        <title>حیفه‌س</title>
        <link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <Layout currentPath={pathname} configs={routeConfigs}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
