import StoreBanner from "./components/store-banner/index"
import {Button, Row, Typography,Col} from "antd";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ArrowLeft from "../../../public/icons/arrowLeft.svg"
import styles from "./index.module.scss"
import SearchBarHeader from "../../../common/components/searchBarHeader";
const StoreDetails = () => {
    const router = useRouter();
    useEffect( () => {
        const { id } = router.query;
        // getStoreDetails(id);
    }, []);

    // دیتای آزمایشی
  const stores = [
      "1",
      "2",
      "3"
  ];
    const storeName = "سوپرمارکت ستاره"
  return <>
    <StoreBanner storeName={storeName} stores={stores} storeAddress="اصفهان، شیخ مفید، نبش فرعی لاله" storeOpenHours="10"/>
      <Row className={styles["address-row"]}>
          <Col span={20}>
          <Typography.Text>شما در حال مشاهده کالاهای موجود در {storeName} هستید
              <br/>برای مشاهده موجودی و قیمت دقیق کالاهای نزدیکترین فروشگاه به شما، ابتدا آدرس خود را انتخاب کنید</Typography.Text>
          </Col>
          <Col span={4} style={{justifyContent: "end", display: "flex"}}>
          <Button onClick={()=>router.push("/")}>
              تغییر آدرس
              <ArrowLeft/>
          </Button>
          </Col>
      </Row>
      <Row style={{marginTop: "30px"}}>

      <SearchBarHeader
          inputPlaceholderLabel="جستجوی نام کالا..."
          page={`store-${router.query.id}`}
          // onSearch={onSearch}
          title="لیست محصولات"
          listCount={2}
      />
      </Row>
    </>;
};
export default StoreDetails;
