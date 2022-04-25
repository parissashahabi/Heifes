import { MemberView } from "@/services/global";
import clientApi from "@/services/interceptor";

const getMember = (): Promise<MemberView> => {
  return clientApi.auth
    .authControllerWhoAmI()
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
      return {} as MemberView;
    });
};

export default getMember;
