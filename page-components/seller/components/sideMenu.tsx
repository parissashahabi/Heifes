import {Menu, Typography} from "antd";
import  {AppstoreOutlined} from '@ant-design/icons';
const { Title } = Typography;
import styles from "./index.module.scss";
const SideMenu = () => {
    return (
        <Menu className={styles["side-menu"]}>
            <Title level={3} className={styles["title"]}>منوی کاربری</Title>
            <Menu.Item key="dashboard" icon={<AppstoreOutlined />}>
                 داشبورد
            </Menu.Item>
            <Menu.Item key="editProfile" icon={<AppstoreOutlined />}>
                ویرایش پروفایل
            </Menu.Item>
            <Menu.Item key="orderList" icon={<AppstoreOutlined />}>
                لیست سفارشات
            </Menu.Item>
            <Menu.Item key="products" icon={<AppstoreOutlined />}>
                محصولات فروشگاه
            </Menu.Item>
            <Menu.Item key="changePassword" icon={<AppstoreOutlined />}>
                تغییر رمز عبور
            </Menu.Item>
            <Menu.Item key="exit" icon={<AppstoreOutlined />}>
                خروج
            </Menu.Item>


        </Menu>
    )
}
export default SideMenu;


