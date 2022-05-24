import React, {
  useEffect,
  useState,
} from "react";
import {
  Button,
  Col,
  Divider,
  Row,
  Table,
  Typography,
  Select
} from "antd";
import Login from "../../../../public/icons/login.svg"
import styles from "./styles/cart.module.scss";
import EmptyCart from "../common/empty-cart";
import { useRouter } from "next/router";
import {
  ArrowRightOutlined,
  CarryOutOutlined,
  FileTextOutlined,
  InstagramOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import TotalPrice from "./components/total-price";
import { ColumnsType } from "antd/lib/table/Table";

const CartDesktop = ({cartItems,checkoutHandler, removeItemHandler, updateCartHandler}: { cartItems: any[]; removeItemHandler: any; updateCartHandler:any; checkoutHandler:any}) => {
  const { Text } = Typography;
  const router = useRouter();
  const columns: ColumnsType<any> = [
    {
      key: "action",
      dataIndex: "action",
      render: (action: any, cartItem: any) => {
        return (
            <span
                className={styles["remove"]}
                onClick={()=>removeItemHandler(cartItem)}
            >
            X
          </span>
        );
      },
    },
    {
      title: "نام کالا",
      dataIndex: "name",
      width: 200,
      key: "name",
      render: (name: any) => {
        return <Text>{name}</Text>;
      },
    },
    {
      title: "تعداد",
      key: "quantity",
      width: 120,
      dataIndex: "quantity",
      render: (quantity: any, cartItem: any) => {
        return  (
            <Row className={styles["counter"]}>
              <Select value={quantity} style={{ width: 120 }} onChange={(e)=>updateCartHandler(cartItem, e)}>
                {/*@ts-ignore*/}
                {[...Array(cartItem.countInStock).keys()].map((x) => (
                    <Select.Option key={x + 1} value={x + 1}>
                      {x + 1}
                    </Select.Option>
                ))}
              </Select>
            </Row>
        );
      },
    },
    {
      title: "قیمت (ریال)",
      dataIndex: "price",
      width: 140,
      key: "price",
      render: (price: any) => {
        return (
            <Text className={styles["name-cell"]}>{price}</Text>
        );
      },
    },
  ];
  const steps = [
    {
      icon: <Login/>,
      id: 1,
      title: "عضویت",
      subtitle: "و ورود به فروشگاه",
    },
    {
      icon: <FileTextOutlined />,
      id: 2,
      title: "ثبت نام",
      subtitle: "و تکمیل اطلاعات",
    },
    {
      icon: <ShoppingCartOutlined />,
      id: 3,
      title: "انتخاب محصول",
      subtitle: "و افزودن به سبد خرید",
    },
    {
      icon: <CarryOutOutlined />,
      id: 4,
      title: "تسویه نهایی",
      subtitle: "و صدور فاکتور رسمی",
    },
    {
      icon: <ShopOutlined />,
      id: 5,
      title: "تحویل",
      subtitle: "در محل فروشگاه",
    },
  ];
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(()=>{
    setTotalAmount(cartItems.reduce((a, c) => a + c.quantity * c.price, 0));
  },[cartItems]);

  return (
      <div className={styles["container"]}>
        <Row className={styles["header"]}>
          <Button type="text" className={styles["back"]}>
            <a onClick={()=>router.back()}>
              <ArrowRightOutlined />
              بازگشت
            </a>
          </Button>
          <Text className={styles["your-cart"]}>سبد خرید شما</Text>
        </Row>
        {cartItems?.length ? (
            <Row>
              <Col span={18} className={styles["list"]}>
                <Table
                    className={styles["item"]}
                    pagination={false}
                    columns={columns}
                    dataSource={cartItems}
                />
                <Button className={styles["add-items"]} onClick={()=>router.back()}>
                  <a>
                    <InstagramOutlined />
                    افزودن کالاهای دیگر
                  </a>
                </Button>
              </Col>
              <TotalPrice
                  totalAmount={totalAmount}
                  title="جمع کالاها"
                  actionTitle="ادامه فرایند خرید"
                  action={checkoutHandler}
              />
            </Row>
        ) : (
            <EmptyCart />
        )}
        <Row className={styles["steps"]}>
          {steps.map((item) => {
            return (
                <Col key={item.id} className={styles["step"]}>
                  <Col className={styles["step-icon"]}>
                    {item.icon}
                    <Col className={styles["step-number"]}>
                      <Text>{item.id}</Text>
                    </Col>
                  </Col>
                  <Text className={styles["step-title"]}>{item.title}</Text>
                  <Divider />
                  <Text className={styles["step-subtitle"]}>
                    {item.subtitle}
                  </Text>
                </Col>
            );
          })}
        </Row>
      </div>
  );
};

export default CartDesktop;