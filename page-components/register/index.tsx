import {message, Row} from "antd";
import styles from "./index.module.scss";
import { Tabs } from "antd";
import TabPaneContent from "./components/tab-pane-content";
import { useRouter } from "next/router";
import Cookies from 'js-cookie';
import axios from 'axios';
import {  useState, useEffect,useContext } from "react";
import CitySelection from "./components/city";
import {Store} from "../../utils/store";
const { TabPane } = Tabs;

const Register = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    if (userInfo) {
      if(activeTab === "1") router.push('/store/6546');
      else router.push("/seller")
    }
  }, []);
  const [activeTab, setActiveTab] = useState<string>(router?.query?.activeTab?.toString() || '1');
  const [stage, setStage] = useState<string>(router?.query?.stage?.toString() || '1');
  const [phoneNumber, setPhoneNumber] = useState(undefined);
  const [isFormFilled, setIsFormFilled] = useState<boolean>(false);
  const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] =useState<number>(undefined);
  const [supermarketDTO, setSupermarketDTO] =useState<object>(undefined);
  const [customerDTO, setCustomerDTO] =useState<object>(undefined);
  const handleRegisterBuyer = async (dto: any) => {
    if (dto.password !== dto.confirmPassword) {
      message.error("رمزعبورها مطابقت ندارند");
      return;
    }
    setCustomerDTO({...dto,...phoneNumber });
    setIsFormFilled(true);
  };
  const handleRegisterSeller = async (dto: any) => {
    if (dto.password !== dto.confirmPassword) {
      message.error("رمزعبورها مطابقت ندارند");
      return;
    }
    setSupermarketDTO({...dto,...phoneNumber });
    setIsFormFilled(true);
  };
  useEffect(()=>{
    router.query.stage=stage;
    router.query.activeTab=activeTab;
    router.push(router);
  },[activeTab,stage])
  const submitHandler = async () => {
    if (activeTab ==="1"){
      try {
        const { data } = await axios.post('/api/customers/register',{...customerDTO, city: selectedCity} );
        dispatch({ type: 'USER_LOGIN', payload: data });
        Cookies.set('userInfo', data);
        router.push(`/store/343?city=${data?.city}`);
      } catch (err) {
        message.error(err.response.data ? err.response.data.message : err.message);
      }
    } else{
      try {
        const { data } = await axios.post('/api/supermarkets/register',{...supermarketDTO, city: selectedCity} );
        dispatch({ type: 'USER_LOGIN', payload: data });
        Cookies.set('userInfo', data);
        router.push("/registration_result?status=successfullySubmitted")
      } catch (err) {
        message.error(err.response.data ? err.response.data.message : err.message);
      }
    }

  };
  return (
      <>
        {isButtonClicked && isFormFilled ? <CitySelection selectedCity={selectedCity} submitHandler={submitHandler} setSelectedCity={setSelectedCity}/> :  <Row justify="center" align="middle" className={styles["container"]}>
          <Tabs defaultActiveKey={activeTab}
                onChange={(activeKey) => {
                  setActiveTab(activeKey);
                }} >
            <TabPane tab="خریدار" key="1">
              <TabPaneContent type="buyer" stage={stage} activeTab={activeTab} setStage={setStage} handleRegisterBuyer={handleRegisterBuyer} setPhoneNumber={setPhoneNumber} setIsButtonClicked={setIsButtonClicked}/>
            </TabPane>
            <TabPane tab="فروشنده" key="2">
              <TabPaneContent type="seller" stage={stage} activeTab={activeTab} setStage={setStage} handleRegisterSeller={handleRegisterSeller} setPhoneNumber={setPhoneNumber} setIsButtonClicked={setIsButtonClicked}/>
            </TabPane>
          </Tabs>
        </Row>}

      </>
  );
};
export default Register;
