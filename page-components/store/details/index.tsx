import StoreBanner from "./components/store-banner/index"
import {Button, Row, Typography, Col, message, Empty} from "antd";
import { useRouter } from "next/router";
import ArrowLeft from "../../../public/icons/arrowLeft.svg"
import styles from "./index.module.scss"
import SearchBarHeader from "../../../common/components/searchBarHeader";
import ProductCard from "./components/store-product-card/index"
import CommentsCarousel from "./components/carousel";
import axios from "axios";
import React, {useContext, useEffect, useState} from "react";
import {Store} from "../../../utils/store";
import moment from "jalali-moment";

export default function StoreDetails()  {
    const router = useRouter();
    const { state } = useContext(Store);
    const {userInfo} = state;
   const [stocks, setStocks] = useState([]);
   const [supermarket, setSupermarket] = useState(undefined);
   const [supermarkets, setSupermarkets] = useState([]);
    const currentDate = new Date();
    const str = currentDate.toISOString()
    const fetchData = async (id) => {
        try {
            const {data} = await axios.get(`/api/stocks/${id}`);
            setStocks([...data]);

        } catch (err) {
            message.error(err.response?.data ? err.response.data.message : err.message);
        }
    };
    const getSupermarket = async (id) => {
        try {
            const {data} = await axios.get(`/api/supermarkets/find-one/${id}`);
            setSupermarket(data);

        } catch (err) {
            message.error(err.response?.data ? err.response.data.message : err.message);
        }
    };
    const getSupermarkets = async () => {
        try {
            const {data} = await axios.get(`/api/supermarkets/${userInfo?.city}`);
            setSupermarkets([...data]);

        } catch (err) {
            message.error(err.response?.data ? err.response.data.message : err.message);
        }
    };

    useEffect(() => {
        if (router.query.id) {
            fetchData(router?.query?.id);
            getSupermarket(router?.query?.id);
            getSupermarkets();
        }
    }, [router]);

  return <>
    <StoreBanner storeName={supermarket?.name} stores={supermarkets} storeAddress={supermarket?.address} storeOpenHours={supermarket?.workingHours?.from}/>
      <Row className={styles["address-row"]}>
          <Col span={20}>
          <Typography.Text>شما در حال مشاهده کالاهای موجود در {supermarket?.name} هستید
              <br/>برای مشاهده موجودی و قیمت دقیق کالاهای فروشگاه‌های محل سکونت خود، شهر خود را انتخاب کنید</Typography.Text>
          </Col>
          <Col span={4} style={{justifyContent: "end", display: "flex"}}>
          <Button onClick={()=>router.push("/city")} disabled>
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
          listCount={stocks?.length}
      />
      </Row>
      {stocks?.length ? <Row className={styles["cards"]}>
          {stocks?.map((stock, index) => {
              if(moment(str).format("jYYYY/jM/jD") !== moment(stock?.expiryDate).format("jYYYY/jM/jD"))
              return <ProductCard product={stock} key={index}/>
          })}
      </Row> : <Empty description={<span>اطلاعاتی وجود ندارد</span>} className={styles["empty"]}/>}

      {supermarket?.comments?.length ?  <CommentsCarousel comments={supermarket?.comments}/>:null}

    </>;
};

