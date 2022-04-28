import StoreBanner from "./components/store-banner/index"
import {Button, Row, Typography,Col} from "antd";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ArrowLeft from "../../../public/icons/arrowLeft.svg"
import styles from "./index.module.scss"
import SearchBarHeader from "../../../common/components/searchBarHeader";
import ProductCard from "./components/store-product-card/index"
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
  const products=[
      {
         name: "تن ماهی گوهرانه",
          price: "23500",
          oldPrice: "25800",
          discount: "25",
          img: "",
      }, {
         name: "روغن سرخ کردنی لادن طلایی",
          price: "12600",
          oldPrice: "31000",
          discount: "75",
          img: "",
      }, {
         name: "صابون گلنار",
          price: "7000",
          oldPrice: "11400",
          discount: "30",
          img: "",
      },
  ]
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
          <Row gutter={16}>
          {products.map(product => {
          return <Col span={6}><ProductCard product={product}/></Col>
          })}
          </Row>
    </>;
};
export default StoreDetails;
