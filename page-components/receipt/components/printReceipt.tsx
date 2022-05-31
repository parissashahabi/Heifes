import { Col, Divider, Row } from "antd";
import moment from "moment-jalaali";
import style from "./print.module.scss";
import { parseAmount } from "../../../common/functions/parse-amount";


const PrintReceipt =({PassRef, order, userInfo}:{PassRef: any; order:any; userInfo:any})=> {
    return (<Col ref={PassRef} className={style["print-mode"]}>
                <Row align="middle" justify="space-between" className="mb-1">
                    <Col>
                        <img
                            className={style["logo"]}
                            src="/images/headerLogo.svg"
                            alt="حیفه‌س"
                        />
                    </Col>

                    <div className={style["title"]}>برگه رسید خرید</div>
                    <Col className={style["title-info"]}>
                        <Row>
                            <div> کد پیگیری: </div>
                            <div> {order?.trackingCode}</div>
                        </Row>
                        <Row>
                            <div> شناسه خرید: </div>
                            <div> {order?._id}</div>
                        </Row>
                    </Col>
                </Row>
                <Divider />
                {/* ####################################  */}
                {/* ############ print body ############  */}
                {/* ####################################  */}
                <Col className={style["information"]}>
                    <Row align="middle" justify="space-between">
                        <Col>
                            <span>صاحب کالا: </span>
                            <span>{userInfo?.name}</span>
                        </Col>
                        <Col>
                            <span>تاریخ: </span>
                            <span>{moment(order?.createdAt).format("jYYYY/jM/jD")}</span>
                        </Col>
                    </Row>
                    <Row
                        align="middle"
                        justify="space-between"
                        style={{ marginTop: "12px" }}
                    >
                        <Col>
                            <span>نام فروشگاه: </span>
                            <span>{order?.supermarketId?.name}</span>
                        </Col>
                        <Col>
                            <span>ساعت: </span>
                            {moment(order?.createdAt).format("HH:mm")}
                        </Col>
                    </Row>
                    <Row
                        align="middle"
                        justify="space-between"
                        style={{ marginTop: "12px" }}
                    >
                        <Col>
                            <span>آدرس فروشگاه: </span>
                            <span>{order?.supermarketId?.address}</span>
                        </Col>
                        <Col>
                            <span>ساعات کاری: </span>
                            <span>از: {moment(order?.supermarketId?.workingHours?.from).format("HH:mm")} تا: {moment(order?.supermarketId?.workingHours?.to).format("HH:mm")}</span>
                        </Col>
                    </Row>
                </Col>
                <Row align="middle" justify="center" style={{ marginTop: "12px" }}>
                    <Col span={24}>
                        <table>
                            <tr>
                                <th>ردیف</th>
                                <th style={{ width: "40%" }}>نام کالا</th>
                                <th>تعداد</th>
                                <th>قیمت (ریال)</th>
                            </tr>

                            {order?.orderItems?.map((node, index) => {
                                return (
                                    <tr key={node._id}>
                                        <td>{index + 1}</td>
                                        <td style={{width: "40%"}}>
                                            {node?.product_details_list?.name}
                                        </td>
                                        <td>{node?.quantity}</td>
                                        <td>{parseAmount(node?.price)}</td>
                                    </tr>
                                );
                            })}

                            <tr className={style["custom-table"]}>
                                <td></td>
                                <td></td>
                                <td className={style["text-left"]}>جمع کل: </td>
                                <td className={style["has-border"]}>
                                    {parseAmount(order?.itemsPrice)}
                                </td>
                                <td></td>
                            </tr>
                        </table>
                    </Col>
                </Row>
        <hr className={style["custom-hr"]} />
                <Row align="middle" justify="start">
                    <Col span={6} className="mt-5">
                        <Row justify="space-between">
                            <span>مالیات: </span>
                            <span>{parseAmount(order?.taxPrice)} ریال </span>
                        </Row>
                        <Row justify="space-between" style={{ marginTop: "12px" }}>
                            <span>جمع سبد خرید: </span>
                            <span>{parseAmount(order?.totalPrice)} ریال </span>
                        </Row>
                    </Col>
                </Row>


    </Col>)
};
export default PrintReceipt;