import "../styles/index.scss";
import "antd/dist/antd.css";
import Head from "next/head";
import { useState} from "react";
import { useRouter } from "next/router";
import Layout from "../common/layout";
import { StoreProvider} from '../utils/store';
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const routeConfigs: any = {
  home: ["ghost"],
  login: ["hide", "ghost"],
  register: ["hide", "ghost"],
  recovery: ["hide", "ghost"],
  registration_result: ["hide", "ghost"],
  store: ["protected"],
  seller: ["protected"],
  cart: ["protected"],
  dashboard: ["protected"],
  receipt: ["protected"],
};

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { pathname } = router;
  const [loading, setLoading] = useState(isCurrentPathProtected());

  function isCurrentPathProtected() {
    let currentPathname = pathname === "/" ? "home" : pathname.slice(1);
    if (currentPathname.includes("store")) currentPathname = "store";
    if (currentPathname.includes("receipt")) currentPathname = "receipt";
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
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <StoreProvider>
        <Spin spinning={loading} indicator={<LoadingOutlined />}>
        <Layout currentPath={pathname} configs={routeConfigs} setLoading={setLoading} loading={loading} isCurrentPathProtected={isCurrentPathProtected}>
          <Component {...pageProps} />
        </Layout>
        </Spin>
      </StoreProvider>
    </>
  );
}

export default MyApp;
