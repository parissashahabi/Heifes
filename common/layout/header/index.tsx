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
import {Store} from "../../../utils/store"
import styles from "./index.module.scss";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { ROUTES } from "../../../common/enums/routes.enum";
import { CSSProperties, useState,useContext } from "react";
import Basket from "../../../public/icons/basket.svg"
import { SizeProps, sizes } from "../../../common/miscellaneous/sizes";
import {ShopOutlined, UserOutlined} from "@ant-design/icons";
import {parseAmount} from "../../functions/parse-amount";
import Cookies from 'js-cookie';

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
    const { state, dispatch } = useContext(Store);
    const { cart, userInfo } = state;
    const [showDrawer, setShowDrawer] = useState(false);
    const router = useRouter();

    const logoutClickHandler = () => {
        dispatch({ type: 'USER_LOGOUT' });
        Cookies.remove('userInfo');
        Cookies.remove('cartItems');
        router.push('/');
    };

    const userIcon = router.pathname.includes("seller") ? <ShopOutlined style={{fontSize:"17px", color:"#707070", margin: "0 0.5px"}}/>: <UserOutlined style={{fontSize:"17px", color:"#707070", margin: "0 0.5px"}}/>;
    const dropDown = (
        <Menu style={DropDownStyles}>
            <Menu.Item> {userInfo?.name}</Menu.Item>
            <Menu.Item>{userInfo?.phoneNumber}</Menu.Item>
            <Divider />
            {router.pathname.includes("seller") ? null:<Menu.Item onClick={() => router.push(ROUTES.DASHBOARD)} id="profile">
                <Typography.Text style={{ fontWeight: "500", color: "#5F5F5F" }}>
                    پروفایل شما
                </Typography.Text>
            </Menu.Item>}
            {router.pathname.includes("seller") ? null : <Menu.Item>
                <Row justify="space-between">
                    <Typography.Text style={{ fontWeight: "500", color: "#5F5F5F" }}>موجودی</Typography.Text>
                    <Typography.Text style={{ fontWeight: "500", color: "#5CBF8C" }}>{userInfo?.balance ? parseAmount(userInfo?.balance) : 0} ريال </Typography.Text>
                </Row>
            </Menu.Item>}

            <Menu.Item onClick={()=>logoutClickHandler()}>
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
                                        <a id="cart-link">
                                            <Button className={styles["cart"]}>
                                                {cart.cartItems.length !== 0 && (
                                                    <div className={styles["cart-count"]}>
                                                        <span>{cart.cartItems.length}</span>
                                                    </div>
                                                )}
                                                <Basket/>
                                            </Button>
                                        </a>
                                    </NextLink>}

                                    <Dropdown overlay={dropDown}>
                                        <Row className={styles["user"]}>
                                            <Row />
                                            <Typography.Text style={{ fontSize: "12px" }} id="user-info-name">
                                                {userInfo?.name || userInfo?.phoneNumber}
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
                                            {cart.cartItems.length !== 0 && (
                                                <div className={styles["cart-count"]}>
                                                    <span>{cart.cartItems.length}</span>
                                                </div>
                                            )}
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
                                        onClick={()=>router.push("/")}
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
                                        onClick={()=>router.push("/")}
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
                                onClick={()=>router.push("/")}
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
                                    {userInfo?.name}
                                </Typography.Paragraph>
                                <Typography.Paragraph className={styles["phone-number"]}>
                                    {userInfo?.phoneNumber}
                                </Typography.Paragraph>
                            </Col>
                        </Row>
                        <Col>
                            <Button className={styles["logout"]} onClick={()=>logoutClickHandler()}>
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
