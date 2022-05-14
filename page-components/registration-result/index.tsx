import SuccessfullySubmitted from "./components/successfully-submitted";
import AwaitingVerification from "./components/awaiting-verification";
import { useEffect, useState } from "react";
import { Row } from "antd";
import Side from "./components/side";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import { ROUTES } from "../../common/enums/routes.enum";
import useUser from "../../store/user";
import StageEnum from "./enum/stage.enum";
import VerificationRejected from "./components/verification-rejected";

const RegistrationResult = () => {
    const { member } = useUser<Record<string, any>>((state) => state);

    const [currentStage, setCurrentStage] = useState<StageEnum>(StageEnum.DEFAULT);
    const router = useRouter();

    useEffect(() => {
        handleDefaultStage(member);
    }, []);

    const handleDefaultStage = (member?: any) => {
        // if (!member) {
        //     return setCurrentStage(StageEnum.PHONE_NUMBER);
        // }
        if(router?.query?.status === "successfullySubmitted") return setCurrentStage(StageEnum.RESULTS);
        // switch (member?.shopState) {
        switch (router?.query?.status) {
            case "CONFIRMED":
                 return router.replace(ROUTES.CITY);
            case "PENDING":
                return setCurrentStage(StageEnum.AWAITING_VERIFICATION);
            case "DENIED":
                return setCurrentStage(StageEnum.VERIFICATION_REJECTED);
            default:
                return setCurrentStage(StageEnum.PHONE_NUMBER);
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
