import { Col, Form, Row } from "antd";
import styles from "./index.module.scss";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import FormItem from "../form-item/index";


const FormList = ({
                         listData,
                         formRef,
                         setListData,
                       }: {
  listData: any[];
  formRef?: any;

  setListData: Dispatch<SetStateAction<any[]>>;
}) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    formRef.resetFields();
    formRef?.setFieldsValue({ items: listData });
  }, [listData]);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <Form
      layout="vertical"
      form={formRef}
      className={styles["container"]}
    >
      <Col span={24} className={styles["container"]}>
        <Row gutter={width <= 1230 ? 10 : 5} justify="space-between">
          <Col flex="46px"></Col>
          <Col flex="129px">نام کالا</Col>
          <Col flex="65px">تاریخ تولید</Col>
          <Col flex="65px">تاریخ انقضا</Col>
          <Col flex="38px">تعداد</Col>
          <Col flex="123px">قیمت بدون تخفیف (ریال)</Col>
          <Col flex="104px">قیمت با تخفیف (ریال)</Col>
          <Col flex="38px">ویرایش</Col>
          <Col flex="78px">حذف</Col>
        </Row>
        <Form.List name="items" initialValue={[1]}>
          {(fields) => (
            <Row gutter={5} justify="space-between">
              <Col span={24}>
                {fields.map((field, index) => (
                  <FormItem
                    key={field.key}
                    initialValues={formRef.getFieldValue(["items"])[index]}
                    index={index}
                    form={formRef}
                    setListData={setListData}
                    listData={listData}
                  />
                ))}
              </Col>
            </Row>
          )}
        </Form.List>
      </Col>
    </Form>
  );
};
export default FormList;
