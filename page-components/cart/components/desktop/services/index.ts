import { Dispatch, SetStateAction } from "react";

import { NextRouter } from "next/router";
import { getCartList } from "../../services";
import { getCartItemsCount } from "../../../../../common/layout/header/services";

export const handleChange = (
  debouncedSave: any,
  value: number,
  index: number,
  setCartList: Dispatch<SetStateAction<any[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  setCartList((prevState) => {
    const items = [...prevState];
    items[index].quantity = value;
    debouncedSave(items[index].id, items[index].quantity, setLoading);
    return items;
  });
};

export const handleAddAmount = (
  debouncedSave: any,
  index: number,
  setCartList: Dispatch<SetStateAction<any[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) =>
  setCartList((prevState) => {
    const items = [...prevState];
    items[index].quantity++;
    debouncedSave(items[index].id, items[index].quantity, setLoading);
    return items;
  });

export const handleReduceAmount = (
  debouncedSave: any,
  index: number,
  setCartList: Dispatch<SetStateAction<any[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) =>
  setCartList((prevState) => {
    const items = [...prevState];
    items[index].quantity--;
    debouncedSave(items[index].id, items[index].quantity, setLoading);
    return items;
  });

export const handleRemove = (
  cartItemId: number,
  setCartList: Dispatch<SetStateAction<any[]>>,
  setCartItemCount: any
) => {
  // clientApi.cartItems
  //   .cartItemControllerDelete(cartItemId)
  //   .then((res) => {
  //     setCartList(res.data);
  //     getCartItemsCount(setCartItemCount);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

export const handleValidateCartItem = (
  router: NextRouter,
  setValidateModal: Dispatch<SetStateAction<boolean>>,
  setCartList: Dispatch<SetStateAction<any[]>>,
  setListLoading: Dispatch<SetStateAction<boolean>>,
  setCartItemCount: any
) => {
  // clientApi.cartItems
  //   .cartItemControllerValidateCartItem()
  //   .then((res) => {
  //     router.push("/payment-process?state=complete-info");
  //   })
  //   .catch((err) => {
  //     setValidateModal(true);
  //     console.log(err);
  //     setListLoading(true);
  //     getCartList(
  //       setCartList,
  //       setListLoading,
  //       setCartItemCount,
  //       setValidateModal
  //     );
  //     getCartItemsCount(setCartItemCount);
  //   });
};
