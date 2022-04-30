import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  Button,
  Col,
  Divider,
  InputNumber,
  Row,
  Table,
  Typography,
  Modal,
} from "antd";
import Login from "../../../../public/icons/login.svg"
import styles from "./styles/cart.module.scss";
import EmptyCart from "../common/empty-cart";
import Link from "next/link";
import {
  handleReduceAmount,
  handleAddAmount,
  handleChange,
  handleRemove,
  handleValidateCartItem,
} from "../desktop/services/index";
import debounce from "lodash.debounce";

import { parseAmount } from "../../../../common/functions/parse-amount";
import { useRouter } from "next/router";
import {
  ArrowRightOutlined,
  CarryOutOutlined,
  FileTextOutlined,
  InstagramOutlined,
  LoadingOutlined,
  LoginOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import TotalPrice from "./components/total-price";
import { SizeProps, sizes } from "../../../../common/miscellaneous/sizes";
import { ColumnsType } from "antd/lib/table/Table";

type PropType = {
  cartList: any[];
  setCartList: Dispatch<SetStateAction<any[]>>;
  totalAmount: number;
  setCartItemCount: any;
  validateModal: boolean;
  setValidateModal: Dispatch<SetStateAction<boolean>>;
};

const CartDesktop = (props: PropType & SizeProps) => {
  const {
    cartList,
    setCartList,
    totalAmount,
    setCartItemCount,
    validateModal,
    setValidateModal,
  } = props;
  const { Text, Title } = Typography;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);

  const columns: ColumnsType<any> = [
    {
      key: "action",
      dataIndex: "offer",
      render: (offer: any, cartItemResponseDto: any) => {
        return (
          <span
            onClick={() =>
              handleRemove(
                cartItemResponseDto.id,
                setCartList,
                setCartItemCount
              )
            }
            className={styles["remove"]}
          >
            {/* <Close /> */}
          </span>
        );
      },
    },
    {
      title: "نام کالا",
      dataIndex: "offer",
      width: 200,
      key: "name",
      render: (offer: any) => {
        return <Text>{offer?.productName}</Text>;
      },
    },
    {
      title: "قیمت (ریال)",
      dataIndex: "offer",
      width: 140,
      key: "price",
      render: (offer: any, cartItemResponseDto: any) => {
        return (
          <Text className={styles["name-cell"]}>{`هر ${
            offer?.unit
          } ${parseAmount(cartItemResponseDto?.pricePerUnit)} ریال`}</Text>
        );
      },
    },
    {
      title: "میزان درخواستی",
      key: "amount",
      width: 120,
      dataIndex: "offer",
      render: (offer: any, cartItemResponseDto: any, index: number) => {
        return loading ? (
          <LoadingOutlined />
        ) : (
          <Row className={styles["counter"]}>
            <Row className={styles["counter-actions"]}>
              {/* <Plus
                onClick={() =>
                  handleAddAmount(debouncedSave, index, setCartList, setLoading)
                }
                className={styles["plus"]}
              />
              <Minus
                onClick={() =>
                  handleReduceAmount(
                    debouncedSave,
                    index,
                    setCartList,
                    setLoading
                  )
                }
                className={styles["minus"]}
              /> */}
            </Row>
            <InputNumber
              className={styles["amount"]}
              size="small"
              min={0}
              value={cartItemResponseDto?.quantity}
              max={Number.MAX_SAFE_INTEGER}
              defaultValue={cartItemResponseDto?.quantity}
              onChange={(value) =>
                handleChange(
                  debouncedSave,
                  value,
                  index,
                  setCartList,
                  setLoading
                )
              }
            />
            <Col className={styles["unit"]}>{offer?.unit}</Col>
          </Row>
        );
      },
    },
    {
      title: "مبلغ کل",
      dataIndex: "totalPrice",
      key: "total",
      width: 130,
      render: (text: string) => {
        return (
          <>
            <Text>{`${parseAmount(text)} ریال`}</Text>
          </>
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

  const debouncedSave = useCallback(
    debounce(
      (
        cartItemId: number,
        quantity: number,
        setLoading: Dispatch<SetStateAction<boolean>>
      ) => {
        setLoading(true);
        // clientApi.cartItems
        //   .cartItemControllerUpdateCartItem(cartItemId, { quantity: quantity })
        //   .then((res) => {
        //     setCartList(res.data);
        //     setLoading(false);
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //     setLoading(false);
        // });
      },
      2000
    ),
    []
  );

  useEffect(() => {
    return () => {
      debouncedSave.cancel();
    };
  }, []);

  const handleCancel = () => {
    setValidateModal(false);
  };

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
      {listLoading ? (
        <Row justify={"center"} style={{ padding: "40px" }}>
          <LoadingOutlined />
        </Row>
      ) : (
        <>
          {cartList.length ? (
            <Row>
              <Col span={18} className={styles["list"]}>
                <Table
                  className={styles["item"]}
                  pagination={false}
                  columns={columns}
                  dataSource={cartList}
                />
                <Button className={styles["add-items"]}>
                  <Link href="/store">
                    <a>
                      <InstagramOutlined />
                      افزودن کالاهای دیگر
                    </a>
                  </Link>
                </Button>
              </Col>
              <TotalPrice
                totalAmount={totalAmount}
                title="جمع کالاها"
                action={() =>
                  handleValidateCartItem(
                    router,
                    setValidateModal,
                    setCartList,
                    setListLoading,
                    "/payment-process?state=complete-info"
                  )
                }
                actionTitle="ادامه فرایند خرید"
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
        </>
      )}
      {!props.sm && (
        <Modal
          footer={[
            <Button
              className={styles["validate-modal-ok"]}
              key="back"
              onClick={handleCancel}
            >
              متوجه شدم
            </Button>,
          ]}
          cancelButtonProps={{ hidden: true }}
          okButtonProps={{ hidden: true }}
          className={styles["validate-modal"]}
          visible={validateModal}
          onOk={handleCancel}
          onCancel={handleCancel}
        >
          <Col className={styles["validate-modal-header"]} />
          <Col className={styles["validate-modal-content"]}>
            <Title className={styles["validate-modal-title"]}>
              کالای مورد نظر شما به دلایل زیر از لیست سبد خرید حذف شد.
            </Title>
            <Title className={styles["validate-modal-subtitle"]}>
              -موجودی کالا به اتمام رسیده است.
            </Title>
            <Title className={styles["validate-modal-subtitle"]}>
              - قیمت کالا تغییر کرده است.
            </Title>
            <Title className={styles["validate-modal-subtitle"]}>
              - میزان درخواستی شما از موجودی کالا بیشتر است.
            </Title>
          </Col>
        </Modal>
      )}
    </div>
  );
};

export default sizes(CartDesktop);
