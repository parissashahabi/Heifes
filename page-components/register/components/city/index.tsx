import {Col, Image, Row, Select, Button} from "antd";
import styles from "./index.module.scss"
import Location from "../../../../public/icons/location.svg"

const { Option } = Select;

const CitySelection = ({setSelectedCity,submitHandler,selectedCity}:{setSelectedCity:any;submitHandler:any;selectedCity:number})=>{

    const {  ostan } = require('iran-cities-json');
    function handleChange(value) {
        setSelectedCity(value)
    }
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
                <Button onClick={()=>{ if(selectedCity) submitHandler() }}>ورود به حیفه‌‌س</Button>
            </Col>

        </Row>
    </Col>
}
export default CitySelection