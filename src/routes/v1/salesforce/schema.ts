import Joi, { allow } from 'joi';
import { Countries, DocTypes, ERROR_CODES, PaymentGateways, PaymentMethods, PaymentTypes, RegExps } from './utils';

const DOCUMENT_TYPES_ARGENTINA: Array<DocTypes> = [DocTypes.DNI, DocTypes.CI, DocTypes.LC, DocTypes.LE];
const DOCUMENT_TYPES_COLOMBIA: Array<DocTypes> = [DocTypes.CC, DocTypes.CE, DocTypes.PP, DocTypes.TI, DocTypes.RC];
const DOCUMENT_TYPES_CHILE: Array<DocTypes> = [DocTypes.RUT];

/**
 * This schema validates the response.body received within `/salesforce/create-donation
 */
export const createDonationSchema = Joi.object({
  donation_type: Joi.any()
    .valid('regular', 'oneoff')
    // .messages({'string.email': ERROR_CODES[100]})
    .required(),
  first_name: Joi.string()
    .pattern(/^(?=.{2,40}$)[a-zA-Z]+(?:[-' ][a-zA-Z]+)*$/)
    .required(),
    // .messages({'string.email': ERROR_CODES[118]})
  last_name: Joi.string()
    .pattern(/^(?=.{2,40}$)[a-zA-Z]+(?:[-' ][a-zA-Z]+)*$/)
    .required(),
    // .messages({'string.email': ERROR_CODES[118]})
  document_type: Joi.when('address_country', {
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
  document_number: Joi.string()
    .custom((value: string, helpers: Joi.CustomHelpers) => 
      (!RegExps[helpers.state.ancestors[0]['document_type']].test(value))
        ? helpers.error("string.invalid")
        : value
    ),
  email: Joi.string()
    .email()
    // .messages({'string.email': ERROR_CODES[105]})
    .required(),
  birthdate: Joi.string()
    .pattern(new RegExp(/([1-2][0-9]|[0][1-9]|[3][0-1])\/([0][1-9]|[1][0-2])\/[1-9][0-9][0-9]{2}/)) // DD/MM/YYYY
    .required(),
  address_country: Joi.any()
    .valid(Countries.ARGENTINA, Countries.CHILE, Countries.COLOMBIA)
    .required(),
  phone_number: Joi.when('address_country', {
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
  area_code: Joi.when('address_country', {
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
  address_state: Joi.when('address_country', { // TODO: address_state_code
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
  // address_state_name
  // {
  //   code: "AN",
  //   name: "Antofagaste"
  // }
  address_city: Joi.string().optional(),
  address_street: Joi.string().optional(),
  address_number: Joi.number().optional(),
  amount: Joi.number().min(1).required(),
  utm_source: Joi.string().required(),
  utm_medium: Joi.string().required(),
  utm_campaign: Joi.string().required(),
  utm_term: Joi.string().required(),
  utm_content: Joi.string().required(),
  payment_method: Joi.when('payment_gateway_name', {
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
  payment_document_type: Joi.when('address_country', {
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
    // .messages({'any.only': ERROR_CODES[116]})
    .required(),
  payment_document_number: Joi.string()
    .custom((value: string, helpers: Joi.CustomHelpers) => {
      if(helpers.state.ancestors[0]['payment_card_is_card_holder'] && value !== helpers.state.ancestors[0]['document_number']) {
        throw new Error('"payment_document_number" y "document_number" deben ser iguales.')
      }
      
      if(!RegExps[helpers.state.ancestors[0]['document_type']].test(value)) {
        return helpers.error("string.invalid")
      } else {
        return value;
      }
    }),
  payment_type: Joi.any()
    .valid('credit_card', 'bank_account')
    .required(),
  payment_bank_entity_name: Joi.when('payment_type', {
    is: PaymentTypes.BANK_ACCOUNT,
    then: Joi.string().required(),
  }),
  // payment_bank_account_type
  // payment_bank_account_number
  payment_card_holder_name: Joi.when('payment_type', {
    is: PaymentTypes.CREDIT_CARD,
    then:Joi.string().required(),
  }),
  payment_card_is_card_holder: Joi.when('payment_type', {
    is: PaymentTypes.CREDIT_CARD,
    then: Joi.boolean().required(),
  }),
  payment_card_due_date: Joi.when('payment_type', {
    is: PaymentTypes.CREDIT_CARD,
    then: Joi.string().pattern(/^([0][1-9]|[1][0-2])\/[2-4][0-9]$/).required(), // MM/AA
  }),
  payment_card_token_id: Joi.when('payment_type', {
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
  // payment_payer_id: Joi.when('payment_type', { // TBD
  //   is: PaymentTypes.CREDIT_CARD,
  //   then: Joi.alternatives(Joi.string(), Joi.number()).required(),
  // }),
  donation_start_date: Joi.date().required(),
  donation_end_date: Joi.when('donation_type', {
    is: Joi.string().valid('oneoff'),
    then: Joi.date().default(schema => schema.donation_start_date),
    otherwise: Joi.valid(null).optional(),
  }),
  payment_gateway_name: Joi.any()
    .valid(PaymentGateways.MERCADOPAGO, PaymentGateways.PAYU, PaymentGateways.TRANSBANK)
    .required(),
  payment_card_id: Joi.when('payment_gateway_name', {
    is: PaymentGateways.MERCADOPAGO,
    then: Joi.string().required(),
  }),
  payment_card_issuer_id: Joi.when('payment_gateway_name', {
    is: PaymentGateways.MERCADOPAGO,
    then: Joi.string().required(),
  }),
  payment_device_id: Joi.when('payment_gateway_name', {
    is: PaymentGateways.MERCADOPAGO,
    then: Joi.string().required(),
  }),
  payment_card_first6: Joi.when('payment_gateway_name', {
    is: PaymentGateways.PAYU,
    then: Joi.when('payment_type', {
      is: PaymentTypes.CREDIT_CARD,
      then: Joi.string().pattern(/^[0-9]{6}$/).required(),
    }),
  }),
  salesforce_campaign_id: Joi.alternatives(Joi.string(), Joi.number()).optional(),
})
.with('address_street', 'address_number')
.with('document_type', 'document_number')
.with('payment_document_type', 'payment_document_number')
.with('area_code', 'phone_number')

export const generatePaymentSchema = Joi.object({
  amount: Joi.number().min(1).required(),
  payment_gateway_name: Joi.any()
    .valid(PaymentGateways.MERCADOPAGO, PaymentGateways.PAYU, PaymentGateways.TRANSBANK)
    .required(),
  payment_method: Joi.when('payment_gateway_name', {
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
  payment_card_id: Joi.when('payment_gateway_name', {
    is: PaymentGateways.MERCADOPAGO,
    then: Joi.string().required(),
  }),
  payment_card_issuer_id: Joi.when('payment_gateway_name', {
    is: PaymentGateways.MERCADOPAGO,
    then: Joi.string().required(),
  }),
  payment_card_token_id: Joi.when('payment_type', {
    is: PaymentTypes.CREDIT_CARD,
    then: Joi.alternatives(Joi.string(), Joi.number()).required(),
  }),
});
