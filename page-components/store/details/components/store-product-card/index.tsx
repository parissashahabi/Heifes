import {Button, Card} from "antd";

const ProductCard = ({product}:{product: object})=>{
    return <>
        {/*@ts-ignore*/}
        <Card
            hoverable
            style={{ width: 300 }}
            cover={
                <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
            }
            actions={[


              <Button>افزودن به سبد</Button>, <Button>i</Button>
            ]}
        >
            <Card.Meta title="Europe Street beat" description="www.instagram.com" />
        </Card>
    </>
}
export default ProductCard;