import { Form, Input, InputNumber,AutoComplete } from 'antd';
import styles from "./index.module.scss";
import {isPositiveNumber, isRequired} from "../../../../../common/miscellaneous/form-rules";
import DatePicker from "react-datepicker2";
import momentJalaali from "jalali-moment";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {Store} from "../../../../../utils/store";

const ProductInfoForm = ({setProductImageUrl,setSelectedProductId,formRef,onFinish,productionDate,expirationDate,setProductionDate,setExpirationDate}:{formRef:any;onFinish:any,productionDate:string;expirationDate:string;setExpirationDate:any;setProductionDate:any; setSelectedProductId:any; setProductImageUrl:any;}) => {
    const { state } = useContext(Store);
    const {userInfo} = state;
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get(`/api/products`, {
                headers: { authorization: `Bearer ${userInfo.token}` },
            });
            setProductList(data);
        };
        fetchProducts();
    }, []);

    const renderItem = (product: any) => ({
        value: product.slug,
        label: product.name,
    });

    const options = [...productList.map((product)=>renderItem(product))]

    const onSelect = (data: string) => {
        const selectedProduct = productList.filter((product)=> product.slug === data);
        formRef.setFieldsValue({productName: selectedProduct[0].name, description: selectedProduct[0].description});
        // @ts-ignore
        setSelectedProductId(selectedProduct[0]._id);
        setProductImageUrl(selectedProduct[0].image);
    };

    return (
        <Form form={formRef} name="nest-messages" className={styles["form"]} onFinish={onFinish}>
            <Form.Item name="productName" rules={[isRequired]}>
                <AutoComplete
                    dropdownMatchSelectWidth={300}
                    options={options}
                    onSelect={onSelect}
                >
                    <Input placeholder="نام کالا" />
                </AutoComplete>
            </Form.Item>
            <Form.Item name="productionDate" className={styles["date-picker"]} rules={[isRequired]}>
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
            <Form.Item name="expiryDate" className={styles["date-picker"]} rules={[isRequired]}>
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
            <Form.Item name="oldPrice" rules={[isRequired]}>
                <Input placeholder="قیمت روی کالا" />
            </Form.Item>
            <Form.Item name="price" rules={[isRequired]}>
                <Input placeholder="قیمت حیفه‌س" />
            </Form.Item>
            <Form.Item name="countInStock" rules={[isRequired,isPositiveNumber]}>
                <InputNumber placeholder="تعداد" />
            </Form.Item>
            <Form.Item name="description" >
                <Input.TextArea placeholder="توضیحات" disabled/>
            </Form.Item>
        </Form>
    );
};

export default ProductInfoForm;