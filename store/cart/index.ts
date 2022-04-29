import create, { SetState } from "zustand";
import { devtools } from "zustand/middleware";

const useCart = create(
    devtools((set: SetState<any>) => ({
        count: 0,
        setCartItemCount: (count: number) => {
            set(() => ({ count }));
        }
    })),
);
export default useCart;
