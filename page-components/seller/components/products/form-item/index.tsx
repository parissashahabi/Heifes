import {
  Button,
  Col,
  Form,
  Input, message,
  Modal,
  Row,
  Typography,
} from "antd";
import axios from "axios";
import Delete from "../../../../../public/icons/delete.svg";
import Edit from "../../../../../public/icons/edit.svg";
import moment from "jalali-moment";
import {Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import styles from "./index.module.scss";
import rialiNumber from "../../../../../common/functions/riali-number"
import {Store} from "../../../../../utils/store";
import {getError} from "../../../../../utils/error";

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
  const { state } = useContext(Store);
  const { userInfo } = state;

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

    const query: any = {
      price: Number(DTO?.price),
      countInStock: Number(DTO?.countInStock),
    };
    formRef?.setFieldsValue(query);
    try {
      const {data} = await axios.put(
          `/api/stocks/update/${initialValues._id}`, query, { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
      const listDataTemp = form.getFieldsValue(true);
      listDataTemp.items[idx] = data;
      form.setFieldsValue(listDataTemp);

      const newListData = [...listData];
      newListData[idx] = {...data, product_details_list: { name: listData[idx].product_details_list.name , slug: listData[idx].product_details_list.slug}};
      setListData(newListData);

      message.success("اطلاعات محصول با موفقیت ذخیره شد.");
  } catch (err) {
      formRef.setFieldsValue(formData);
      message.error(getError(err));
    }
  }

  const handleDeleteOffer = async () => {
    try {
      await axios.delete(`/api/stocks/delete/${initialValues._id}`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      setListData(listData.filter(item => item?._id !== initialValues?._id))
      message.success('محصول با موفقیت حذف شد.');
    } catch (err) {
      message.error(getError(err));
    }
  };

  return (
    <>
      <Form form={formRef} onFinish={onSubmit}>
        <Row
          justify="space-between"
          className={styles["container"]}
        >
          <Col flex="26px">
            <Form.Item name={["product_details_list","slug"]}>
              <Typography.Text>{initialValues?.product_details_list?.slug}</Typography.Text>
            </Form.Item>
          </Col>
          <Col flex="129px">
            <Form.Item name={["product_details_list","name"]}>
              <Typography.Text>{initialValues?.product_details_list?.name}</Typography.Text>
            </Form.Item>
          </Col>
          <Col flex="65px">
            <Form.Item name="productionDate">
              <Typography.Text>{moment(initialValues?.productionDate).format("jYYYY/jM/jD")}</Typography.Text>
            </Form.Item>
          </Col>
          <Col flex="65px">
            <Form.Item name="expiryDate">
              <Typography.Text>{moment(initialValues?.expiryDate).format("jYYYY/jM/jD")}</Typography.Text>
            </Form.Item>
          </Col>
          {editProduct ? (
            <Col flex="90px">
              <Form.Item name={["countInStock"]}>
                <Input
                  onChange={(e) => {
                    const listData = form.getFieldsValue(true);
                    listData.items[idx].countInStock = Number(e.target.value);
                    form.setFieldsValue(listData);
                  }}
                />
              </Form.Item>
            </Col>
          ) : (
            <Col flex="38px" id="max-quantity">
              <Form.Item name={["countInStock"]}>
                <Typography.Text>{initialValues?.countInStock}</Typography.Text>
              </Form.Item>
            </Col>
          )}
          <Col flex="123px">
            <Form.Item name={["oldPrice"]}>
              <Typography.Text>{rialiNumber(initialValues?.oldPrice)}</Typography.Text>
            </Form.Item>
          </Col>
          <Col flex="104px">
            <Form.Item name={["price"]}>
              {editProduct ? (
                  <Input
                      onChange={(e) => {
                        const listData = form.getFieldsValue(true);
                        listData.items[idx].price = Number(e.target.value);
                        form.setFieldsValue(listData);
                      }}
                  />
              ) : (
                  <Typography.Text>{rialiNumber(initialValues?.price)}</Typography.Text>
              )}
            </Form.Item>
          </Col>
          {editProduct ? (
            <Col flex="126px">
              <Row align="middle" className={styles["btn-container"]}>
                <Button id="submit" onClick={() => formRef?.submit()}>
                  ثبت
                </Button>
                <Button id="cancel" onClick={() => {
                  const listDataTemp = form.getFieldsValue(true);
                  listDataTemp.items[idx].price = listData[idx].price;
                  listDataTemp.items[idx].countInStock = listData[idx].countInStock;
                  form.setFieldsValue(listDataTemp);
                  setEditProduct(!editProduct)
                }}>
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
                    className={styles["delete-btn"]}
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
