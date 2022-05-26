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
import styles from "./styles/cart.module.scss";
import EmptyCart from "../common/empty-cart";
import { useRouter } from "next/router";
import {
  PlusOutlined,
  CarryOutOutlined,
  FileTextOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  CloseOutlined,
  LoginOutlined
} from "@ant-design/icons";
import TotalPrice from "./components/total-price";
import { ColumnsType } from "antd/lib/table/Table";
import ArrowRight from "../../../../public/icons/arrowRight.svg";

const CartDesktop = ({cartItems,checkoutHandler, removeItemHandler, updateCartHandler}: { cartItems: any[]; removeItemHandler: any; updateCartHandler:any; checkoutHandler:any}) => {
  const { Text } = Typography;
  const router = useRouter();
  const [totalAmount, setTotalAmount] = useState(0);
  const columns: ColumnsType<any> = [
    {
      key: "action",
      dataIndex: "action",
      width: 1,
      render: (action: any, cartItem: any) => {
        return (
            <span
                className={styles["remove"]}
                onClick={()=>removeItemHandler(cartItem)}
            >
            <CloseOutlined />
          </span>
        );
      },
    },
    {
      title: "نام کالا",
      dataIndex: ["product_details_list","name"],
      width: 300,
      key: "name",
      align: "right",
      render: (name: any) => {
        return <Text>{name}</Text>;
      },
    },
    {
      title: "تعداد",
      key: "quantity",
      width: 220,
      dataIndex: "quantity",
      align: "center",
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
      width: 240,
      key: "price",
      align: "center",
      render: (price: any) => {
        return (
            <Text className={styles["name-cell"]}>{price}</Text>
        );
      },
    },
  ];
  const steps = [
    {
      icon: <LoginOutlined />,
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

  useEffect(()=>{
    setTotalAmount(cartItems.reduce((a, c) => a + c.quantity * c.price, 0));
  },[cartItems]);

  return (
      <div className={styles["container"]}>
        <Row className={styles["container-header"]}>
          <Col flex="100px"  className={styles["return"]} onClick={()=>router.back()}>
            <ArrowRight/>
            <Text > بازگشت</Text>
          </Col>
          <Col flex="auto" className={styles["title"]} >
            <Text className={styles["your-cart"]}>سبد خرید شما</Text>
          </Col>
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
                <Button className={styles["add-items"]} onClick={()=>router.push(`/store/${cartItems[0].supermarketId}`)} icon={<PlusOutlined />}>
                    افزودن کالاهای دیگر
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