import StoreBanner from "./components/store-banner/index"
import {Button, Row, Typography,Col} from "antd";
import { useRouter } from "next/router";
import React, {useEffect, useState} from "react";
import ArrowLeft from "../../../public/icons/arrowLeft.svg"
import styles from "./index.module.scss"
import SearchBarHeader from "../../../common/components/searchBarHeader";
import ProductCard from "./components/store-product-card/index"
import CommentsCarousel from "./components/carousel";
import db from '../../../utils/db';
import Product from '../../../models/product';
import axios from "axios";

export default function StoreDetails(props)  {
    // const [products, setProducts] = useState([]);
    const router = useRouter();
    const { products } = props;
// useEffect(()=>{
//     const fetch = async () =>{
//         const p = await axios.get("/api/products");
//         setProducts([...p.data]);
//     }
//     fetch();
//
// },[])
    // useEffect(  () => {
    //     const fetchData = async () => {
    //         try {
    //             await db.connect();
    //             const products = await Product.find({}).lean();
    //             console.log(products);
    //             // setProducts([...productsList.map(db.convertDocToObj)]);
    //             await db.disconnect();
    //         } catch (e){
    //             console.error(e)
    //         }
    //
    //     }
    //     fetchData().catch(console.error);
    //     const { id } = router.query;
    //     // getStoreDetails(id);
    // }, []);
useEffect(()=>{console.log(products)},[products])
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
          <Button onClick={()=>router.push("/city")}>
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
          <Row className={styles["cards"]}>
          {products?.map((product, index) => {
          return <ProductCard product={product} key={index}/>
          })}
          </Row>
          <CommentsCarousel/>
    </>;
};

