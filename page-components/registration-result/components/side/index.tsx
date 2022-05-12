import { Row } from "antd";
import styles from "./index.module.scss";
import { SizeProps, sizes } from "../../../../common/miscellaneous/sizes";

const Side = (props: SizeProps) => {
  return !props.md ? (
    <Row justify="center" align="middle" className={styles["container"]}>
    </Row>
  ) : null;
};
export default sizes(Side);
