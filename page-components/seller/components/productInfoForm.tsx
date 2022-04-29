import { Form, Input, InputNumber } from 'antd';
import styles from "./index.module.scss";
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
/* eslint-enable no-template-curly-in-string */

const ProductInfoForm = () => {
    const onFinish = (values) => {
        console.log(values);
    };

    return (
        <Form  name="nest-messages" className={styles["form"]} onFinish={onFinish} validateMessages={validateMessages}>

            <Form.Item name="productName">
                <Input placeholder="نام کالا" />
            </Form.Item>
            <Form.Item name="productionDate">
                <Input placeholder="تاریخ تولید" />
            </Form.Item>
            <Form.Item name="expirationDate">
                <Input placeholder="تاریخ انقضا" />
            </Form.Item>
            <Form.Item name="originalPrice">
                <Input placeholder="قیمت روی کالا" />
            </Form.Item>
            <Form.Item name="heyfesPrice">
                <Input placeholder="قیمت حیفه‌س" />
            </Form.Item>
            <Form.Item name="number">
                <InputNumber placeholder="تعداد" />
            </Form.Item>
            <Form.Item name="description" >
                <Input.TextArea placeholder="توضیحات" />
            </Form.Item>
            {/*<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>*/}
            {/*    <Button type="primary" htmlType="submit">*/}
            {/*        Submit*/}
            {/*    </Button>*/}
            {/*</Form.Item>*/}
        </Form>
    );
};

export default ProductInfoForm;