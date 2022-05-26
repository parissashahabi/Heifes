import {ReactElement, useContext, useEffect, useState} from "react";
import Footer from "./footer";
import Header from "./header";
import { Col } from "antd";
import styles from "./index.module.scss";
import { RouteConfig } from "../miscellaneous/types";
import {Store} from "../../utils/store";
import { useRouter } from "next/router";
import { ROUTES } from "../enums/routes.enum";

type PropTypes = {
  children: ReactElement[] | ReactElement;
  currentPath: string;
  configs: RouteConfig;
  loading?:boolean;
  setLoading?: any;
  isCurrentPathProtected?: any;
};

const Layout = ({ children, configs, currentPath, loading, setLoading, isCurrentPathProtected }: PropTypes) => {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const router = useRouter();

  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isHeaderGhost, setIsHeaderGhost] = useState(false);
  const [isHeaderStatis, setIsHeaderStatis] = useState(false);

  function turnOffLoadingWithTimeout() {
    setTimeout(() => setLoading(false), 1000);
  }

  function handleRouteProtection(token) {
    const isPathProtected = isCurrentPathProtected();
    if (isPathProtected && !token) {
      turnOffLoadingWithTimeout();
      router.replace(ROUTES.LOGIN);
    } else {
      turnOffLoadingWithTimeout();
    }
  }

  useEffect(() => {
    const asyncFunc = async () => {
      if (isCurrentPathProtected() && loading === false) setLoading(true);
      handleRouteProtection(userInfo?.token);
    };
    asyncFunc();


    const pathConfigs =
      configs[currentPath === "/" ? "home" : currentPath.replace("/", "")];
    if (!pathConfigs) return setIsHeaderVisible(true);
    if (pathConfigs?.some((config) => config === "hide"))
      setIsHeaderVisible(false);
    else setIsHeaderVisible(true);
    if (pathConfigs?.some((config) => config === "ghost"))
      setIsHeaderGhost(true);
    else setIsHeaderGhost(false);
    if (pathConfigs?.some((config) => config === "static-header"))
      setIsHeaderStatis(true);
    else {
      setIsHeaderStatis(false);
      setIsHeaderGhost(false);
    }
  }, [currentPath]);

  return (
    <>
      {!isHeaderVisible ? (children) : (
        <Col
          className={[
            currentPath === "/" ? styles["no-padding"] : styles["container"]
          ].join(" ")}
        >
          {
            currentPath !== "/" && (
              <Header
                static={isHeaderStatis}
                ghost={isHeaderGhost}
              />
            )
          }
          <Col
            className={[
              styles["content"],
              currentPath === "/" ? styles["landing"] : "",
              styles["sm-margin"],
            ].join(" ")}
          >
            {children}
          </Col>
           <Footer />
        </Col>
      )}
    </>
  );
};
export default Layout;
