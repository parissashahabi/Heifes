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
import NextLink from "next/link";
import { useRouter } from "next/router";
import { ROUTES } from "../../../common/enums/routes.enum";
import { CSSProperties, useState } from "react";
import Basket from "../../../public/icons/basket.svg"
// import useUser from "@/store/user";
import { SizeProps, sizes } from "../../../common/miscellaneous/sizes";
import {ShopOutlined, UserOutlined} from "@ant-design/icons";
import useCart from "../../../store/cart/index";
// import { getCartItemsCount } from "@/common/layout/header/services";

interface PropTypes {
  ghost?: boolean;
  static?: boolean;
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
const userIcon = router.pathname.includes("seller") ? <ShopOutlined style={{fontSize:"17px", color:"#707070", margin: "0 0.5px"}}/>: <UserOutlined style={{fontSize:"17px", color:"#707070", margin: "0 0.5px"}}/>;
  const dropDown = (
    <Menu style={DropDownStyles}>
       <Menu.Item> {"حسین علیزاده"}</Menu.Item>
      <Menu.Item>{"09132584875"}</Menu.Item>
      <Divider />
      <Menu.Item onClick={() => router.push(ROUTES.CUSTOMER)}>
        <Typography.Text style={{ fontWeight: "500", color: "#5F5F5F" }}>
          پروفایل شما
        </Typography.Text>
      </Menu.Item>
        <Menu.Item>
            <Row justify="space-between">
                <Typography.Text style={{ fontWeight: "500", color: "#5F5F5F" }}>موجودی</Typography.Text>
                <Typography.Text style={{ fontWeight: "500", color: "#5CBF8C" }}>120000</Typography.Text>
            </Row>
      </Menu.Item>
      <Menu.Item onClick={()=>router.push("/")}>
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
            {!props.sm ? (
                <Row>
                    {router.pathname.includes("seller")?null :<NextLink href="/cart">
                        <a>
                            <Button className={styles["cart"]}>
                                {/* {count !== 0 && (*/}
                                {/*  <div className={styles["cart-count"]}>*/}
                                {/*    <span>{count}</span>*/}
                                {/*  </div>*/}
                                {/*)}*/}
                                <Basket/>
                            </Button>
                        </a>
                    </NextLink>}

                  <Dropdown overlay={dropDown}>
                    <Row className={styles["user"]}>
                      <Row />
                      <Typography.Text style={{ fontSize: "12px" }}>
                        {/* {member?.userFullName || "مهمان"} */}
                        حسین علیزاده
                      </Typography.Text>
                        {userIcon}
                    </Row>
                  </Dropdown>
                </Row>
              )
            :  (
                    router.pathname.includes("seller")?null :<NextLink href="/cart">
                            <a>
                                <Button className={styles["cart"]}>
                                    {/* {count !== 0 && (*/}
                                    {/*  <div className={styles["cart-count"]}>*/}
                                    {/*    <span>{count}</span>*/}
                                    {/*  </div>*/}
                                    {/*)}*/}
                                    <Basket/>
                                </Button>
                            </a>
                        </NextLink>
              )}
            {!props.sm && !router.pathname.includes("offer") ? (
              <Row className={styles["links"]} justify="space-between"></Row>
            ) : props.sm ? (
              <>
                <Row className={styles["LogoDesktop"]}>
                  <Image
                    alt="header-logo"
                    src="/images/headerLogo.svg"
                    preview={false}
                  />
                </Row>
                <Row
                  className={styles["sidebar"]}
                  onClick={() => setShowDrawer(!showDrawer)}
                >
                  <Row />
                    {userIcon}
                </Row>
              </>
            ) :  (
              <>
                <Row className={styles["LogoDesktop"]}>
                  <Image
                    alt="header-logo"
                    src="/images/headerLogo.svg"
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
            ) }
            {!props.sm ? (
              <Image
                alt="header-logo"
                src="/images/headerLogo.svg"
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
            <div>
              <Row style={{ alignItems: "center", marginBottom: "1.6rem" }}>
                <Col className={styles["avatar"]}>{/* <Avatar /> */}</Col>
                <Col>
                  <Typography.Paragraph className={styles["username"]}>
                    {/* {member?.userFullName || "مهمان"} */}
                      {"حسین علیزاده"}
                  </Typography.Paragraph>
                  <Typography.Paragraph className={styles["phone-number"]}>
                      {"09132584875"}
                    {/* {member?.phoneNumber || ""} */}
                  </Typography.Paragraph>
                </Col>
              </Row>
              <Col>
                <Button className={styles["logout"]} /*onClick={handleLogout}*/>
                  خروج از حساب
                </Button>
              </Col>
            </div>
        }
      ></Drawer>
    </>
  );
};
export default sizes(Header);
