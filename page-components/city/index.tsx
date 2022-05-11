import {Col, Image, Row, Select, Button} from "antd";
import styles from "./index.module.scss"
import {useEffect, useState} from "react";
import Location from "../../public/icons/location.svg"
import {useRouter} from "next/router";

const { Option } = Select;

const CitySelection = ()=>{
    const [selectedCity, setSelectedCity] =useState("");
const {  ostan } = require('iran-cities-json');
    const router = useRouter();
    function handleChange(value) {
        setSelectedCity(value)
        console.log(`selected ${value}`);
    }
    useEffect(()=>{
        console.log(ostan);
    },[ostan])
    return <Col className={styles["container"]}>
        <Row className={styles["LogoDesktop"]} justify="center">
            <Image
                alt="header-logo"
                src="/images/headerLogo.svg"
                preview={false}
            />
        </Row>
        <Row justify="center" className={styles["select"]}>
            <Col xl={5} lg={7} md={9} sm={11} xs={13}>
                <Select
                    suffixIcon={<Location/>}
                    onChange={handleChange}
                    placeholder="شهر خود را انتخاب کنید"
                >
                    {ostan.map(item => (
                        <Option key={item.id}>{item.name}</Option>
                    ))}
                </Select>
                <Button onClick={()=>router.push("/store/65")}>ورود به حیفه‌‌س</Button>
            </Col>

        </Row>
    </Col>
}
export default CitySelection