import { Form, Input, InputNumber } from 'antd';
import styles from "./index.module.scss";
import {isPositiveNumber, isRequired} from "../../../common/miscellaneous/form-rules";
import DatePicker from "react-datepicker2";
import momentJalaali from "jalali-moment";
// import GrayCalendar from "../../../public/icons/greyCalendar.svg"
const ProductInfoForm = ({formRef,onFinish,productionDate,expirationDate,setProductionDate,setExpirationDate}:{formRef:any;onFinish:any,productionDate:string;expirationDate:string;setExpirationDate:any;setProductionDate:any}) => {
    return (
        <Form form={formRef} name="nest-messages" className={styles["form"]} onFinish={onFinish}>
            <Form.Item name="productName" rules={[isRequired]}>
                <Input placeholder="نام کالا" />
            </Form.Item>
            <Form.Item name="productionDate" className={styles["date-picker"]}>
                {/*<GrayCalendar />*/}
                <DatePicker
                    value={productionDate ? momentJalaali(productionDate, "jYYYY/jM/jD") : undefined}
                    isGregorian={false}
                    timePicker={false}
                    inputReadOnly
                    // @ts-ignore
                    placeholder="تاریخ تولید"
                    onChange={(e) => {
                        setProductionDate(e?._d);
                        // formRef.setFieldsValue({ productionDate: e?._d });
                    }}
                />
            </Form.Item>
            <Form.Item name="expirationDate" className={styles["date-picker"]}>
                {/*<GrayCalendar />*/}
                <DatePicker
                    value={expirationDate ? momentJalaali(expirationDate, "jYYYY/jM/jD") : undefined}
                    isGregorian={false}
                    timePicker={false}
                    inputReadOnly
                    // tetherAttachment={ "position"}
                    // @ts-ignore
                    placeholder="تاریخ انقضا"
                    onChange={(e) => {
                        setExpirationDate(e?._d)
                        // formRef.setFieldsValue({ expirationDate: e?._d });
                    }}
                />
            </Form.Item>
            <Form.Item name="originalPrice">
                <Input placeholder="قیمت روی کالا" />
            </Form.Item>
            <Form.Item name="heyfesPrice">
                <Input placeholder="قیمت حیفه‌س" />
            </Form.Item>
            <Form.Item name="quantity" rules={[isPositiveNumber]}>
                <InputNumber placeholder="تعداد" />
            </Form.Item>
            <Form.Item name="description" >
                <Input.TextArea placeholder="توضیحات" />
            </Form.Item>
        </Form>
    );
};

export default ProductInfoForm;