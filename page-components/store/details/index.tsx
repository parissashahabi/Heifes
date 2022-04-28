import StoreBanner from "./components/store-banner/index"
const StoreDetails = () => {
  const stores = [
      "1",
      "2",
      "3"
  ]
  return <>
    <StoreBanner storeName="سوپرمارکت ستاره" stores={stores} storeAddress="اصفهان، شیخ مفید، نبش فرعی لاله" storeOpenHours="10"/>
    </>;
};
export default StoreDetails;
