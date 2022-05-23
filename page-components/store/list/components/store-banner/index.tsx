import {Row, Typography, Col, Select} from "antd";
import styles from "./index.module.scss";
import ArrowDown from "../../../../../public/icons/arrowDown.svg"

// دیتای آزمایشی
const cities = [
    "1",
    "2",
    "3"
];

const Banner = ({stores}:{ stores: any[]; }) => {
  return (
    <>
      <Row className={styles["container"]}>
       <Row align="middle">
        <Typography.Title level={5}>لیست فروشگاه‌ها</Typography.Title>
           <Select
               // onChange={handleCheckBox}
               maxTagCount="responsive"
               placeholder="تغییر شهر"
               suffixIcon={<ArrowDown/>}
               className={styles["select"]}
           >
               {cities?.map((item) => (
                   <Select.Option value={item} key={item}>
                       {item}
                   </Select.Option>
               ))}
           </Select>
       </Row>
      </Row>
    </>
  );
};

export default Banner;
