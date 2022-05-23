import {Col, Divider, Row, Typography, Image, Button} from "antd";
import Store from "../../../../../public/icons/store.svg";
import styles from "./index.module.scss";
import {
    ClockCircleOutlined,
    StarFilled
} from '@ant-design/icons';
import moment from "jalali-moment";
import {useRouter} from "next/router";
interface PropTypes {
    supermarket?: any;
}

const SupermarketDetailsCard = (props: PropTypes) => {
    const router = useRouter();

    return (
    <Col className={styles["container"]} onClick={()=>router.push(`/store/${props.supermarket?._id}`)}>
      <Row className={styles["name"]}>
          <Col>
            <Store />
          </Col>
        <Typography.Title
          level={5}
        >
          {props?.supermarket?.name}
        </Typography.Title>
          <Typography.Title
          level={5}
        >
              <StarFilled /> {props?.supermarket?.ranking}
        </Typography.Title>
      </Row>
        <Col className={styles["background"]}>
          <Image
            preview={false}
            src={
              "/images/supermarket-banner.jpg"
            }
          />
        </Col>
      <Typography.Text className={styles["details"]}>
        {props?.supermarket?.address}
      </Typography.Text>
        <>
          <Divider />
          <Row className={styles["phone"]}>
            <Button icon={<ClockCircleOutlined/>}>
                تحویل از {moment(props?.supermarket?.workingHours?.from)?.format("hh:mm")} تا {moment(props?.supermarket?.workingHours?.to)?.format("hh:mm")}
            </Button>
          </Row>
        </>
    </Col>
  );
};
export default SupermarketDetailsCard;
