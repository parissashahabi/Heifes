import create, { SetState } from "zustand";
import { devtools } from "zustand/middleware";
export interface UserState {
  member?: any;
  accessToken?: string;
  setUser: any;
}

const useUser = create(
  devtools((set: SetState<any>) => ({
    accessToken: undefined,
    member: undefined,
    setUser: (member?: any, accessToken?: string) => {
      set(() => ({
        accessToken: accessToken,
        member: member,
      }));
    },
  })),
);

export default useUser;
