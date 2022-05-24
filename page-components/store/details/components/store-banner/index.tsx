import {Row, Typography, Select} from "antd";
import styles from "./index.module.scss";
import ArrowDown from "../../../../../public/icons/arrowDown.svg"
import Location from "../../../../../public/icons/location.svg"
import {
    ClockCircleOutlined,
} from '@ant-design/icons';
import moment from "jalali-moment";
import {router} from "next/client";
const StoreBanner = ({storeName, stores, storeAddress, storeOpenHours}:{storeName: string; stores: any[]; storeAddress: string; storeOpenHours}) => {
    const handleChange = (value: string) => {
        router.replace(`/store/${value}`)
    };
  return (
    <>
      <Row className={styles["container"]}>
       <Row align="middle">
        <Typography.Title level={5}>خرید از {storeName}</Typography.Title>
           <Select
               onChange={handleChange}
               maxTagCount="responsive"
               placeholder="تغییر فروشگاه"
               dropdownMatchSelectWidth={350}
               suffixIcon={<ArrowDown/>}
               className={styles["select"]}
               placement="bottomRight"
               optionLabelProp="label"
           >
               {stores?.map((item) => (
                   <Select.Option value={item._id} key={item} label={item?.name}>
                       <Row justify="space-between">
                           <Typography.Text>{item?.name}</Typography.Text>
                           <Typography.Text style={{fontSize: "12px", color:"#7E7E7E"}}>{item?.address}</Typography.Text>
                       </Row>

                   </Select.Option>
               ))}
           </Select>
       </Row>
          <Row>
              <Location id="location"/>
        <Typography.Text id="address">
            {storeAddress}
        </Typography.Text>
              <span style={{marginRight:"30px", display:"flex"}}>

              <ClockCircleOutlined />
        <Typography.Text id="open-hours">
            تحویل از ساعت {moment(storeOpenHours)?.format("hh:mm")}
        </Typography.Text>
              </span>
          </Row>
      </Row>
    </>
  );
};

export default StoreBanner;
