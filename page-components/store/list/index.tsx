import {Row} from "antd";
import { useRouter } from "next/router";
import React, {useContext, useEffect, useState} from "react";
import styles from "./index.module.scss"
import SearchBarHeader from "../../../common/components/searchBarHeader";
import SupermarketDetailsCard from "./components/supermarket-details-card/index"
import Banner from "./components/store-banner/index";
import axios from "axios";
import {Store} from "../../../utils/store";


const StoreList = () => {
    const router = useRouter();
    const { state } = useContext(Store);
    const {userInfo} = state;
    const [supermarkets, setSupermarkets] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get(`/api/supermarkets/${userInfo.city}`, {
                headers: { authorization: `Bearer ${userInfo.token}` },
            });
            setSupermarkets(data);
        };
        fetchProducts();
    }, []);


    return <>
        <Banner />
        <Row style={{marginTop: "30px"}}>
            <SearchBarHeader
                inputPlaceholderLabel="جستجوی نام فروشگاه..."
                page={`store-${router.query.id}`}
                // onSearch={onSearch}
                noTitle={true}
            />
        </Row>
        <Row className={styles["cards"]}>
            {supermarkets.map(supermarket => {
                return <SupermarketDetailsCard supermarket={supermarket} />
            })}
        </Row>

    </>;
};
export default StoreList;
