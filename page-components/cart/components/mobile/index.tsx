// import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
// import ArrowRight from "common/icons/ArrowRight";
// import ArrowLeft from "common/icons/ArrowLeft";
// import Bin from "common/icons/Bin";
// import { Button, Col, Row, Typography, Affix, Drawer } from "antd";
// import Plus from "common/icons/Plus";
// import Minus from "common/icons/Minus";
// import styles from "./styles/cart-mobile.module.scss";
// import EmptyCart from "../common/empty-cart";
// import { BaseCustomerCartItemResponseDto } from "@/services/global";
// import Link from "next/link";
// import { parseAmount } from "@/common/functions/parse-amount";
// import {
//   handleAddAmount,
//   handleReduceAmount,
//   handleRemove,
//   handleValidateCartItem,
// } from "@/page-components/cart/components/desktop/services";
// import debounce from "lodash.debounce";
// import clientApi from "@/services/interceptor";
// import { useRouter } from "next/router";
// import { LoadingOutlined } from "@ant-design/icons";
// import TotalAmountMobile from "@/page-components/cart/components/mobile/compoents/total-price";
// import { SizeProps, sizes } from "@/common/miscellaneous/sizes";

// const { Text, Title } = Typography;
// type PropType = {
//   cartList: BaseCustomerCartItemResponseDto[];
//   setCartList: Dispatch<SetStateAction<BaseCustomerCartItemResponseDto[]>>
//   totalAmount: number;
//   setCartItemCount: any;
//   validateModal: boolean;
//   setValidateModal: Dispatch<SetStateAction<boolean>>;
// };
// const CartMobile = (props: PropType & SizeProps) => {
//   const router = useRouter();
//   const { cartList, setCartList, totalAmount, setCartItemCount, validateModal, setValidateModal } = props;
//   const [loading, setLoading] = useState(false);
//   const [listLoading, setListLoading] = useState(false);

//   const debouncedSave = useCallback(debounce((cartItemId: number, quantity: number, setLoading: Dispatch<SetStateAction<boolean>>) => {
//     setLoading(true);
//     clientApi.cartItems.cartItemControllerUpdateCartItem(cartItemId, { quantity: quantity }).then(res => {
//       setCartList(res.data);
//       setLoading(false);
//     }).catch(err => {
//       console.log(err);
//       setLoading(false);
//     });
//   }, 2000), []);

//   useEffect(() => {
//     return () => {
//       debouncedSave.cancel();
//     };
//   }, []);

//   const onClose = () => {
//     setValidateModal(false);
//   };

//   return (
//     <Row className={styles["wrapper"]}>
//       {listLoading ? <Row justify={"center"} style={{ padding: "40px" }}>
//         <LoadingOutlined />
//       </Row> : cartList.length ? <>
//         <Row className={styles["container"]}>
//           <Row className={styles["header"]}>
//             <Button ghost className={styles["back"]}><Link href="/store"><a><ArrowRight /></a></Link></Button>
//             <Text>سبد خرید</Text>
//           </Row>
//           {cartList.map((item, index) => {
//             return <Row key={item?.id} className={styles["item"]}>
//               <Row justify={"space-between"} style={{ width: "100%" }}>
//                 <Col span={20}><Text>{item?.offer?.productName}</Text></Col>
//                 <Col className={styles["remove"]}
//                      onClick={() => handleRemove(item.id, setCartList, setCartItemCount)}><Bin /></Col>
//               </Row>
//               <Row align={"middle"}>
//                 <Row className={styles["counter"]}>
//                   {loading ? <LoadingOutlined /> : <>
//                     <Plus onClick={() => handleAddAmount(debouncedSave, index, setCartList, setLoading)} />
//                     <Text>{item?.quantity}</Text>
//                     <Minus onClick={() => handleReduceAmount(debouncedSave, index, setCartList, setLoading)} />
//                   </>}
//                 </Row>
//                 <Text className={styles["title"]}>{item?.offer?.unit}</Text>
//               </Row>
//               <Text className={styles["price"]}>{parseAmount(item?.pricePerUnit)}</Text>
//             </Row>;
//           })}
//           <Button className={styles["add-items"]}><Link href="/store"><a><Plus />افزودن کالاهای
//             دیگر</a></Link></Button>
//         </Row>
//         <TotalAmountMobile totalAmount={totalAmount} />
//         <Affix offsetBottom={0} className={styles["bottom-box"]}>
//           <Row className={styles["holder"]}>
//             <Col>
//               <Button className={styles["proceed"]}
//                       onClick={() => handleValidateCartItem(router, setValidateModal, setCartList, setListLoading, setCartItemCount)}>ادامه
//                 فرایند
//                 خرید<ArrowLeft /></Button>
//             </Col>
//             <Col style={{ paddingRight: "1.6rem" }}>
//               <Row>
//                 <Text className={styles["bottom-box-price-txt"]}>مبلغ قبل پرداخت:</Text>
//               </Row>
//               <Row>
//                 <Text className={styles["bottom-box-price"]}>{parseAmount(totalAmount)} ریال</Text>
//               </Row>
//             </Col>
//           </Row>
//         </Affix>
//       </> : <Col className={styles["container"]}>
//         <Row className={styles["header"]}>
//           <Button ghost className={styles["back"]}><Link href="/store"><a><ArrowRight /></a></Link></Button>
//           <Text>سبد خرید</Text>
//         </Row>
//         <EmptyCart />
//       </Col>}
//       {props.sm && <Drawer
//         placement="bottom"
//         onClose={onClose}
//         visible={validateModal}
//         className={styles["validate-drawer"]}
//       >
//         <Col className={styles["validate-drawer-header"]} />
//         <Col className={styles["validate-drawer-content"]}>
//           <Title className={styles["validate-drawer-title"]}>کالای مورد نظر شما به دلایل زیر از لیست سبد خرید حذف
//             شد.</Title>
//           <Title className={styles["validate-drawer-subtitle"]}>-موجودی کالا به اتمام رسیده است.</Title>
//           <Title className={styles["validate-drawer-subtitle"]}>- قیمت کالا تغییر کرده است.</Title>
//           <Title className={styles["validate-drawer-subtitle"]}>- میزان درخواستی شما از موجودی کالا بیشتر
//             است.</Title></Col>
//       </Drawer>}
//     </Row>
//   );
// };

// export default sizes(CartMobile);
