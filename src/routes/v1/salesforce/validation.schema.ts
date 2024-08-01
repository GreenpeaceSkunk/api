import Joi, { allow } from 'joi';
import { Countries, DocTypes, ERROR_CODES, PaymentGateways, PaymentMethods, PaymentTypes, RegExps } from './utils';

const DOCUMENT_TYPES_ARGENTINA: Array<DocTypes> = [DocTypes.DNI, DocTypes.CI, DocTypes.LC, DocTypes.LE];
const DOCUMENT_TYPES_COLOMBIA: Array<DocTypes> = [DocTypes.CC, DocTypes.CE, DocTypes.PP, DocTypes.TI, DocTypes.RC];
const DOCUMENT_TYPES_CHILE: Array<DocTypes> = [DocTypes.RUT];

/**
 * This schema validates the response.body received within `/salesforce/create-donation
 */
export const createDonationSchema = Joi.object({
  donationType: Joi.any()
    .valid('regular', 'oneoff')
    // .messages({'string.email': ERROR_CODES[100]})
    .required(),
  firstName: Joi.string()
    .pattern(/^(?=.{2,40}$)[a-zA-Z]+(?:[-' ][a-zA-Z]+)*$/)
    .required(),
    // .messages({'string.email': ERROR_CODES[118]})
  lastName: Joi.string()
    .pattern(/^(?=.{2,40}$)[a-zA-Z]+(?:[-' ][a-zA-Z]+)*$/)
    .required(),
    // .messages({'string.email': ERROR_CODES[118]})
  docType: Joi.when('country', {
    switch: [
      { 
        is: Countries.ARGENTINA,
        then: Joi.any().valid(...DOCUMENT_TYPES_ARGENTINA),
      },
      { 
        is: Countries.CHILE,
        then: Joi.any().valid(...DOCUMENT_TYPES_CHILE),
      },
      { 
        is: Countries.COLOMBIA,
        then: Joi.any().valid(...DOCUMENT_TYPES_COLOMBIA),
      },
    ]  
  })
    // .messages({'any.only': ERROR_CODES[102]})
    .required(),
  docNumber: Joi.string()
    .custom((value: string, helpers: Joi.CustomHelpers) => 
      (!RegExps[helpers.state.ancestors[0]['docType']].test(value))
        ? helpers.error("string.invalid")
        : value
    ),
  email: Joi.string()
    .email()
    // .messages({'string.email': ERROR_CODES[105]})
    .required(),
  // birthdate: Joi.string()
  //   .pattern(new RegExp(/([1-2][0-9]|[0][1-9]|[3][0-1])\/([0][1-9]|[1][0-2])\/[1-9][0-9][0-9]{2}/)) // DD/MM/YYYY
  //   .required(),
  birthDate: Joi.string()
    // .pattern(new RegExp(/[1-9][0-9][0-9]{2}-([1-2][0-9]|[0][1-9]|[3][0-1])-([0][1-9]|[1][0-2])/)) // DD/MM/YYYY
    .required(),
  country: Joi.any()
    .valid(Countries.ARGENTINA, Countries.CHILE, Countries.COLOMBIA)
    .required(),
  phoneNumber: Joi.when('country', { // prev phone_number
    switch: [
      { 
        is: Countries.ARGENTINA,
        then: Joi.string().pattern(/^[0-9]{8,9}$/),
      },
      { 
        is: Countries.CHILE,
        then: Joi.string().pattern(/9[0-9]{4}[0-9]{4}/),
      },
      { 
        is: Countries.COLOMBIA,
        then: Joi.string().pattern(/^[0-9]{7,10}$/),
      },
    ]  
  }).required(),
  areaCode: Joi.when('country', { // prev: area_ode
    switch: [
      { 
        is: Countries.ARGENTINA,
        then: Joi.string().pattern(/^[0-9]{2,4}$/),
      },
      { 
        is: Countries.CHILE,
        then: '56',
      },
      { 
        is: Countries.COLOMBIA,
        then: Joi.string().pattern(/^[0-9]{3}$/),
      },
    ]  
  })
    // .messages({'any.only': ERROR_CODES[107]})
    .required(),
  province: Joi.string().allow('').optional(),
  city: Joi.string().allow('').optional(),

  addressState: Joi.when('country', { // TODO: addressState_code
    switch: [
      { 
        is: Countries.ARGENTINA,
        then: Joi.string().valid(null),
      },
      { 
        is: Countries.CHILE,
        then: Joi.string().valid('AN', 'AP', 'AT', 'AI', 'CO', 'AR', 'LL', 'LR', 'MG', 'BI', 'OH', 'MA', 'RM', 'TA', 'VA'), // TODO: Name
      },
      { 
        is: Countries.COLOMBIA,
        then: Joi.string().pattern(new RegExp(/[0]([0][1-9]|[1-2][0-9]|[3][0-3])/)), // TODO: Name
      },
    ]  
  // }).required(),
  }),
  // addressState_name
  // {
  //   code: "AN",
  //   name: "Antofagaste"
  // }
  // addressCity: Joi.string().allow('').optional(),
  address: Joi.string().allow('').optional(),
  addressNumber: Joi.string().allow('').optional(),
  amount: Joi.number().min(1).required(),
  utmSource: Joi.string().required(), // .allow('')
  utmMedium: Joi.string().required(),
  utmCampaign: Joi.string().required(),
  utmTerm: Joi.string().required(),
  utmContent: Joi.string().required(),
  paymentMethod: Joi.when('paymentGatewayName', {
    switch: [
      { 
        is: PaymentGateways.MERCADOPAGO,
        then: Joi.any().valid(...[
          PaymentMethods.AMEX,
          PaymentMethods.MASTERCARD,
          PaymentMethods.MASTERCARD_DEBIT,
          PaymentMethods.VISA,
          PaymentMethods.VISA_DEBIT,
          PaymentMethods.DINERS,
          PaymentMethods.CABAL,
          PaymentMethods.CABAL_DEBIT,
          PaymentMethods.CMR,
          PaymentMethods.CENCOSUD,
          PaymentMethods.NARANJA,
        ]).required(),
      },
      // {
      //   is: PaymentGateways.TRANSBANK,
      //   then: Joi.any().valid(...[
      //     PaymentMethods.AMEX,
      //     PaymentMethods.MASTERCARD,
      //     PaymentMethods.MASTERCARD_DEBIT,
      //     PaymentMethods.VISA,
      //     PaymentMethods.VISA_DEBIT,
      //     PaymentMethods.DINERS,
      //     PaymentMethods.MAGNA,
      //     PaymentMethods.REDCOMPRA,
      //     PaymentMethods.PREPAGO,
      //   ]),
      // },
      {
        is: PaymentGateways.TRANSBANK,
        then: Joi.any().allow(null),
      },
      { 
        is: PaymentGateways.PAYU,
        then: Joi.any().valid(...[
          PaymentMethods.AMEX,
          PaymentMethods.MASTERCARD,
          PaymentMethods.MASTERCARD_DEBIT,
          PaymentMethods.VISA,
          PaymentMethods.VISA_DEBIT,
          PaymentMethods.DINERS,
          PaymentMethods.CODENSA,
          PaymentMethods.PSE,
        ]).required()
      },
    ]  
  }),
  paymentDocType: Joi.when('country', {
    switch: [
      { 
        is: Countries.ARGENTINA,
        then: Joi.any().valid(...DOCUMENT_TYPES_ARGENTINA)
      },
      { 
        is: Countries.CHILE,
        then: Joi.any().valid(...DOCUMENT_TYPES_CHILE)
      },
      {
        is: Countries.COLOMBIA,
        then: Joi.any().valid(...DOCUMENT_TYPES_COLOMBIA)
      },
    ]  
  })
    .required(),
  // paymentDocNumber: Joi.string()
  //   .custom((value: string, helpers: Joi.CustomHelpers) => {
  //     if(helpers.state.ancestors[0]['paymentIsCardHolder'] && value !== helpers.state.ancestors[0]['document_number']) {
  //       throw new Error('"paymentDocNumber" y "document_number" deben ser iguales.')
  //     }
      
  //     if(!RegExps[helpers.state.ancestors[0]['document_type']].test(value)) {
  //       return helpers.error("string.invalid")
  //     } else {
  //       return value;
  //     }
  //   }),
  paymentDocNumber: Joi.any().allow('').optional(),
  paymentType: Joi.when('paymentGatewayName', {
    switch: [
      { 
        is: PaymentGateways.MERCADOPAGO,
        then: Joi.any().valid('credit_card', 'debit_card', 'bank_account').required(),
      },
      { 
        is: PaymentGateways.PAYU,
        then: Joi.any().valid('credit_card', 'debit_card', 'bank_account').required(),
      },
      {
        is: PaymentGateways.TRANSBANK,
        then: Joi.string().allow('').optional(),
      },
    ]  
  }),
  // paymentType: Joi.any().valid('credit_card', 'debit_card', 'bank_account').required(),
  //   .valid('credit_card', 'bank_account')
  //   .required(),
  paymentBankEntityName: Joi.when('paymentType', {
    is: PaymentTypes.BANK_ACCOUNT,
    then: Joi.string().required(),
  }),
  // payment_bank_account_type
  // payment_bank_account_number
  paymentHolderName: Joi.when('paymentType', {
    is: PaymentTypes.CREDIT_CARD,
    then:Joi.string().required(),
  }),
  paymentIsCardHolder: Joi.when('paymentType', {
    is: PaymentTypes.CREDIT_CARD,
    then: Joi.boolean().required(),
  }),
  payment_card_due_date: Joi.when('paymentType', {
    is: PaymentTypes.CREDIT_CARD,
    then: Joi.string().pattern(/^([0][1-9]|[1][0-2])\/[2-4][0-9]$/).required(), // MM/AA
  }),
  payment_card_token_id: Joi.when('paymentType', {
    is: PaymentTypes.CREDIT_CARD,
    then: Joi.alternatives(Joi.string(), Joi.number()).required(),
  }),
  /**
   * "Mercado Pago: MP customer_id
TBK: TBK User
PayU: Reference Code"
   */
  // Este campo se obtiene previo a generar el pago
  // $customer = (new MPService())->findOrCreateCustomer($request['email']);
  // No debe ser enviado en create-donation
  // payment_payer_id: Joi.when('paymentType', { // TBD
  //   is: PaymentTypes.CREDIT_CARD,
  //   then: Joi.alternatives(Joi.string(), Joi.number()).required(),
  // }),
  // donation_start_date: Joi.date().required(),
  // donation_end_date: Joi.when('donation_type', {
  //   is: Joi.string().valid('oneoff'),
  //   then: Joi.date().default(schema => schema.donation_start_date),
  //   otherwise: Joi.valid(null).optional(),
  // }),
  paymentGatewayName: Joi.any()
    .valid(PaymentGateways.MERCADOPAGO, PaymentGateways.PAYU, PaymentGateways.TRANSBANK)
    .required(),
  payment_card_id: Joi.when('paymentGatewayName', {
    is: PaymentGateways.MERCADOPAGO,
    then: Joi.string().required(),
  }),
  payment_card_issuer_id: Joi.when('paymentGatewayName', {
    is: PaymentGateways.MERCADOPAGO,
    then: Joi.string().required(),
  }),
  payment_device_id: Joi.when('paymentGatewayName', {
    is: PaymentGateways.MERCADOPAGO,
    then: Joi.string().required(),
  }),
  payment_card_first6: Joi.when('paymentGatewayName', {
    is: PaymentGateways.PAYU,
    then: Joi.when('paymentType', {
      is: PaymentTypes.CREDIT_CARD,
      then: Joi.string().pattern(/^[0-9]{6}$/).required(),
    }),
  }),
  salesforcefCampaignId: Joi.alternatives(Joi.string(), Joi.number()).required(),
  // New
  // min_amount: Joi.number().min(1).required(), // MP y PayU
  // payment_card_due_month: Joi.string().required(),
  // payment_card_due_year: Joi.string().required(),
  // paymentCardPayerId: Joi.string().required(),
  apiResponseUrl: Joi.when('paymentGatewayName', {
    is: PaymentGateways.TRANSBANK,
    then: Joi.string().required(),
  }),
  apiResponseUrlParams: Joi.when('paymentGatewayName', {
    is: PaymentGateways.TRANSBANK,
    then: Joi.string().required(),
  }),
})
.with('addressStreet', 'addressNumber')
.with('docType', 'docNumber')
.with('paymentDocType', 'paymentDocNumber')
.with('areaCode', 'phoneNumber')

export const generatePaymentSchema = Joi.object({
  amount: Joi.number().min(1).required(),
  paymentGatewayName: Joi.any()
    .valid(PaymentGateways.MERCADOPAGO, PaymentGateways.PAYU, PaymentGateways.TRANSBANK)
    .required(),
  paymentMethod: Joi.when('paymentGatewayName', {
    switch: [
      { 
        is: PaymentGateways.MERCADOPAGO,
        then: Joi.any().valid(...[
          PaymentMethods.AMEX,
          PaymentMethods.MASTERCARD,
          PaymentMethods.MASTERCARD_DEBIT,
          PaymentMethods.VISA,
          PaymentMethods.VISA_DEBIT,
          PaymentMethods.DINERS,
          PaymentMethods.CABAL,
          PaymentMethods.CABAL_DEBIT,
          PaymentMethods.CMR,
          PaymentMethods.CENCOSUD,
          PaymentMethods.NARANJA,
        ]),
      },
      {
        is: PaymentGateways.TRANSBANK,
        then: Joi.any().valid(...[
          PaymentMethods.AMEX,
          PaymentMethods.MASTERCARD,
          PaymentMethods.MASTERCARD_DEBIT,
          PaymentMethods.VISA,
          PaymentMethods.VISA_DEBIT,
          PaymentMethods.DINERS,
          PaymentMethods.MAGNA,
          PaymentMethods.REDCOMPRA,
          PaymentMethods.PREPAGO,
        ]),
      },
      { 
        is: PaymentGateways.PAYU,
        then: Joi.any().valid(...[
          PaymentMethods.AMEX,
          PaymentMethods.MASTERCARD,
          PaymentMethods.MASTERCARD_DEBIT,
          PaymentMethods.VISA,
          PaymentMethods.VISA_DEBIT,
          PaymentMethods.DINERS,
          PaymentMethods.CODENSA,
          PaymentMethods.PSE,
        ])
      },
    ]  
  }).required(),
  payment_card_id: Joi.when('paymentGatewayName', {
    is: PaymentGateways.MERCADOPAGO,
    then: Joi.string().required(),
  }),
  payment_card_issuer_id: Joi.when('paymentGatewayName', {
    is: PaymentGateways.MERCADOPAGO,
    then: Joi.string().required(),
  }),
  payment_card_token_id: Joi.when('paymentType', {
    is: PaymentTypes.CREDIT_CARD,
    then: Joi.alternatives(Joi.string(), Joi.number()).required(),
  }),
});
