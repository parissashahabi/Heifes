import { Dispatch, SetStateAction } from "react";
// import { getCartItemsCount } from "@/common/layout/header/services";

export const getCartList = (
  setCartList: any,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setCartItemCount: any,
  setValidateModal: Dispatch<SetStateAction<boolean>>
) => {
  // clientApi.cartItems.cartItemControllerFindAllCartItem().then(res => {
  //   setCartList(res.data);
  //   setLoading(false);
  //   getCartItemsCount(setCartItemCount);
  // }).catch(err => {
  //   if (err?.response?.status === 422) {
  //     setValidateModal(true);
  //   }
  //   console.log(err);
  //   setLoading(false);
  // });
};
