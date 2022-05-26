import {message} from "antd";
import axios from "axios";
import Cookies from 'js-cookie';
import {getError} from "../../utils/error";

const changePassword = async({oldPassword, newPassword, confirmNewPassword, type, userInfo, dispatch, formRef}:{oldPassword:any; newPassword:any; confirmNewPassword:any; type:string; userInfo:any; dispatch:any; formRef:any}) => {
        if (newPassword !== confirmNewPassword) {
            message.error("رمزعبورها مطابقت ندارند");

            return;
        }
        const query = {
            oldPassword: oldPassword,
            newPassword: newPassword
        }
        try {
            const { data } = await axios.put(
                `/api/${type}/change-password`,
                query,
                { headers: { authorization: `Bearer ${userInfo.token}` } }
            );
            formRef.resetFields();
            message.success("رمز عبور شما با موفقیت تغییر کرد");
            dispatch({ type: 'USER_LOGIN', payload: data });
            Cookies.set('userInfo', JSON.stringify(data));
} catch (err){
            message.error(getError(err));
        }
}
        export default  changePassword;