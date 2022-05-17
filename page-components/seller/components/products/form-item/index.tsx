import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Typography,
  notification
} from "antd";
import Delete from "../../../../../public/icons/delete.svg";
import Edit from "../../../../../public/icons/edit.svg";
import moment from "jalali-moment";
import { Dispatch,SetStateAction,useEffect, useState } from "react";
import styles from "./index.module.scss";
import rialiNumber from "../../../../../common/functions/riali-number"
const FormItem = ({
  initialValues,
  index,
  form,
  setListData,
  listData
}: {
  initialValues: any;
  index?: number;
  form?: any;
  setListData: Dispatch<SetStateAction<any[]>>;
  listData: any[];
}) => {
  const [editProduct, setEditProduct] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [idx, setIdx] = useState<number>(0);
  const [formRef] = Form.useForm();

  useEffect(() => {
    formRef.setFieldsValue(initialValues);
  }, [initialValues]);

  useEffect(() => {
    if (index) {
      setIdx(index);
    }
  }, [index]);

  const onSubmit = async (DTO: any) => {
    setEditProduct(!editProduct);
    const formData = formRef.getFieldsValue(true);
    const data: any = {
      originalPrice: Number(formData?.originalPrice),
      heyfesPrice: Number(DTO?.heyfesPrice),
      quantity: Number(DTO?.quantity),
      expirationDate: formData?.expirationDate,
      productionDate: formData?.productionDate,
      productName: formData?.productName,
    };
    formRef?.setFieldsValue(data);
    // await clientApi.offers
    //     .offerControllerUpdateOffer(initialValues?.id, data)
    //     .then((res) => {
    //       const obj = {
    //         price: res?.data?.price,
    //         oldPrice: res?.data?.oldPrice,
    //         rangeQuantity: res?.data?.rangeQuantity,
    //         remainimaxQuantityngAmount: res?.data?.maxQuantity,
    //         isSpecial: res?.data?.isSpecial,
    //       };
    //       formRef?.setFieldsValue(obj);
    //       setEditOffer(!editOffer);
    //     })
    //     .finally(() =>
    //         notification.open({
    //           message: "عملیات با موفقیت انجام شد.",
    //         }),
    //     );
  };
  const handleDeleteOffer = async () => {
    // await clientApi.offers
    //   .offerControllerDeleteOfferByUser(initialValues?.id)
    //   .then(() => {
    //
    //     setIsModalVisible(false);
    //   })
    //   .finally(() => {
    //     setOffersListData(offersListData.filter(item => item?.id !== initialValues?.id))
    //       notification.open({
    //         message: "درخواست شما با موفقیت حذف شد.",
    //       })
    //     }
    //   );
  };

  return (
    <>
      <Form form={formRef} onFinish={onSubmit}>
        <Row
          justify="space-between"
          className={styles["container"]}
        >
          <Col flex="26px">
            <Form.Item name="id">
              <Typography.Text>{initialValues?.id}</Typography.Text>
            </Form.Item>
          </Col>
          <Col flex="129px">
            <Form.Item name="productName">
              <Typography.Text>{initialValues?.productName}</Typography.Text>
            </Form.Item>
          </Col>
          <Col flex="65px">
            <Form.Item name="productionDate">
              <Typography.Text>{moment(initialValues?.productionDate).format("jYYYY/jM/jD")}</Typography.Text>
            </Form.Item>
          </Col>
          <Col flex="65px">
            <Form.Item name="expirationDate">
              <Typography.Text>{moment(initialValues?.expirationDate).format("jYYYY/jM/jD")}</Typography.Text>
            </Form.Item>
          </Col>
          {editProduct ? (
            <Col flex="90px">
              <Form.Item name="quantity">
                <Input
                  onChange={(e) => {
                    const listData = form.getFieldsValue(true);
                    listData.items[idx].quantity = Number(e.target.value);
                    form.setFieldsValue(listData);
                  }}
                />
              </Form.Item>
            </Col>
          ) : (
            <Col flex="38px" id="max-quantity">
              <Form.Item name="quantity">
                <Typography.Text>{initialValues?.quantity}</Typography.Text>
              </Form.Item>
            </Col>
          )}
          <Col flex="123px">
            <Form.Item name="originalPrice">
              <Typography.Text>{rialiNumber(initialValues?.originalPrice)}</Typography.Text>
            </Form.Item>
          </Col>
          <Col flex="104px">
            <Form.Item name="heyfesPrice">
              {editProduct ? (
                  <Input
                      onChange={(e) => {
                        const listData = form.getFieldsValue(true);
                        listData.items[idx].heyfesPrice = Number(e.target.value);
                        form.setFieldsValue(listData);
                      }}
                  />
              ) : (
                  <Typography.Text>{rialiNumber(initialValues?.heyfesPrice)}</Typography.Text>
              )}
            </Form.Item>
          </Col>
          {editProduct ? (
            <Col flex="126px">
              <Row align="middle" className={styles["btn-container"]}>
                <Button id="submit" onClick={() => formRef?.submit()}>
                  ثبت
                </Button>
                <Button id="cancel" onClick={() => setEditProduct(!editProduct)}>
                  انصراف
                </Button>
              </Row>
            </Col>
          ) : (
            <>
              <Col flex="38px">
                <Form.Item name="edit">
                  <Button
                    icon={<Edit />}
                    className={styles["edit-btn"]}
                    onClick={() => setEditProduct(!editProduct)}
                  />
                </Form.Item>
              </Col>
              <Col flex="38px">
                <Form.Item name="delete">
                  <Button
                    icon={<Delete />}
                    className={styles["edit-btn"]}
                    onClick={() => setIsModalVisible(!isModalVisible)}
                  />
                </Form.Item>
              </Col>
            </>
          )}
        </Row>
      </Form>
      <Modal
        title="حذف محصول"
        centered
        visible={isModalVisible}
        onOk={() => handleDeleteOffer()}
        onCancel={() => setIsModalVisible(false)}
        cancelText="انصراف"
        okText="تایید"
        okType="danger"
        style={{ textAlign: "right" }}
        className={styles["modal"]}
        closeIcon={false}
      >
        <div> آیا از حذف محصول مطمئن هستید؟</div>
      </Modal>
    </>
  );
};
export default FormItem;
