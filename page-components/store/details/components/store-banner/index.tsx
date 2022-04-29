import {Row, Typography, Col, Select} from "antd";
import styles from "./index.module.scss";
import ArrowDown from "../../../../../public/icons/arrowDown.svg"
import Location from "../../../../../public/icons/location.svg"
import Clock from "../../../../../public/icons/clock.svg"
const StoreBanner = ({storeName, stores, storeAddress, storeOpenHours}:{storeName: string; stores: any[]; storeAddress: string; storeOpenHours}) => {
  return (
    <>
      <Row className={styles["container"]}>
       <Row align="middle">
        <Typography.Title level={5}>خرید از {storeName}</Typography.Title>
           <Select
               // onChange={handleCheckBox}
               maxTagCount="responsive"
               placeholder="تغییر فروشگاه"
               suffixIcon={<ArrowDown/>}
               className={styles["select"]}
           >
               {stores?.map((item) => (
                   <Select.Option value={item} key={item}>
                       {item}
                   </Select.Option>
               ))}
           </Select>
       </Row>
          <Row>
              <Location id="loaction"/>
        <Typography.Text id="address">
            {storeAddress}
        </Typography.Text>
              <span style={{marginRight:"30px", display:"flex"}}>

              <Clock id="clock"/>
        <Typography.Text id="open-hours">
            تحویل از ساعت {storeOpenHours}
        </Typography.Text>
              </span>
          </Row>
      </Row>
    </>
  );
};

export default StoreBanner;
