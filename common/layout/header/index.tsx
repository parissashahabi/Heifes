import {
  Button,
  Col,
  Divider,
  Drawer,
  Dropdown,
  Menu,
  Row,
  Typography,
  Image,
} from "antd";
import styles from "./index.module.scss";
// import { Link } from "react-scroll";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { ROUTES } from "../../../common/enums/routes.enum";
import { CSSProperties, useEffect, useState } from "react";
// import useUser from "@/store/user";
import { SizeProps, sizes } from "../../../common/miscellaneous/sizes";
import { UserOutlined } from "@ant-design/icons";
// import useCart from "@/store/cart";
// import { getCartItemsCount } from "@/common/layout/header/services";

interface PropTypes {
  ghost?: boolean;
  static?: boolean;
  showNotif?: boolean;
  setShowNotif?: any;
}

const DropDownStyles: CSSProperties = {
  textAlign: "right",
  borderRadius: "8px",
  padding: "1.6rem",
  minWidth: "24.7rem",
};

const Header = (props: PropTypes & SizeProps) => {
  // const { member, setUser } = useUser<Record<string, any>>((state) => state);
  // const { count, setCartItemCount } = useCart((state) => state);
  const [showDrawer, setShowDrawer] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   if (member && member?.shopState === "CONFIRMED") {
  //     getCartItemsCount(setCartItemCount);
  //   }
  // }, [member]);

  // const handleLogout = async () => {
  //   clientApi.logOut();
  //   setUser(undefined, undefined);
  //   await router.push({
  //     pathname: ROUTES.LOGIN,
  //     query: {
  //       redirect: router.asPath,
  //     },
  //   });
  // };

  const dropDown = (
    <Menu style={DropDownStyles}>
      {/* <Menu.Item> {member?.userFullName || "مهمان"}</Menu.Item>
      <Menu.Item>{member?.phoneNumber || ""}</Menu.Item> */}
      <Divider />
      <Menu.Item onClick={() => router.push(ROUTES.ORDERS_LIST)}>
        <Typography.Text style={{ fontWeight: "500", color: "#5F5F5F" }}>
          پیگیری خرید
        </Typography.Text>
      </Menu.Item>
      <Menu.Item /*onClick={handleLogout}*/>
        <Typography.Text type={"red" as any}>
          خروج از حساب کاربری
        </Typography.Text>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Row
        className={`${styles["hold"]} ${props.static ? "" : styles["static"]}`}
      >
        <Row
          justify="space-between"
          align="middle"
          style={{
            width: "100%",
            justifyContent: "center",
            boxShadow: "0 4px 4px rgba(0, 0, 0, 0.08)",
          }}
        >
          <Row
            className={styles["header"]}
            justify="space-between"
            align="middle"
          >
            {props.ghost ? (
              <Button
                className="login-class"
                onClick={() => router.push(ROUTES.LOGIN)}
              >
                {!props.sm ? "ورود / ثبت نام در پنل همکاران" : "ورود / ثبت نام"}
              </Button>
            ) : !props.sm ? (
              // clientApi.isTokenValid ? (
              true ? (
                <Row>
                  {/* {member?.shopState === "CONFIRMED" ? ( */}
                  {true ? (
                    router.pathname !== "/payment-process" ? (
                      <NextLink href="/cart">
                        <a>
                          <Button className={styles["cart"]}>
                            {/* {count !== 0 && (
                              <div className={styles["cart-count"]}>
                                {" "}
                                <span>{count}</span>
                              </div>
                            )}
                            <Cart /> */}
                          </Button>
                        </a>
                      </NextLink>
                    ) : null
                  ) : null}

                  <Dropdown overlay={dropDown}>
                    <Row className={styles["user"]}>
                      <Row />
                      <Typography.Text style={{ fontSize: "12px" }}>
                        {/* {member?.userFullName || "مهمان"} */}
                        حسین علیزاده
                      </Typography.Text>
                      <UserOutlined />
                    </Row>
                  </Dropdown>
                </Row>
              ) : (
                <Row
                  className={styles["user"]}
                  onClick={() => router.push(ROUTES.LOGIN)}
                >
                  <Typography.Text onClick={() => router.push(ROUTES.LOGIN)}>
                    ورود / ثبت نام
                  </Typography.Text>
                  {/* <Person /> */}
                </Row>
              )
            ) : // ) : clientApi.isTokenValid ? (
            true ? (
              // member?.shopState === "CONFIRMED" &&
              true && router.pathname !== "/payment-process" ? (
                <NextLink href="/cart">
                  <a>
                    {/* <Button className={styles["cart"]}>
                      {count !== 0 && (
                        <div className={styles["cart-count"]}>
                          {" "}
                          <span>{count}</span>
                        </div>
                      )}
                      <Cart />
                    </Button> */}
                  </a>
                </NextLink>
              ) : (
                <div />
              )
            ) : (
              <Typography.Text onClick={() => router.push(ROUTES.LOGIN)}>
                ورود / ثبت نام
              </Typography.Text>
            )}
            {!props.sm && !router.pathname.includes("offer") ? (
              <Row className={styles["links"]} justify="space-between"></Row>
            ) : // ) : clientApi.isTokenValid && props.sm ? (
            true && props.sm ? (
              <>
                <Row className={styles["LogoDesktop"]}>
                  <Image
                    alt="header-logo"
                    src="/images/header-logo.svg"
                    preview={false}
                  />
                </Row>
                <Row
                  className={styles["sidebar"]}
                  onClick={() => setShowDrawer(!showDrawer)}
                >
                  <Row />
                  {/* <Profile /> */}
                </Row>
              </>
            ) : !router.pathname.includes("offer") ? (
              <>
                <Row className={styles["LogoDesktop"]}>
                  <Image
                    alt="header-logo"
                    src="/images/header-logo.svg"
                    preview={false}
                  />
                </Row>
                <Row
                  className={styles["sandwich"]}
                  onClick={() => setShowDrawer(!showDrawer)}
                >
                  {/* <Sandwich /> */}
                </Row>
              </>
            ) : null}
            {!props.sm ? (
              <Image
                alt="header-logo"
                src="/images/header-logo.svg"
                preview={false}
              />
            ) : null}
          </Row>
        </Row>
      </Row>
      <Drawer
        className={styles["drawers"]}
        onClose={() => setShowDrawer(!showDrawer)}
        visible={showDrawer}
        closeIcon={<div className={styles["close"]}>{/* <Close /> */}</div>}
        title={
          // clientApi.isTokenValid ? (
          true ? (
            <div>
              <Row style={{ alignItems: "center", marginBottom: "1.6rem" }}>
                <Col className={styles["avatar"]}>{/* <Avatar /> */}</Col>
                <Col>
                  <Typography.Paragraph className={styles["username"]}>
                    {" "}
                    {/* {member?.userFullName || "مهمان"} */}
                  </Typography.Paragraph>
                  <Typography.Paragraph className={styles["phone-number"]}>
                    {" "}
                    {/* {member?.phoneNumber || ""} */}
                  </Typography.Paragraph>
                </Col>
              </Row>
              <Col>
                {/* <Button className={styles["logout"]} onClick={handleLogout}>
                  خروج از حساب
                  <ArrowLeftTailless />
                </Button> */}
              </Col>
            </div>
          ) : (
            <div />
          )
        }
      ></Drawer>
    </>
  );
};
export default sizes(Header);
