import { ReactElement, useEffect, useState } from "react";
import Footer from "./footer";
import Header from "./header";
import { Col } from "antd";
import styles from "./index.module.scss";
import { RouteConfig } from "../../common/miscellaneous/types";
import { useRouter } from "next/router";

type PropTypes = {
  children: ReactElement[] | ReactElement;
  currentPath: string;
  isLoading: boolean;
  configs: RouteConfig;
};

const Layout = ({ children, configs, currentPath, isLoading }: PropTypes) => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isHeaderGhost, setIsHeaderGhost] = useState(false);
  const [isHeaderStatis, setIsHeaderStatis] = useState(false);
  const [showNotif, setShowNotif] = useState(true);
  const router = useRouter();

  useEffect(() => {
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
      {!isHeaderVisible ? (
        true ? (
          children
        ) : null
      ) : (
        <Col
          className={[
            styles["container"],
            currentPath === "/" ? styles["no-padding"] : "",
          ].join(" ")}
        >
          {currentPath === "/payment-process" ? (
            // <HeaderWithStep />
            <h1>header</h1>
          ) : (
            currentPath !== "/" && (
              <Header
                static={isHeaderStatis}
                ghost={isHeaderGhost}
                showNotif={showNotif}
                setShowNotif={setShowNotif}
              />
            )
          )}
          <Col
            className={[
              styles["content"],
              currentPath === "/" ? styles["landing"] : "",
              router.pathname.includes("payment-process") || currentPath === "/"
                ? ""
                : (router.pathname.includes("seller") ||
                    router.pathname.includes("store")) &&
                  showNotif
                ? styles["lg-margin"]
                : styles["sm-margin"],
            ].join(" ")}
          >
            {true ? children : null}
          </Col>
          {currentPath !== "/" && <Footer />}
        </Col>
      )}
    </>
  );
};
export default Layout;
