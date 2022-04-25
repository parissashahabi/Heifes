import { Active, Closed, Info, Pending } from "@/common/icons";
/* -------------------------------------------------------------------------- */
/*                                order-status                                */
/* -------------------------------------------------------------------------- */
const ordertStatus = {
  COMPLETED: {
    title: "تکمیل شده",
    color: "#107715",
    backgroundColor: "#077E28",
    step: 4,
  },
  PREPAYMENT: {
    title: "در انتظار پرداخت",
    color: "#F2194A",
    backgroundColor: "#F2194A",
    step: 1,
  },
  PENDING: {
    title: "در انتظار پرداخت",
    color: "#F2194A",
    backgroundColor: "#F2194A",
  },
  PAID: {
    title: "در انتظار تعیین وزن",
    color: "#F37E5D",
    backgroundColor: "#FFA800",
    step: 2,
  },
  CLOSED: {
    title: "لغو شده",
    color: "#939597",
    backgroundColor: "#939597",
  },
  WEIGHTED: {
    title: "تعیین وزن شده",
    color: "#0086B3",
    backgroundColor: "#0086B3",
    step: 3,
  },
};
/* -------------------------------------------------------------------------- */
/*                             order-payment-status                           */
/* -------------------------------------------------------------------------- */
const orderPaymentStatus = {
  PAID: {
    title: "موفق",
    color: "green",
  },
  FAILED: {
    title: "ناموفق",
    color: " #b31e23",
  },
  DRAFT: {
    title: "در انتظار",
    color: "yellow",
  },
};
/* -------------------------------------------------------------------------- */
/*                                offers-status                               */
/* -------------------------------------------------------------------------- */
const offersStatus = {
  ACTIVE: {
    title: "فعال",
    color: "#107715",
    icon: (
      <Active
        style={{
          fontSize: "1.6rem",
          marginLeft: "0.4rem",
          transform: "translateY(-2px)",
        }}
      />
    ),
  },
  PENDING: {
    title: "در انتظار تایید",
    color: "#FFA800",
    background: "#FFC952",
    icon: (
      <Pending
        style={{
          fontSize: "1.5rem",
          marginLeft: "0.4rem",
        }}
      />
    ),
  },
  NOT_CONFIRMED: {
    title: "تایید نشده",
    color: "#F2194A",
    icon: (
      <Closed
        style={{
          fontSize: "1.6rem",
          marginLeft: "0.4rem",
        }}
      />
    ),
  },
  UPDATE_NEEDED: {
    title: "نیاز به بروزرسانی",
    color: "#0086B3",
    icon: (
      <Info
        style={{
          fontSize: "2.9rem",
          // marginLeft: "0.2rem",
        }}
      />
    ),
  },
  NOT_ACTIVE: {
    title: "غیر فعال",
    color: "#5F5F5F",
    icon: undefined,
  },
};
/* -------------------------------------------------------------------------- */
/*                                offer-management-status                                */
/* -------------------------------------------------------------------------- */
const offerManagementStatus = {
  COMPLETED: {
    title: "تکمیل شده",
    color: "#107715",
    backgroundColor: "#EBFFEC",
    mobileBackground: "#107715",
  },
  PREPAYMENT: {
    title: "پیش پرداخت تکمیل شده",
    color: "#000",
    backgroundColor: "#AEC4D6 ",
    mobileBackground: "#4F6272 ",
  },
  PENDING: {
    title: "در انتظار پرداخت",
    color: "#0086B3",
    backgroundColor: "#CAF2FF",
    mobileBackground: "#F37E5D",
  },

  PAID: {
    title: "در انتظار تعیین وزن",
    color: "#FFFFFF",
    backgroundColor: "#4F6272",
    mobileBackground: "#FFA800",
  },
  CLOSED: {
    title: "لغو شده",
    color: "#EA1D25",
    backgroundColor: "#FFD8E5",
    mobileBackground: "#939597",
  },
  WEIGHTED: {
    title: "تعیین وزن شده",
    color: "#5F5F5F",
    backgroundColor: "#FFBEAC",
    mobileBackground: "#0086B3",
  },
};

export { ordertStatus, orderPaymentStatus, offersStatus, offerManagementStatus };
