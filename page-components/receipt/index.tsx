import { useRouter } from "next/router";
import Fail from "./components/fail";
import Success from "./components/success";
const Receipt = () => {
  const router = useRouter();
  return <>{router.query.result === "success" ? <Success /> : <Fail />}</>;
};
export default Receipt;
