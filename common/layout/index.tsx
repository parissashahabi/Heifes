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
  configs: RouteConfig;
};

const Layout = ({ children, configs, currentPath }: PropTypes) => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isHeaderGhost, setIsHeaderGhost] = useState(false);
  const [isHeaderStatis, setIsHeaderStatis] = useState(false);
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
          {currentPath !== "/" && <Footer />}
        </Col>
      )}
    </>
  );
};
export default Layout;
