import "../styles/index.scss";
import "antd/dist/antd.css";
import Head from "next/head";
import {useContext, useState} from "react";
import { useRouter } from "next/router";
import Layout from "../common/layout";
import {Store, StoreProvider} from '../utils/store';
function MyApp({ Component, pageProps }) {
  const routeConfigs: any = {
    login: ["hide", "ghost"],
    register: ["hide", "ghost"],
    recovery: ["hide", "ghost"],
    registration_result: ["hide", "ghost"],
    store: ["protected"],
    seller: ["protected"],
    home: ["ghost"],
    city: ["hide", "ghost"],
  };
  // const { state, dispatch } = useContext(Store);
  // const { userInfo } = state;
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
      <StoreProvider>
        <Layout currentPath={pathname} configs={routeConfigs}>
          <Component {...pageProps} />
        </Layout>
      </StoreProvider>
    </>
  );
}

export default MyApp;
