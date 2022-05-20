import SuccessfullySubmitted from "./components/successfully-submitted";
import AwaitingVerification from "./components/awaiting-verification";
import {useContext, useEffect, useState} from "react";
import { Row } from "antd";
import Side from "./components/side";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import { ROUTES } from "../../common/enums/routes.enum";
import StageEnum from "./enum/stage.enum";
import VerificationRejected from "./components/verification-rejected";
import {Store} from "../../utils/store";

const RegistrationResult = () => {
    const [currentStage, setCurrentStage] = useState<StageEnum>(StageEnum.DEFAULT);
    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;
    useEffect(() => {
        handleDefaultStage(userInfo);
    }, []);

    const handleDefaultStage = (userInfo?: any) => {
        if (!userInfo) {
            return setCurrentStage(StageEnum.PHONE_NUMBER);
        }
        // register fot the first time
        if(router?.query?.status === "successfullySubmitted") return setCurrentStage(StageEnum.RESULTS);
        // log in
        else{
            switch (userInfo?.status) {
                case "CONFIRMED":
                    return router.replace(ROUTES.SELLER);
                case "PENDING":
                    return setCurrentStage(StageEnum.AWAITING_VERIFICATION);
                case "DENIED":
                    return setCurrentStage(StageEnum.VERIFICATION_REJECTED);
                default:
                    return setCurrentStage(StageEnum.PHONE_NUMBER);
            }
        }
    };

    switch (currentStage) {
        case StageEnum.PHONE_NUMBER:
            router.replace("/login?activeTab=2")
            break;
        case StageEnum.RESULTS:
            return (
                <Row justify="center" align="middle" className={styles["container"]}>
                    <Side />
                    <SuccessfullySubmitted/>
                </Row>
            );
        case StageEnum.AWAITING_VERIFICATION:
            return (
                <Row justify="center" align="middle" className={styles["container"]}>
                    <Side />
                    <AwaitingVerification/>
                </Row>
            );
        case StageEnum.VERIFICATION_REJECTED:
            return (
                <Row justify="center" align="middle" className={styles["container"]}>
                    <Side />
                    <VerificationRejected/>
                </Row>
            );
        default:
            return null;
    }
};

export default RegistrationResult;
