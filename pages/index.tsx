import {Button, Row} from "antd";
import {useRouter} from "next/router";
export default function Home() {
  const router=useRouter()
  return <Row justify="center" align="middle" style={{height: "100vh"}}>
  <Button onClick={()=>router.push("login")} type="primary">ورود</Button>
  <Button onClick={()=>router.push("register")} type="dashed" style={{marginRight: "10px"}}>عضویت</Button>
  </Row>;
}
