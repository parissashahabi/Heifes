import { NextRouter } from "next/router";

const handleLoginPageBackButton = async (router: NextRouter) => {
  if (router?.query?.redirect) {
    await router.push(`${router.query.redirect}`);
  }
};

export default handleLoginPageBackButton;
