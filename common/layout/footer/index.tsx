import { Col, Image, Row, Typography } from "antd";

import styles from "./index.module.scss";
import { SizeProps, sizes } from "../../../common/miscellaneous/sizes";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  InstagramOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  WhatsAppOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";

const Footer = (props: SizeProps) => {
  const [marginBottom, setMarginBottom] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    if (
      router.pathname.includes("store") ||
      (router.pathname.includes("offer/list") &&
        router.query.activeTab === "1") ||
      router.pathname.includes("seller")
    )
      setMarginBottom(7);
    else setMarginBottom(0);
  }, [router]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--marginBottom",
      `${marginBottom}rem`
    );
  }, [marginBottom]);

  return (
    <Col className={styles["hold"]}>
      <Col className={styles["container"]}>
        <Row className={styles["about-logo"]} justify="space-between">
          <Row>
            {!props.sm ? (
              <>
                <Col>
                  <Image
                    alt="footer-logo"
                    src="/images/footer-logo.svg"
                    preview={false}
                  />
                </Col>
                <Typography.Text>
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                  تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                  کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و
                  آینده شناخت فراوان جامعه و متخصصان را می طلبد
                </Typography.Text>
              </>
            ) : null}
          </Row>
          {props.sm ? (
            <Col>
              <Row id="mobile-footer">
                <Image alt="enamad" src="/images/enamad.png" preview={false} />
                {/* <Phone /> */}
                <Typography.Text id="red-box">02154031031</Typography.Text>
                <Typography.Text>
                  واحد پشتیبانی آهن‌آنلاین، آماده هرگونه پاسخگویی در زمینه‌
                  انتقادات، شکایات و نیازهای مشتریان است.
                </Typography.Text>
              </Row>
              <Row>
                <InstagramOutlined />
                <TwitterOutlined />
                <YoutubeOutlined />
                <LinkedinOutlined />
                <WhatsAppOutlined />
              </Row>
            </Col>
          ) : (
            <Row justify="end" className={styles["social-media"]}>
              <InstagramOutlined />
              <TwitterOutlined />
              <YoutubeOutlined />
              <LinkedinOutlined />
              <WhatsAppOutlined />
            </Row>
          )}
        </Row>
      </Col>
    </Col>
  );
};

export default sizes(Footer);
