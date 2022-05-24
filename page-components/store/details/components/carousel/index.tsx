import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./index.module.scss"
import {Card, Row, Typography} from "antd";
const CommentsCarousel = ({comments}:{comments: any[]})=>{

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        }
    };
    return <div className={styles["container"]}>
        <Typography.Title level={4} style={{color: "#707070"}}>نظرات و پیشنهادات</Typography.Title>
        <Carousel responsive={responsive} autoPlaySpeed={1000}
                  itemClass="card-item">
        {comments?.map(comment=>{
            return<Card>
                <Card.Meta  description={
                    <Row className={styles["description"]}>
                        <Typography.Text>
                            {comment?.description}
                        </Typography.Text>
                    </Row>
                } />
            </Card>
        })}
    </Carousel></div>
}
export default CommentsCarousel;