import { Oneclick, Options } from 'transbank-sdk'; // ES6 Modules

export const create = async ():Promise<any> => {

  const API_TBK_COMMERCE_CODE_MALL='597055555541';
  const API_TBK_API_KEY='579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C';
  const API_TBK_ENVIRONMENT='https://webpay3gint.transbank.cl';
  const API_TBK_COMMERCE_CODE_STORE=597055555542;

  const inscription = new Oneclick.MallInscription(
    new Options(
      API_TBK_COMMERCE_CODE_MALL, // IntegrationCommerceCodes.ONECLICK_MALL,
      API_TBK_API_KEY, // IntegrationApiKeys.WEBPAY,
      API_TBK_ENVIRONMENT, // Environment.Integration,
    )
  );

  // const response = await ins.start(username, email, responseUrl);
  const response = await inscription.start('Doe Deer', 'doe.deer@email.com', 'http://localhost:3001/coupon');
  console.log(response)

  

  return {};
}
